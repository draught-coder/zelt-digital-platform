
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Plus, Users, Calculator, TrendingUp, Target } from 'lucide-react';
import FinancialStatementForm from '@/components/FinancialStatementForm';
import TaxComputationForm from '@/components/TaxComputationForm';
import ClientList from '@/components/ClientList';

const BookkeeperDashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookkeeper Dashboard</h1>
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="tax">Tax Computation</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Statements</CardTitle>
                  <Calculator className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Current year</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">RM 125K</div>
                  <p className="text-xs text-muted-foreground">Per client</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tax Savings</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">RM 45K</div>
                  <p className="text-xs text-muted-foreground">Total saved</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button onClick={() => setActiveTab('financial')} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Financial Statement
                </Button>
                <Button onClick={() => setActiveTab('tax')} variant="outline" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Tax Computation
                </Button>
                <Button onClick={() => setActiveTab('clients')} variant="outline" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Manage Clients
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <ClientList />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialStatementForm />
          </TabsContent>

          <TabsContent value="tax">
            <TaxComputationForm />
          </TabsContent>

          <TabsContent value="planning">
            <Card>
              <CardHeader>
                <CardTitle>Tax Planning & Simulations</CardTitle>
                <CardDescription>Coming soon - Advanced tax planning tools</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">This feature will include tax planning strategies and simulation tools.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BookkeeperDashboard;
