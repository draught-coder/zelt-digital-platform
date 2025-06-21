import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Edit, Filter } from 'lucide-react';

const FinancialStatementList = ({ onEdit }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [statements, setStatements] = useState([]);
  const [filteredStatements, setFilteredStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState('all');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchStatements();
  }, []);

  useEffect(() => {
    // Filter statements based on selected client
    if (selectedClient === 'all') {
      setFilteredStatements(statements);
    } else {
      const filtered = statements.filter(statement => statement.client?.id === selectedClient);
      setFilteredStatements(filtered);
    }
  }, [selectedClient, statements]);

  const fetchStatements = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_statements')
        .select(`
          id,
          year,
          net_profit,
          client:profiles!client_id (
            id,
            full_name,
            email
          )
        `)
        .eq('bookkeeper_id', user?.id)
        .order('year', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load financial statements",
          variant: "destructive"
        });
      } else {
        setStatements(data || []);
        setFilteredStatements(data || []);
        
        // Extract unique clients for filter dropdown
        const uniqueClients = data?.reduce((acc, statement) => {
          const client = statement.client;
          if (client && !acc.find(c => c.id === client.id)) {
            acc.push(client);
          }
          return acc;
        }, []) || [];
        setClients(uniqueClients);
      }
    } catch (error) {
      console.error('Error fetching statements:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading statements...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Financial Statements</CardTitle>
            <CardDescription>View and manage your clients' financial statements</CardDescription>
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
        {filteredStatements.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {selectedClient === 'all' 
              ? 'No financial statements found.' 
              : 'No statements found for the selected client.'}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Net Profit (RM)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStatements.map((statement: any) => (
                <TableRow key={statement.id}>
                  <TableCell>{statement.client?.full_name || statement.client?.email}</TableCell>
                  <TableCell>{statement.year}</TableCell>
                  <TableCell>{statement.net_profit?.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => onEdit(statement.id)}>
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

export default FinancialStatementList; 