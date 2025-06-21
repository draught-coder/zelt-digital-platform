import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { FileText, Calendar, CheckCircle, Clock, AlertCircle, Edit } from 'lucide-react';

const TaxSubmissions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaxSubmissions();
  }, []);

  const fetchTaxSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('tax_submissions')
        .select(`
          *,
          bookkeeper:profiles!tax_submissions_bookkeeper_id_fkey (
            full_name,
            email
          )
        `)
        .eq('client_id', user?.id)
        .order('assessment_year', { ascending: false });

      if (error) {
        console.error('Error fetching tax submissions:', error);
        toast({
          title: "Error",
          description: "Failed to load tax submissions",
          variant: "destructive"
        });
      } else {
        setSubmissions(data || []);
      }
    } catch (error) {
      console.error('Error fetching tax submissions:', error);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Tax Submissions
        </CardTitle>
        <CardDescription>
          Track your tax assessment submissions and their current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submissions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Bookkeeper</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
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
                    {submission.bookkeeper?.full_name || submission.bookkeeper?.email || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {formatDate(submission.updated_at)}
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
              Your bookkeeper will add tax submission records here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxSubmissions; 