import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { FileText, Calendar, CheckCircle, Clock, Edit, Plus, Trash2 } from 'lucide-react';

const TaxSubmissionManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [formData, setFormData] = useState({
    client_id: '',
    assessment_year: new Date().getFullYear(),
    status: 'Pending',
    submission_date: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all tax submissions for the bookkeeper
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('tax_submissions')
        .select(`
          *,
          client:profiles!tax_submissions_client_id_fkey (
            full_name,
            email
          )
        `)
        .eq('bookkeeper_id', user?.id)
        .order('assessment_year', { ascending: false });

      if (submissionsError) throw submissionsError;

      // Fetch all clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('role', 'client');

      if (clientsError) throw clientsError;

      setSubmissions(submissionsData || []);
      setClients(clientsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load tax submissions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submissionData = {
        ...formData,
        bookkeeper_id: user?.id,
        assessment_year: parseInt(formData.assessment_year),
        submission_date: formData.submission_date || null
      };

      if (editingSubmission) {
        // Update existing submission
        const { error } = await supabase
          .from('tax_submissions')
          .update(submissionData)
          .eq('id', editingSubmission.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Tax submission updated successfully"
        });
      } else {
        // Create new submission
        const { error } = await supabase
          .from('tax_submissions')
          .insert(submissionData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Tax submission created successfully"
        });
      }

      // Reset form and close dialog
      resetForm();
      setIsDialogOpen(false);
      fetchData(); // Refresh the list
    } catch (error) {
      console.error('Error saving submission:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save tax submission",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (submission) => {
    setEditingSubmission(submission);
    setFormData({
      client_id: submission.client_id,
      assessment_year: submission.assessment_year.toString(),
      status: submission.status,
      submission_date: submission.submission_date || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (submissionId) => {
    if (!confirm('Are you sure you want to delete this tax submission?')) return;

    try {
      const { error } = await supabase
        .from('tax_submissions')
        .delete()
        .eq('id', submissionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Tax submission deleted successfully"
      });

      fetchData(); // Refresh the list
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: "Error",
        description: "Failed to delete tax submission",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setEditingSubmission(null);
    setFormData({
      client_id: '',
      assessment_year: new Date().getFullYear().toString(),
      status: 'Pending',
      submission_date: ''
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Submitted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Audited':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'Amended':
        return <Edit className="h-4 w-4 text-orange-500" />;
      case 'Pending':
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Submitted':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Submitted</Badge>;
      case 'Audited':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Audited</Badge>;
      case 'Amended':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Amended</Badge>;
      case 'Pending':
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-MY', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading && submissions.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Tax Submissions Management
            </CardTitle>
            <CardDescription>
              Manage tax submission records for your clients
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Submission
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingSubmission ? 'Edit Tax Submission' : 'Add Tax Submission'}
                </DialogTitle>
                <DialogDescription>
                  {editingSubmission ? 'Update the tax submission details.' : 'Create a new tax submission record.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select 
                    value={formData.client_id} 
                    onValueChange={(value) => setFormData({...formData, client_id: value})}
                    disabled={!!editingSubmission}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.full_name || client.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assessment_year">Assessment Year</Label>
                  <Input
                    id="assessment_year"
                    type="number"
                    value={formData.assessment_year}
                    onChange={(e) => setFormData({...formData, assessment_year: e.target.value})}
                    min={2000}
                    max={2100}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Submitted">Submitted</SelectItem>
                      <SelectItem value="Audited">Audited</SelectItem>
                      <SelectItem value="Amended">Amended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="submission_date">Submission Date</Label>
                  <Input
                    id="submission_date"
                    type="date"
                    value={formData.submission_date}
                    onChange={(e) => setFormData({...formData, submission_date: e.target.value})}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : (editingSubmission ? 'Update' : 'Create')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {submissions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Assessment Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {submission.client?.full_name || 'No name'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {submission.client?.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {submission.assessment_year}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(submission.status)}
                      {getStatusBadge(submission.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {submission.submission_date ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatDate(submission.submission_date)}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Not submitted</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {formatDate(submission.updated_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(submission)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(submission.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No tax submissions found.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Click "Add Submission" to create your first tax submission record.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxSubmissionManager; 