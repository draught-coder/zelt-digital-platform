import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { docuSealAPI } from '@/lib/docuseal-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { FileText, ExternalLink, Download, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface ClientDocument {
  id: string;
  form_name: string;
  status: 'pending' | 'completed' | 'expired';
  sent_at: string;
  expires_at?: string;
  signed_at?: string;
  document_url?: string;
  message?: string;
  template_id: string;
  assigned_client: string;
  created_at: string;
}

const DocuSealClientView = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchClientDocuments();
    }
  }, [user]);

  const fetchClientDocuments = async () => {
    setLoading(true);
    try {
      if (!user) return;
      // Fetch only documents assigned to this client
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('assigned_client', user.email); // or user.id if you use IDs
      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch documents',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      completed: 'default',
      expired: 'destructive'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const openSigningPage = (submissionId: string) => {
    const signingUrl = docuSealAPI.getSigningUrl(submissionId);
    window.open(signingUrl, '_blank');
  };

  const downloadSignedDocument = (documentUrl: string) => {
    if (documentUrl) {
      window.open(documentUrl, '_blank');
    }
  };

  const isExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/dashboard">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">My Documents</h1>
          <p className="text-muted-foreground">
            View and sign documents sent by your bookkeeper
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading documents...</div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No documents found. Your bookkeeper will send documents here when they need your signature.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent Date</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{doc.form_name}</div>
                        {doc.message && (
                          <div className="text-sm text-muted-foreground">{doc.message}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {isExpired(doc.expires_at) && doc.status === 'pending' ? (
                        <Badge variant="destructive">Expired</Badge>
                      ) : (
                        getStatusBadge(doc.status)
                      )}
                    </TableCell>
                    <TableCell>{new Date(doc.sent_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {doc.expires_at ? (
                        <div className="text-sm">
                          {new Date(doc.expires_at).toLocaleDateString()}
                          {isExpired(doc.expires_at) && (
                            <div className="text-red-500 text-xs">Expired</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No expiry</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {doc.status === 'pending' && !isExpired(doc.expires_at) && (
                          <Button
                            size="sm"
                            onClick={() => openSigningPage(doc.id)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Sign Document
                          </Button>
                        )}
                        {doc.status === 'completed' && doc.document_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadSignedDocument(doc.document_url!)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        )}
                        {doc.status === 'pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openSigningPage(doc.id)}
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
          )}
        </CardContent>
      </Card>

      {documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Document Status Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Pending</Badge>
                <span className="text-sm">Document waiting for your signature</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="default">Completed</Badge>
                <span className="text-sm">Document has been signed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="destructive">Expired</Badge>
                <span className="text-sm">Document signing deadline passed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {documents.length === 0 ? (
        <div className="text-center text-gray-500">No documents assigned to you yet.</div>
      ) : (
        documents.map((doc) => (
          <div key={doc.id} className="mb-4 p-4 border rounded">
            <div className="font-bold">{doc.template_id}</div>
            <div className="text-sm text-gray-500">Assigned: {doc.assigned_client}</div>
            <div className="text-sm text-gray-500">Created: {new Date(doc.created_at).toLocaleString()}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default DocuSealClientView; 