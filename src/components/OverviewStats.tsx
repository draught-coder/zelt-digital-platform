import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calculator, TrendingUp, Target } from 'lucide-react';

const OverviewStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalClients: 0,
    activeStatements: 0,
    avgRevenue: 0,
    totalTaxSavings: 0,
    loading: true
  });

  useEffect(() => {
    fetchOverviewStats();
  }, []);

  const fetchOverviewStats = async () => {
    try {
      // Fetch total clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'client');

      if (clientsError) throw clientsError;

      // Fetch financial statements for current year
      const currentYear = new Date().getFullYear();
      const { data: statementsData, error: statementsError } = await supabase
        .from('financial_statements')
        .select('*')
        .eq('bookkeeper_id', user?.id)
        .eq('year', currentYear);

      if (statementsError) throw statementsError;

      // Fetch all financial statements for average calculation
      const { data: allStatementsData, error: allStatementsError } = await supabase
        .from('financial_statements')
        .select('revenue, cost, expenses')
        .eq('bookkeeper_id', user?.id);

      if (allStatementsError) throw allStatementsError;

      // Fetch tax computations for tax savings calculation
      const { data: taxData, error: taxError } = await supabase
        .from('tax_computations')
        .select(`
          *,
          financial_statement:financial_statements!financial_statement_id (
            revenue
          )
        `)
        .eq('financial_statement.bookkeeper_id', user?.id);

      if (taxError) throw taxError;

      // Calculate statistics
      const totalClients = clientsData?.length || 0;
      const activeStatements = statementsData?.length || 0;
      
      // Calculate average revenue
      const totalRevenue = allStatementsData?.reduce((sum, statement) => sum + (statement.revenue || 0), 0) || 0;
      const avgRevenue = totalClients > 0 ? totalRevenue / totalClients : 0;

      // Calculate tax savings (difference between statutory tax and effective tax)
      const totalTaxSavings = taxData?.reduce((sum, tax) => {
        const statutoryTax = (tax.business_income || 0) * (tax.tax_rate || 0) / 100;
        const actualTax = tax.tax_payable || 0;
        return sum + Math.max(0, statutoryTax - actualTax);
      }, 0) || 0;

      setStats({
        totalClients,
        activeStatements,
        avgRevenue,
        totalTaxSavings,
        loading: false
      });

    } catch (error) {
      console.error('Error fetching overview stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (stats.loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalClients}</div>
          <p className="text-xs text-muted-foreground">Active clients</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Statements</CardTitle>
          <Calculator className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeStatements}</div>
          <p className="text-xs text-muted-foreground">Current year</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Revenue</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.avgRevenue)}</div>
          <p className="text-xs text-muted-foreground">Per client</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tax Savings</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalTaxSavings)}</div>
          <p className="text-xs text-muted-foreground">Total saved</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewStats; 