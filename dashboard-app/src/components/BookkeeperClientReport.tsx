import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Calculator, Users } from 'lucide-react';

const BookkeeperClientReport = ({ clientId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [client, setClient] = useState(null);
  const [financialStatements, setFinancialStatements] = useState([]);
  const [taxComputations, setTaxComputations] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (clientId) {
      fetchClientData();
    }
  }, [clientId]);

  useEffect(() => {
    if (financialStatements.length > 0) {
      const latestYear = Math.max(...financialStatements.map(s => s.year));
      setSelectedYear(latestYear);
    }
  }, [financialStatements]);

  const fetchClientData = async () => {
    setLoading(true);
    try {
      console.log('Fetching client data for ID:', clientId);
      
      // Fetch client details
      const { data: clientData, error: clientError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', clientId)
        .single();

      console.log('Client data response:', { clientData, clientError });

      if (clientError) throw clientError;
      setClient(clientData);

      // Fetch financial statements
      const { data: statementsData, error: statementsError } = await supabase
        .from('financial_statements')
        .select('*')
        .eq('client_id', clientId)
        .eq('bookkeeper_id', user?.id)
        .order('year', { ascending: false });

      console.log('Financial statements response:', { statementsData, statementsError });

      if (statementsError) throw statementsError;
      setFinancialStatements(statementsData || []);

      // Fetch tax computations
      const { data: taxData, error: taxError } = await supabase
        .from('tax_computations')
        .select(`
          *,
          financial_statement:financial_statements!financial_statement_id (
            year,
            client_id
          )
        `)
        .eq('financial_statement.client_id', clientId)
        .eq('financial_statement.bookkeeper_id', user?.id)
        .order('created_at', { ascending: false });

      console.log('Tax computations response:', { taxData, taxError });

      if (taxError) throw taxError;
      setTaxComputations(taxData || []);

    } catch (error) {
      console.error('Error fetching client data:', error);
      toast({
        title: "Error",
        description: "Failed to load client data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getSelectedStatement = () => {
    return financialStatements.find(s => s.year === selectedYear);
  };

  const getSelectedTaxComputation = () => {
    return taxComputations.find(t => t.financial_statement?.year === selectedYear);
  };

  const getChartData = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i).reverse();
    
    return years.map(year => {
      const statement = financialStatements.find(s => s.year === year);
      const tax = taxComputations.find(t => t.financial_statement?.year === year);
      
      // Calculate effective tax rate using the correct formula
      const taxableIncome = (tax?.business_income || 0) + (tax?.disallowable_expenses || 0) - (tax?.capital_allowance || 0) - (tax?.personal_relief || 0);
      const effectiveTaxRate = taxableIncome > 0 ? ((tax?.tax_payable || 0) / taxableIncome * 100) : 0;
      
      return {
        year,
        revenue: statement?.revenue || 0,
        cost: statement?.cost || 0,
        expenses: statement?.expenses || 0,
        netProfit: statement?.net_profit || 0,
        grossProfit: statement?.gross_profit || 0,
        taxPayable: tax?.tax_payable || 0,
        businessIncome: tax?.business_income || 0,
        taxRate: tax?.tax_rate || 0,
        effectiveTaxRate: effectiveTaxRate,
        // Balance sheet items
        fixedAsset: statement?.fixed_asset || 0,
        currentAsset: statement?.current_asset || 0,
        fixedLiability: statement?.fixed_liability || 0,
        currentLiability: statement?.current_liability || 0,
        ownersEquity: statement?.owners_equity || 0,
        totalAssets: (statement?.fixed_asset || 0) + (statement?.current_asset || 0),
        totalLiabilities: (statement?.fixed_liability || 0) + (statement?.current_liability || 0),
      };
    });
  };

  const getTaxTableData = () => {
    return taxComputations
      .map(tax => {
        const statement = financialStatements.find(s => s.id === tax.financial_statement_id);
        
        // Calculate effective tax rate using the correct formula
        const taxableIncome = (tax.business_income || 0) + (tax.disallowable_expenses || 0) - (tax.capital_allowance || 0) - (tax.personal_relief || 0);
        const effectiveTaxRate = taxableIncome > 0 ? ((tax.tax_payable || 0) / taxableIncome * 100) : 0;
        
        return {
          year: tax.financial_statement?.year || '-',
          businessIncome: tax.business_income || 0,
          taxPayable: tax.tax_payable || 0,
          taxRate: tax.tax_rate || 0,
          effectiveTaxRate: effectiveTaxRate,
        };
      })
      .sort((a, b) => b.year - a.year);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Client not found.</p>
      </div>
    );
  }

  const selectedStatement = getSelectedStatement();
  const selectedTax = getSelectedTaxComputation();
  const chartData = getChartData();
  const taxTableData = getTaxTableData();

  return (
    <div className="space-y-6">
      {/* Client Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {client.full_name || 'Client'}
              </CardTitle>
              <CardDescription>{client.email}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedYear?.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {financialStatements.map((statement) => (
                    <SelectItem key={statement.year} value={statement.year.toString()}>
                      {statement.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Current Year Financial Statement */}
      {selectedStatement && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Statement - {selectedYear}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Income Statement Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Income Statement</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(selectedStatement.revenue)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Gross Profit</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(selectedStatement.gross_profit)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedStatement.gross_profit_percentage}% margin
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Net Profit</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(selectedStatement.net_profit)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedStatement.net_profit_percentage}% margin
                  </p>
                </div>
              </div>
            </div>

            {/* Balance Sheet Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Balance Sheet</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assets */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Assets</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Fixed Assets</span>
                      <span className="font-medium">{formatCurrency(selectedStatement.fixed_asset)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Current Assets</span>
                      <span className="font-medium">{formatCurrency(selectedStatement.current_asset)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <span className="text-sm font-medium text-blue-700">Total Assets</span>
                      <span className="font-bold text-blue-700">
                        {formatCurrency((selectedStatement.fixed_asset || 0) + (selectedStatement.current_asset || 0))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Liabilities & Equity */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Liabilities & Equity</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Fixed Liabilities</span>
                      <span className="font-medium">{formatCurrency(selectedStatement.fixed_liability)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Current Liabilities</span>
                      <span className="font-medium">{formatCurrency(selectedStatement.current_liability)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Owner's Equity</span>
                      <span className="font-medium">{formatCurrency(selectedStatement.owners_equity)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <span className="text-sm font-medium text-red-700">Total Liabilities & Equity</span>
                      <span className="font-bold text-red-700">
                        {formatCurrency(
                          (selectedStatement.fixed_liability || 0) + 
                          (selectedStatement.current_liability || 0) + 
                          (selectedStatement.owners_equity || 0)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI Indicators */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Current Ratio */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Current Ratio</p>
                      <p className="text-2xl font-bold text-blue-800">
                        {((selectedStatement.current_asset || 0) / (selectedStatement.current_liability || 1)).toFixed(2)}
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      ((selectedStatement.current_asset || 0) / (selectedStatement.current_liability || 1)) >= 1.5 
                        ? 'bg-green-500' 
                        : ((selectedStatement.current_asset || 0) / (selectedStatement.current_liability || 1)) >= 1 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                    }`}></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    {((selectedStatement.current_asset || 0) / (selectedStatement.current_liability || 1)) >= 1.5 
                      ? 'Excellent' 
                      : ((selectedStatement.current_asset || 0) / (selectedStatement.current_liability || 1)) >= 1 
                        ? 'Good' 
                        : 'Needs Attention'}
                  </p>
                </div>

                {/* Debt to Equity Ratio */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Debt to Equity</p>
                      <p className="text-2xl font-bold text-purple-800">
                        {((selectedStatement.fixed_liability || 0) / (selectedStatement.owners_equity || 1)).toFixed(2)}
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      ((selectedStatement.fixed_liability || 0) / (selectedStatement.owners_equity || 1)) <= 0.5 
                        ? 'bg-green-500' 
                        : ((selectedStatement.fixed_liability || 0) / (selectedStatement.owners_equity || 1)) <= 1 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                    }`}></div>
                  </div>
                  <p className="text-xs text-purple-600 mt-1">
                    {((selectedStatement.fixed_liability || 0) / (selectedStatement.owners_equity || 1)) <= 0.5 
                      ? 'Low Risk' 
                      : ((selectedStatement.fixed_liability || 0) / (selectedStatement.owners_equity || 1)) <= 1 
                        ? 'Moderate' 
                        : 'High Risk'}
                  </p>
                </div>

                {/* Return on Assets */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">ROA</p>
                      <p className="text-2xl font-bold text-green-800">
                        {(((selectedStatement.net_profit || 0) / ((selectedStatement.fixed_asset || 0) + (selectedStatement.current_asset || 0))) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      ((selectedStatement.net_profit || 0) / ((selectedStatement.fixed_asset || 0) + (selectedStatement.current_asset || 0))) * 100 >= 10 
                        ? 'bg-green-500' 
                        : ((selectedStatement.net_profit || 0) / ((selectedStatement.fixed_asset || 0) + (selectedStatement.current_asset || 0))) * 100 >= 5 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                    }`}></div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Return on Assets</p>
                </div>

                {/* Working Capital */}
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Working Capital</p>
                      <p className="text-2xl font-bold text-orange-800">
                        {formatCurrency((selectedStatement.current_asset || 0) - (selectedStatement.current_liability || 0))}
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      ((selectedStatement.current_asset || 0) - (selectedStatement.current_liability || 0)) > 0 
                        ? 'bg-green-500' 
                        : 'bg-red-500'
                    }`}></div>
                  </div>
                  <p className="text-xs text-orange-600 mt-1">
                    {((selectedStatement.current_asset || 0) - (selectedStatement.current_liability || 0)) > 0 
                      ? 'Positive' 
                      : 'Negative'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 5-Year Financial Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            5-Year Financial Performance
          </CardTitle>
          <CardDescription>Revenue, Cost, Expenses, and Profit comparison over 5 years</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Cost of Goods Sold"
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Operating Expenses"
              />
              <Line 
                type="monotone" 
                dataKey="netProfit" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Net Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 5-Year Balance Sheet Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            5-Year Balance Sheet Trends
          </CardTitle>
          <CardDescription>Assets, Liabilities, and Equity comparison over 5 years</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="totalAssets" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Total Assets"
              />
              <Line 
                type="monotone" 
                dataKey="fixedAsset" 
                stroke="#059669" 
                strokeWidth={2}
                name="Fixed Assets"
              />
              <Line 
                type="monotone" 
                dataKey="currentAsset" 
                stroke="#34d399" 
                strokeWidth={2}
                name="Current Assets"
              />
              <Line 
                type="monotone" 
                dataKey="totalLiabilities" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Total Liabilities"
              />
              <Line 
                type="monotone" 
                dataKey="fixedLiability" 
                stroke="#dc2626" 
                strokeWidth={2}
                name="Fixed Liabilities"
              />
              <Line 
                type="monotone" 
                dataKey="currentLiability" 
                stroke="#f87171" 
                strokeWidth={2}
                name="Current Liabilities"
              />
              <Line 
                type="monotone" 
                dataKey="ownersEquity" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Owner's Equity"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Current Year Tax Computation */}
      {selectedTax && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Tax Computation - {selectedYear}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Business Income</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(selectedTax.business_income)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tax Payable</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(selectedTax.tax_payable)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedTax.tax_rate}% tax rate
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Disallowable Expenses</p>
                  <p className="font-medium">{formatCurrency(selectedTax.disallowable_expenses)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Capital Allowance</p>
                  <p className="font-medium">{formatCurrency(selectedTax.capital_allowance)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Personal Relief</p>
                  <p className="font-medium">{formatCurrency(selectedTax.personal_relief)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 5-Year Tax Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            5-Year Tax Performance
          </CardTitle>
          <CardDescription>Detailed tax computation comparison over 5 years</CardDescription>
        </CardHeader>
        <CardContent>
          {taxTableData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Business Income (RM)</TableHead>
                  <TableHead>Tax Payable (RM)</TableHead>
                  <TableHead>Tax Rate (%)</TableHead>
                  <TableHead>Effective Tax Rate (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxTableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.year}</TableCell>
                    <TableCell>{formatCurrency(row.businessIncome)}</TableCell>
                    <TableCell className="font-medium text-red-600">
                      {formatCurrency(row.taxPayable)}
                    </TableCell>
                    <TableCell>{formatPercentage(row.taxRate)}</TableCell>
                    <TableCell>{formatPercentage(row.effectiveTaxRate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No tax computation data available for comparison.
            </div>
          )}
        </CardContent>
      </Card>

      {/* 5-Year Tax Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            5-Year Tax Trends
          </CardTitle>
          <CardDescription>Business Income and Tax Payable trends over 5 years</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Legend />
              <Bar dataKey="businessIncome" fill="#3b82f6" name="Business Income" />
              <Bar dataKey="taxPayable" fill="#ef4444" name="Tax Payable" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookkeeperClientReport; 