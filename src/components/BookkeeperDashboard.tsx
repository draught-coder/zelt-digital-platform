import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Plus, Calculator, UserPlus, FileText, Zap } from 'lucide-react';
import ClientList from './ClientList';
import FinancialStatementList from './FinancialStatementList';
import FinancialStatementForm from './FinancialStatementForm';
import TaxComputationList from './TaxComputationList';
import TaxComputationForm from './TaxComputationForm';
import OverviewStats from './OverviewStats';
import TaxSubmissionManager from './TaxSubmissionManager';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddUserForm from './AddUserForm';
import BlogAdminSection from '@/pages/blog/BlogAdminSection';
import FinancialStatementManager from './FinancialStatementManager';
import TaxComputationManager from './TaxComputationManager';
import DocuSealManager from './DocuSealManager';
import { Link } from 'react-router-dom';

const BookkeeperDashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingStatementId, setEditingStatementId] = useState(null);
  const [editingComputationId, setEditingComputationId] = useState(null);
  const [financialView, setFinancialView] = useState('list'); // 'list', 'new', 'edit'
  const [taxView, setTaxView] = useState('list'); // 'list', 'new', 'edit'
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

  const handleEditStatement = (id) => {
    setEditingStatementId(id);
    setFinancialView('edit');
    setActiveTab('financial');
  };

  const handleNewStatement = () => {
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
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="financial">Financial Statements</TabsTrigger>
            <TabsTrigger value="tax">Tax Computation</TabsTrigger>
            <TabsTrigger value="submissions">Tax Submissions</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
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
                <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                            Create a new client or bookkeeper account.
                        </DialogDescription>
                    </DialogHeader>
                    <AddUserForm onUserAdded={() => setIsAddUserDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <ClientList />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialStatementManager />
          </TabsContent>

          <TabsContent value="tax">
            <TaxComputationManager />
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

          <TabsContent value="blog">
            <BlogAdminSection isAdmin={true} />
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Link 
            to="/dashboard/documents" 
            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100"
          >
            <FileText className="h-5 w-5" />
            <span>Document Signing</span>
          </Link>
          <Link 
            to="/dashboard/automation" 
            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100"
          >
            <Zap className="h-5 w-5" />
            <span>Automation & Notifications</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BookkeeperDashboard;
