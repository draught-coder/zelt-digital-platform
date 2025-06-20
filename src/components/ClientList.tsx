
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Mail } from 'lucide-react';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          full_name,
          created_at,
          financial_statements (
            id,
            year
          )
        `)
        .eq('role', 'client');

      if (error) {
        console.error('Error fetching clients:', error);
      } else {
        setClients(data || []);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
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
          <Users className="h-5 w-5" />
          Client Management
        </CardTitle>
        <CardDescription>
          View and manage your clients
        </CardDescription>
      </CardHeader>
      <CardContent>
        {clients.length > 0 ? (
          <div className="space-y-4">
            {clients.map((client: any) => (
              <Card key={client.id} className="border-l-4 border-l-green-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">
                        {client.full_name || 'No name provided'}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{client.email}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Client since {new Date(client.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">
                        {client.financial_statements?.length || 0} Statements
                      </Badge>
                      {client.financial_statements?.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Latest: {Math.max(...client.financial_statements.map((s: any) => s.year))}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No clients found.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Clients will appear here when they register with your bookkeeping service.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientList;
