import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Edit, Filter } from 'lucide-react';

const TaxComputationList = ({ onEdit }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [computations, setComputations] = useState([]);
  const [filteredComputations, setFilteredComputations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState('all');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchComputations();
  }, []);

  useEffect(() => {
    // Filter computations based on selected client
    if (selectedClient === 'all') {
      setFilteredComputations(computations);
    } else {
      const filtered = computations.filter(computation => 
        computation.financial_statement?.client?.id === selectedClient
      );
      setFilteredComputations(filtered);
    }
  }, [selectedClient, computations]);

  const fetchComputations = async () => {
    try {
      const { data, error } = await supabase
        .from('tax_computations')
        .select(`
          id,
          business_income,
          tax_payable,
          financial_statement:financial_statements!financial_statement_id (
            id,
            year,
            client:profiles!client_id (
              id,
              full_name,
              email
            )
          )
        `)
        .eq('financial_statement.bookkeeper_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load tax computations",
          variant: "destructive"
        });
      } else {
        setComputations(data || []);
        setFilteredComputations(data || []);
        
        // Extract unique clients for filter dropdown
        const uniqueClients = data?.reduce((acc, computation) => {
          const client = computation.financial_statement?.client;
          if (client && !acc.find(c => c.id === client.id)) {
            acc.push(client);
          }
          return acc;
        }, []) || [];
        setClients(uniqueClients);
      }
    } catch (error) {
      console.error('Error fetching computations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading tax computations...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tax Computations</CardTitle>
            <CardDescription>View and manage tax computations for your clients</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.full_name || client.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredComputations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {selectedClient === 'all' 
              ? 'No tax computations found.' 
              : 'No computations found for the selected client.'}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Business Income (RM)</TableHead>
                <TableHead>Tax Payable (RM)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComputations.map((computation: any) => (
                <TableRow key={computation.id}>
                  <TableCell>
                    {computation.financial_statement?.client?.full_name || 
                     computation.financial_statement?.client?.email}
                  </TableCell>
                  <TableCell>{computation.financial_statement?.year}</TableCell>
                  <TableCell>{computation.business_income?.toLocaleString()}</TableCell>
                  <TableCell className="font-medium text-red-600">
                    {computation.tax_payable?.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => onEdit(computation.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxComputationList; 