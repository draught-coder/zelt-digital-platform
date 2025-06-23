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
import { FileText, Plus, Send, CheckCircle, Clock, Edit, Trash2, Download, Eye } from 'lucide-react';

interface DocuSealForm {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'completed';
  created_at: string;
  client_id: string;
  client_name: string;
  submissions_count: number;
  signed_count: number;
}

interface DocuSealSubmission {
  id: string;
  form_id: string;
  client_email: string;
  status: 'pending' | 'signed' | 'expired';
  sent_at: string;
  signed_at?: string;
  document_url?: string;
}

const DocuSealIntegration = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [forms, setForms] = useState<DocuSealForm[]>([]);
  const [submissions, setSubmissions] = useState<DocuSealSubmission[]>([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<DocuSealForm | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client_id: '',
    template_type: 'tax_authorization',
    fields: []
  });

  const [submissionData, setSubmissionData] = useState({
    form_id: '',
    client_email: '',
    message: '',
    expires_in_days: 7
  });

  useEffect(() => {
    fetchForms();
    fetchClients();
  }, []);

  const fetchForms = async () => {
    setLoading(true);
    try {
      // This would be replaced with actual DocuSeal API calls
      const mockForms: DocuSealForm[] = [
        {
          id: '1',
          title: 'Tax Authorization Form 2024',
          description: 'Authorization for tax filing and representation',
          status: 'active',
          created_at: '2024-01-15',
          client_id: 'client1',
          client_name: 'John Doe',
          submissions_count: 3,
          signed_count: 2
        },
        {
          id: '2',
          title: 'Financial Statement Approval',
          description: 'Approval for annual financial statements',
          status: 'draft',
          created_at: '2024-01-10',
          client_id: 'client2',
          client_name: 'Jane Smith',
          submissions_count: 1,
          signed_count: 0
        }
      ];
      setForms(mockForms);
    } catch (error) {
      console.error('Error fetching forms:', error);
      toast({
        title: "Error",
        description: "Failed to fetch forms",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .eq('role', 'client');

      if (error) {
        console.error('Error fetching clients:', error);
      } else {
        setClients(data || []);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchSubmissions = async (formId: string) => {
    try {
      // This would be replaced with actual DocuSeal API calls
      const mockSubmissions: DocuSealSubmission[] = [
        {
          id: '1',
          form_id: formId,
          client_email: 'john@example.com',
          status: 'signed',
          sent_at: '2024-01-15T10:00:00Z',
          signed_at: '2024-01-16T14:30:00Z',
          document_url: 'https://example.com/signed-doc.pdf'
        },
        {
          id: '2',
          form_id: formId,
          client_email: 'jane@example.com',
          status: 'pending',
          sent_at: '2024-01-15T11:00:00Z'
        }
      ];
      setSubmissions(mockSubmissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleCreateForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This would integrate with DocuSeal API to create a form
      console.log('Creating DocuSeal form:', formData);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Form created successfully",
      });
      
      setIsFormDialogOpen(false);
      setFormData({
        title: '',
        description: '',
        client_id: '',
        template_type: 'tax_authorization',
        fields: []
      });
      fetchForms();
    } catch (error) {
      console.error('Error creating form:', error);
      toast({
        title: "Error",
        description: "Failed to create form",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This would integrate with DocuSeal API to send a submission
      console.log('Sending DocuSeal submission:', submissionData);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Document sent for signing",
      });
      
      setIsSubmissionDialogOpen(false);
      setSubmissionData({
        form_id: '',
        client_email: '',
        message: '',
        expires_in_days: 7
      });
    } catch (error) {
      console.error('Error sending submission:', error);
      toast({
        title: "Error",
        description: "Failed to send document",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'secondary',
      active: 'default',
      completed: 'success',
      pending: 'warning',
      signed: 'success',
      expired: 'destructive'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const openFormBuilder = (formId: string) => {
    // This would open the DocuSeal form builder in a new window or iframe
    window.open(`/docuseal/forms/${formId}/edit`, '_blank');
  };

  const viewSignedDocument = (submission: DocuSealSubmission) => {
    if (submission.document_url) {
      window.open(submission.document_url, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Document Signing</h1>
          <p className="text-muted-foreground">
            Create and manage digital forms for client signatures
          </p>
        </div>
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Form
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Form</DialogTitle>
              <DialogDescription>
                Create a new document signing form for your clients.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateForm} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Form Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Tax Authorization Form 2024"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Brief description of the form"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select 
                  value={formData.client_id} 
                  onValueChange={(value) => setFormData({...formData, client_id: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client: any) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.full_name || client.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">Template Type</Label>
                <Select 
                  value={formData.template_type} 
                  onValueChange={(value) => setFormData({...formData, template_type: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tax_authorization">Tax Authorization</SelectItem>
                    <SelectItem value="financial_approval">Financial Statement Approval</SelectItem>
                    <SelectItem value="engagement_letter">Engagement Letter</SelectItem>
                    <SelectItem value="custom">Custom Form</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsFormDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Form"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Forms</CardTitle>
          <CardDescription>
            Manage your document signing forms and track submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Form Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{form.title}</div>
                      <div className="text-sm text-muted-foreground">{form.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{form.client_name}</TableCell>
                  <TableCell>{getStatusBadge(form.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {form.signed_count}/{form.submissions_count} signed
                    </div>
                  </TableCell>
                  <TableCell>{new Date(form.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedForm(form);
                          fetchSubmissions(form.id);
                          setIsSubmissionDialogOpen(true);
                        }}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openFormBuilder(form.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Submissions Dialog */}
      <Dialog open={isSubmissionDialogOpen} onOpenChange={setIsSubmissionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Send Document for Signing - {selectedForm?.title}
            </DialogTitle>
            <DialogDescription>
              Send this document to clients for digital signature
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <form onSubmit={handleSendSubmission} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client_email">Client Email</Label>
                <Input
                  id="client_email"
                  type="email"
                  value={submissionData.client_email}
                  onChange={(e) => setSubmissionData({...submissionData, client_email: e.target.value})}
                  placeholder="client@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Input
                  id="message"
                  value={submissionData.message}
                  onChange={(e) => setSubmissionData({...submissionData, message: e.target.value})}
                  placeholder="Please review and sign this document..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expires_in_days">Expires in (days)</Label>
                <Input
                  id="expires_in_days"
                  type="number"
                  value={submissionData.expires_in_days}
                  onChange={(e) => setSubmissionData({...submissionData, expires_in_days: parseInt(e.target.value)})}
                  min="1"
                  max="30"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsSubmissionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send for Signature"}
                </Button>
              </div>
            </form>

            {submissions.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-3">Recent Submissions</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{submission.client_email}</TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell>{new Date(submission.sent_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {submission.status === 'signed' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => viewSignedDocument(submission)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            )}
                            {submission.document_url && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(submission.document_url, '_blank')}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocuSealIntegration; 