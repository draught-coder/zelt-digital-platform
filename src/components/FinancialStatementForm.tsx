import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const FinancialStatementForm = ({ statementId, onSave, onBack }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_id: '',
    year: new Date().getFullYear(),
    revenue: 0,
    cost: 0,
    expenses: 0,
    fixed_asset: 0,
    current_asset: 0,
    fixed_liability: 0,
    current_liability: 0,
    owners_equity: 0
  });

  const isEditing = Boolean(statementId);

  useEffect(() => {
    fetchClients();
    if (isEditing) {
      fetchStatementData(statementId);
    }
  }, [statementId]);

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

  const fetchStatementData = async (id) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('financial_statements')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        toast({ title: "Error", description: "Failed to fetch statement data", variant: "destructive" });
      } else if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const upsertData = {
      ...formData,
      bookkeeper_id: user?.id,
    };
    
    // If editing, ensure we pass the ID for the upsert
    if (isEditing) {
      upsertData.id = statementId;
    }

    try {
      const { error } = await supabase
        .from('financial_statements')
        .upsert(upsertData, { onConflict: 'id' });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: `Financial statement ${isEditing ? 'updated' : 'saved'} successfully`
        });
        if (onSave) onSave(); // Notify parent to refresh or switch view
      }
    } catch (error) {
      console.error('Error saving financial statement:', error);
      toast({
        title: "Error",
        description: "Failed to save financial statement",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const grossProfit = formData.revenue - formData.cost;
  const grossProfitPercentage = formData.revenue > 0 ? ((grossProfit / formData.revenue) * 100).toFixed(2) : '0.00';
  const netProfit = grossProfit - formData.expenses;
  const netProfitPercentage = formData.revenue > 0 ? ((netProfit / formData.revenue) * 100).toFixed(2) : '0.00';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{isEditing ? 'Edit' : 'New'} Financial Statement</CardTitle>
            <CardDescription>{isEditing ? 'Update' : 'Enter'} financial data for your clients</CardDescription>
          </div>
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to List
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading && !isEditing ? (
          <div>Loading form...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select value={formData.client_id} onValueChange={(value) => setFormData({...formData, client_id: value})} disabled={isEditing}>
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
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  required
                  disabled={isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Revenue (RM)</Label>
                <Input
                  id="revenue"
                  type="number"
                  step="0.01"
                  value={formData.revenue}
                  onChange={(e) => setFormData({...formData, revenue: parseFloat(e.target.value) || 0})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost">Cost of Goods Sold (RM)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: parseFloat(e.target.value) || 0})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-sm font-medium">Gross Profit</Label>
                <p className="text-lg font-bold text-green-600">RM {grossProfit.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Gross Profit %</Label>
                <p className="text-lg font-bold text-green-600">{grossProfitPercentage}%</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expenses">Operating Expenses (RM)</Label>
              <Input
                id="expenses"
                type="number"
                step="0.01"
                value={formData.expenses}
                onChange={(e) => setFormData({...formData, expenses: parseFloat(e.target.value) || 0})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
              <div>
                <Label className="text-sm font-medium">Net Profit</Label>
                <p className="text-lg font-bold text-blue-600">RM {netProfit.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Net Profit %</Label>
                <p className="text-lg font-bold text-blue-600">{netProfitPercentage}%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fixed_asset">Fixed Assets (RM)</Label>
                <Input
                  id="fixed_asset"
                  type="number"
                  step="0.01"
                  value={formData.fixed_asset}
                  onChange={(e) => setFormData({...formData, fixed_asset: parseFloat(e.target.value) || 0})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current_asset">Current Assets (RM)</Label>
                <Input
                  id="current_asset"
                  type="number"
                  step="0.01"
                  value={formData.current_asset}
                  onChange={(e) => setFormData({...formData, current_asset: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fixed_liability">Fixed Liabilities (RM)</Label>
                <Input
                  id="fixed_liability"
                  type="number"
                  step="0.01"
                  value={formData.fixed_liability}
                  onChange={(e) => setFormData({...formData, fixed_liability: parseFloat(e.target.value) || 0})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current_liability">Current Liabilities (RM)</Label>
                <Input
                  id="current_liability"
                  type="number"
                  step="0.01"
                  value={formData.current_liability}
                  onChange={(e) => setFormData({...formData, current_liability: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="owners_equity">Owner's Equity (RM)</Label>
              <Input
                id="owners_equity"
                type="number"
                step="0.01"
                value={formData.owners_equity}
                onChange={(e) => setFormData({...formData, owners_equity: parseFloat(e.target.value) || 0})}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : (isEditing ? 'Update Statement' : 'Save Statement')}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialStatementForm;
