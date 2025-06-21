import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, FileText, Calculator, TrendingUp, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ClientReport from './ClientReport';
import TaxSubmissions from './TaxSubmissions';

const ClientDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [financialStatements, setFinancialStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchFinancialStatements();
  }, []);

  const fetchFinancialStatements = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_statements')
        .select('*')
        .eq('client_id', user?.id)
        .order('year', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load financial statements",
          variant: "destructive"
        });
      } else {
        setFinancialStatements(data || []);
      }
    } catch (error) {
      console.error('Error fetching financial statements:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.email}</p>
          </div>
          <Button onClick={signOut} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Detailed Reports</TabsTrigger>
            <TabsTrigger value="statements">Statements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Your Financial Overview
                  </CardTitle>
                  <CardDescription>
                    Quick summary of your financial data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {financialStatements.length > 0 ? (
                    <div className="space-y-4">
                      {financialStatements.slice(0, 3).map((statement: any) => (
                        <Card key={statement.id} className="border-l-4 border-l-blue-500">
                          <CardHeader>
                            <CardTitle className="text-lg">Year {statement.year}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Revenue</p>
                                <p className="text-lg font-semibold">RM {Number(statement.revenue).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Gross Profit</p>
                                <p className="text-lg font-semibold">RM {Number(statement.gross_profit).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Net Profit</p>
                                <p className="text-lg font-semibold">RM {Number(statement.net_profit).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Net Profit %</p>
                                <p className="text-lg font-semibold">{statement.net_profit_percentage}%</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No financial statements available yet.</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Your bookkeeper will add your financial data here.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <TaxSubmissions />
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <ClientReport />
          </TabsContent>

          <TabsContent value="statements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  All Financial Statements
                </CardTitle>
                <CardDescription>
                  Complete list of your financial statements
                </CardDescription>
              </CardHeader>
              <CardContent>
                {financialStatements.length > 0 ? (
                  <div className="space-y-4">
                    {financialStatements.map((statement: any) => (
                      <Card key={statement.id} className="border-l-4 border-l-blue-500">
                        <CardHeader>
                          <CardTitle className="text-lg">Year {statement.year}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Revenue</p>
                              <p className="text-lg font-semibold">RM {Number(statement.revenue).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Gross Profit</p>
                              <p className="text-lg font-semibold">RM {Number(statement.gross_profit).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Net Profit</p>
                              <p className="text-lg font-semibold">RM {Number(statement.net_profit).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Net Profit %</p>
                              <p className="text-lg font-semibold">{statement.net_profit_percentage}%</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No financial statements available yet.</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Your bookkeeper will add your financial data here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ClientDashboard;
