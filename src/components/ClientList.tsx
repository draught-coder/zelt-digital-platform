import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Mail, Search, Filter } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import BookkeeperClientReport from './BookkeeperClientReport';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    // Filter clients based on name and year
    let filtered = clients;

    // Filter by name
    if (nameFilter) {
      filtered = filtered.filter(client => 
        client.full_name?.toLowerCase().includes(nameFilter.toLowerCase()) ||
        client.email?.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Filter by year
    if (yearFilter !== 'all') {
      filtered = filtered.filter(client => 
        client.financial_statements?.some(statement => statement.year === parseInt(yearFilter))
      );
    }

    setFilteredClients(filtered);
  }, [clients, nameFilter, yearFilter]);

  const fetchClients = async () => {
    try {
      console.log('Fetching clients...');
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          full_name,
          created_at,
          financial_statements!financial_statements_client_id_fkey (
            id,
            year
          )
        `)
        .eq('role', 'client');

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Error fetching clients:', error);
      } else {
        console.log('Clients data:', data);
        setClients(data || []);
        
        // Extract available years for filter
        const years = new Set();
        data?.forEach(client => {
          client.financial_statements?.forEach(statement => {
            years.add(statement.year);
          });
        });
        setAvailableYears(Array.from(years).sort((a, b) => Number(b) - Number(a))); // Sort descending
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
    <>
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
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by client name or email..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredClients.length} of {clients.length} clients
              {(nameFilter || yearFilter !== 'all') && (
                <span className="ml-2">
                  (filtered by {nameFilter ? 'name' : ''}
                  {nameFilter && yearFilter !== 'all' && ' and '}
                  {yearFilter !== 'all' ? `year ${yearFilter}` : ''})
                </span>
              )}
            </p>
          </div>

          {filteredClients.length > 0 ? (
            <div className="space-y-4">
              {filteredClients.map((client: any) => (
                <Card 
                  key={client.id} 
                  className={`border-l-4 ${selectedClientId === client.id ? 'border-l-blue-500 bg-blue-50' : 'border-l-green-500'} cursor-pointer transition-all`} 
                  onClick={() => setSelectedClientId(client.id)}
                >
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
                          Client since {formatDate(client.created_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">
                          {client.financial_statements?.length || 0} Statements
                        </Badge>
                        {client.financial_statements?.length > 0 && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Latest: {(() => {
                              const years: number[] = client.financial_statements
                                .map((s: any) => Number(s.year))
                                .filter((y: number) => !isNaN(y));
                              if (years.length === 0) return '-';
                              let maxYear = years[0];
                              for (let i = 1; i < years.length; i++) {
                                if (years[i] > maxYear) maxYear = years[i];
                              }
                              return maxYear;
                            })()}
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
              <p className="text-muted-foreground">
                {clients.length === 0 
                  ? 'No clients found.' 
                  : 'No clients match your current filters.'}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {clients.length === 0 
                  ? 'Clients will appear here when they register with your bookkeeping service.'
                  : 'Try adjusting your search criteria.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      {selectedClientId && (
        <div className="mt-8">
          <BookkeeperClientReport clientId={selectedClientId} />
        </div>
      )}
    </>
  );
};

export default ClientList;
