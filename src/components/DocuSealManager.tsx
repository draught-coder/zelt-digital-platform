import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { docuSealAPI, DocuSealForm, DocuSealSubmission } from '@/lib/docuseal-api';
// import { n8nIntegration, N8NWebhookData } from '@/lib/n8n-integration';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Send, Edit, Upload, Download, Eye, ExternalLink, Home, Users, FileText, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormWithSubmissions extends DocuSealForm {
  submissions?: DocuSealSubmission[];
  assigned_client?: {
    id: string;
    full_name: string;
    email: string;
  };
}

const DocuSealManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [forms, setForms] = useState<FormWithSubmissions[]>([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormWithSubmissions | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client_id: '',
    document_type: 'tax_authorization'
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
      const formsData = await docuSealAPI.getForms();
      
      // Fetch submissions for each form
      const formsWithSubmissions = await Promise.all(
        formsData.map(async (form) => {
          try {
            const submissions = await docuSealAPI.getSubmissions(form.id);
            return { ...form, submissions };
          } catch (error) {
            console.error(`Error fetching submissions for form ${form.id}:`, error);
            return { ...form, submissions: [] };
          }
        })
      );
      
      setForms(formsWithSubmissions);
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

  const handleCreateForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newForm = await docuSealAPI.createForm({
        name: formData.name,
        description: formData.description
      });

      if (selectedFile) {
        await docuSealAPI.uploadDocument(newForm.id, selectedFile);
      }

      // Store form reference in Supabase with client assignment
      if (formData.client_id) {
        const { error } = await supabase
          .from('docuseal_forms')
          .insert({
            docuseal_form_id: newForm.id,
            name: formData.name,
            description: formData.description,
            client_id: formData.client_id,
            document_type: formData.document_type,
            created_by: user?.id
          });

        if (error) {
          console.error('Error storing form reference:', error);
        }
      }

      toast({
        title: "Success",
        description: "Document created successfully",
      });
      
      setIsCreateOpen(false);
      setFormData({
        name: '',
        description: '',
        client_id: '',
        document_type: 'tax_authorization'
      });
      setSelectedFile(null);
      fetchForms();
    } catch (error) {
      console.error('Error creating form:', error);
      toast({
        title: "Error",
        description: "Failed to create document",
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
      await docuSealAPI.sendSubmission(
        submissionData.form_id,
        {
          email: submissionData.client_email,
          message: submissionData.message,
          expires_in_days: submissionData.expires_in_days
        }
      );

      // Trigger n8n automation
      try {
        const client = clients.find((c: any) => c.email === submissionData.client_email);
        const form = forms.find(f => f.id === submissionData.form_id);
        
        // await n8nIntegration.triggerDocumentSent({
        //   event_type: 'document_sent',
        //   document_id: submissionData.form_id,
        //   form_name: form?.name || 'Document',
        //   client_email: submissionData.client_email,
        //   client_name: client?.full_name || submissionData.client_email.split('@')[0],
        //   bookkeeper_email: user?.email || '',
        //   bookkeeper_name: user?.email?.split('@')[0] || 'Bookkeeper',
        //   status: 'pending',
        //   created_at: new Date().toISOString(),
        //   expires_at: new Date(Date.now() + submissionData.expires_in_days * 24 * 60 * 60 * 1000).toISOString(),
        //   document_url: form ? docuSealAPI.getSigningUrl(submissionData.form_id) : '',
        //   message: submissionData.message
        // });
      } catch (automationError) {
        console.error('Automation error:', automationError);
        // Don't fail the main operation if automation fails
      }

      toast({
        title: "Success",
        description: "Document sent for signing",
      });
      
      setIsSendOpen(false);
      setSubmissionData({
        form_id: '',
        client_email: '',
        message: '',
        expires_in_days: 7
      });
      fetchForms();
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

  const openFormBuilder = (formId: string) => {
    const url = docuSealAPI.getFormBuilderUrl(formId);
    window.open(url, '_blank');
  };

  const downloadSignedDocument = (documentUrl: string) => {
    if (documentUrl) {
      window.open(documentUrl, '_blank');
    } else {
      toast({
        title: "Error",
        description: "Document URL not available",
        variant: "destructive"
      });
    }
  };

  const viewSubmissions = (form: FormWithSubmissions) => {
    setSelectedForm(form);
    setIsSubmissionsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'secondary',
      active: 'default',
      archived: 'destructive',
      pending: 'secondary',
      completed: 'default',
      expired: 'destructive'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getCompletedSubmissionsCount = (form: FormWithSubmissions) => {
    return form.submissions?.filter(sub => sub.status === 'completed').length || 0;
  };

  const getPendingSubmissionsCount = (form: FormWithSubmissions) => {
    return form.submissions?.filter(sub => sub.status === 'pending').length || 0;
  };

  const getDocumentTypeLabel = (type: string) => {
    const types = {
      tax_authorization: 'Tax Authorization',
      financial_approval: 'Financial Approval',
      engagement_letter: 'Engagement Letter',
      custom: 'Custom Document'
    };
    return types[type as keyof typeof types] || type;
  };

  const getClientName = (clientId: string) => {
    const client = clients.find((c: any) => c.id === clientId);
    return client ? client.full_name || client.email : 'Not assigned';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Document Signing</h1>
                <p className="text-gray-600">
                  Create and manage digital forms for client signatures
                </p>
              </div>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Create Document</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Document</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateForm} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Document Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g., Tax Authorization Form 2024"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="document_type">Document Type</Label>
                      <Select 
                        value={formData.document_type} 
                        onValueChange={(value) => setFormData({...formData, document_type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tax_authorization">Tax Authorization</SelectItem>
                          <SelectItem value="financial_approval">Financial Statement Approval</SelectItem>
                          <SelectItem value="engagement_letter">Engagement Letter</SelectItem>
                          <SelectItem value="custom">Custom Document</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Brief description of the document and its purpose"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client_id">Assign to Client</Label>
                    <Select 
                      value={formData.client_id} 
                      onValueChange={(value) => setFormData({...formData, client_id: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a client for this document" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client: any) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.full_name} ({client.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Only the selected client will be able to see and sign this document
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file">Upload Document</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Supported formats: PDF, DOC, DOCX (Max 10MB)
                    </p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Creating..." : "Create Document"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{forms.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {forms.reduce((total, form) => total + getCompletedSubmissionsCount(form), 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {forms.reduce((total, form) => total + getPendingSubmissionsCount(form), 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Document Forms</CardTitle>
            <CardDescription>
              Manage your document signing forms and track submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading documents...</p>
              </div>
            ) : forms.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
                <p className="text-gray-600 mb-4">Create your first document to get started</p>
                <Button onClick={() => setIsCreateOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Document
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Assigned Client</TableHead>
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
                            <div className="font-medium text-gray-900">{form.name}</div>
                            <div className="text-sm text-gray-500">{form.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{getDocumentTypeLabel(formData.document_type)}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formData.client_id ? getClientName(formData.client_id) : 'Not assigned'}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(form.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">{form.submissions_count} total</div>
                            <div className="text-gray-500">{getCompletedSubmissionsCount(form)} completed</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">{new Date(form.created_at).toLocaleDateString()}</div>
                            <div className="text-gray-500">{new Date(form.created_at).toLocaleTimeString()}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSubmissionData({...submissionData, form_id: form.id});
                                setIsSendOpen(true);
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
                            {form.submissions && form.submissions.length > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => viewSubmissions(form)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
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
          </CardContent>
        </Card>
      </div>

      {/* Send Submission Dialog */}
      <Dialog open={isSendOpen} onOpenChange={setIsSendOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Document for Signing</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSendSubmission} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client_email">Client Email</Label>
              <Select 
                value={submissionData.client_email} 
                onValueChange={(value) => setSubmissionData({...submissionData, client_email: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client email" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client: any) => (
                    <SelectItem key={client.id} value={client.email}>
                      {client.full_name} ({client.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={submissionData.message}
                onChange={(e) => setSubmissionData({...submissionData, message: e.target.value})}
                placeholder="Please review and sign this document..."
                rows={3}
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
              <Button type="button" variant="outline" onClick={() => setIsSendOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send for Signature"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Submissions Dialog */}
      <Dialog open={isSubmissionsOpen} onOpenChange={setIsSubmissionsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              Submissions - {selectedForm?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedForm && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="font-medium">Total Submissions</div>
                  <div className="text-2xl font-bold">{selectedForm.submissions?.length || 0}</div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="font-medium">Completed</div>
                  <div className="text-2xl font-bold text-green-600">{getCompletedSubmissionsCount(selectedForm)}</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded">
                  <div className="font-medium">Pending</div>
                  <div className="text-2xl font-bold text-yellow-600">{getPendingSubmissionsCount(selectedForm)}</div>
                </div>
              </div>

              {selectedForm.submissions && selectedForm.submissions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sent Date</TableHead>
                      <TableHead>Completed Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedForm.submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell>{new Date(submission.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {submission.completed_at ? 
                            new Date(submission.completed_at).toLocaleDateString() : 
                            <span className="text-muted-foreground">-</span>
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {submission.status === 'completed' && submission.document_url && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => downloadSignedDocument(submission.document_url!)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            )}
                            {submission.status === 'pending' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const signingUrl = docuSealAPI.getSigningUrl(submission.id);
                                  window.open(signingUrl, '_blank');
                                }}
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No submissions found for this document.
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocuSealManager; 