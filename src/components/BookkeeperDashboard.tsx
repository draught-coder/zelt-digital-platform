import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Plus, Calculator, Users } from 'lucide-react';
import ClientList from './ClientList';
import FinancialStatementList from './FinancialStatementList';
import FinancialStatementForm from './FinancialStatementForm';
import TaxComputationList from './TaxComputationList';
import TaxComputationForm from './TaxComputationForm';
import OverviewStats from './OverviewStats';
import TaxSubmissionManager from './TaxSubmissionManager';

const BookkeeperDashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingStatementId, setEditingStatementId] = useState(null);
  const [editingComputationId, setEditingComputationId] = useState(null);
  const [financialView, setFinancialView] = useState('list'); // 'list', 'new', 'edit'
  const [taxView, setTaxView] = useState('list'); // 'list', 'new', 'edit'

  const handleEditStatement = (id) => {
    setEditingStatementId(id);
    setFinancialView('edit');
    setActiveTab('financial');
  };

  const handleNewStatement = () => {
    setEditingStatementId(null);
    setFinancialView('new');
    setActiveTab('financial');
  };

  const handleSaveStatement = () => {
    setEditingStatementId(null);
    setFinancialView('list');
  };

  const handleBackStatement = () => {
    setEditingStatementId(null);
    setFinancialView('list');
  };

  const handleEditComputation = (id) => {
    setEditingComputationId(id);
    setTaxView('edit');
    setActiveTab('tax');
  };

  const handleNewComputation = () => {
    setEditingComputationId(null);
    setTaxView('new');
    setActiveTab('tax');
  };

  const handleSaveComputation = () => {
    setEditingComputationId(null);
    setTaxView('list');
  };

  const handleBackComputation = () => {
    setEditingComputationId(null);
    setTaxView('list');
  };

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
        <Tabs value={activeTab} onValueChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'financial') {
            setFinancialView('list');
            setEditingStatementId(null);
          }
          if (tab === 'tax') {
            setTaxView('list');
            setEditingComputationId(null);
          }
        }} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="financial">Financial Statements</TabsTrigger>
            <TabsTrigger value="tax">Tax Computation</TabsTrigger>
            <TabsTrigger value="submissions">Tax Submissions</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewStats />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button onClick={handleNewStatement} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Financial Statement
                </Button>
                <Button onClick={handleNewComputation} variant="outline" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  New Tax Computation
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
            {financialView === 'list' && (
              <>
                <div className="flex justify-end mb-4">
                  <Button onClick={handleNewStatement}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Statement
                  </Button>
                </div>
                <FinancialStatementList onEdit={handleEditStatement} />
              </>
            )}
            {(financialView === 'new' || financialView === 'edit') && (
              <FinancialStatementForm 
                statementId={editingStatementId} 
                onSave={handleSaveStatement}
                onBack={handleBackStatement}
              />
            )}
          </TabsContent>

          <TabsContent value="tax">
            {taxView === 'list' && (
              <>
                <div className="flex justify-end mb-4">
                  <Button onClick={handleNewComputation}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Computation
                  </Button>
                </div>
                <TaxComputationList onEdit={handleEditComputation} />
              </>
            )}
            {(taxView === 'new' || taxView === 'edit') && (
              <TaxComputationForm 
                computationId={editingComputationId} 
                onSave={handleSaveComputation}
                onBack={handleBackComputation}
              />
            )}
          </TabsContent>

          <TabsContent value="submissions">
            <TaxSubmissionManager />
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
