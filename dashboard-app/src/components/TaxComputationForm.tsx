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

const TaxComputationForm = ({ computationId, onSave, onBack }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [financialStatements, setFinancialStatements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    financial_statement_id: '',
    business_income: 0,
    disallowable_expenses: 0,
    capital_allowance: 0,
    personal_relief: 0,
    tax_rebate: 0,
    tax_rate: 24 // Default Malaysian corporate tax rate
  });

  const isEditing = Boolean(computationId);

  useEffect(() => {
    fetchFinancialStatements();
    if (isEditing) {
      fetchComputationData(computationId);
    }
  }, [computationId]);

  const fetchFinancialStatements = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_statements')
        .select(`
          id,
          year,
          net_profit,
          profiles!client_id (
            full_name,
            email
          )
        `)
        .eq('bookkeeper_id', user?.id);

      if (error) {
        console.error('Error fetching financial statements:', error);
      } else {
        setFinancialStatements(data || []);
      }
    } catch (error) {
      console.error('Error fetching financial statements:', error);
    }
  };

  const fetchComputationData = async (id) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tax_computations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        toast({ title: "Error", description: "Failed to fetch computation data", variant: "destructive" });
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

    const upsertData: any = {
      ...formData,
    };
    
    // If editing, ensure we pass the ID for the upsert
    if (isEditing) {
      upsertData.id = computationId;
    }

    try {
      const { error } = await supabase
        .from('tax_computations')
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
          description: `Tax computation ${isEditing ? 'updated' : 'saved'} successfully`
        });
        if (onSave) onSave(); // Notify parent to refresh or switch view
      }
    } catch (error) {
      console.error('Error saving tax computation:', error);
      toast({
        title: "Error",
        description: "Failed to save tax computation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const taxableIncome = formData.business_income + formData.disallowable_expenses - formData.capital_allowance - formData.personal_relief;
  const taxPayable = Math.max((taxableIncome * formData.tax_rate / 100) - formData.tax_rebate, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{isEditing ? 'Edit' : 'New'} Tax Computation</CardTitle>
            <CardDescription>{isEditing ? 'Update' : 'Calculate'} tax liability for financial statements</CardDescription>
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
            <div className="space-y-2">
              <Label htmlFor="financial_statement">Financial Statement</Label>
              <Select 
                value={formData.financial_statement_id} 
                onValueChange={(value) => setFormData({...formData, financial_statement_id: value})}
                disabled={isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select financial statement" />
                </SelectTrigger>
                <SelectContent>
                  {financialStatements.map((statement: any) => (
                    <SelectItem key={statement.id} value={statement.id}>
                      {statement.profiles?.full_name || statement.profiles?.email} - Year {statement.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business_income">Business Income (RM)</Label>
                <Input
                  id="business_income"
                  type="number"
                  step="0.01"
                  value={formData.business_income}
                  onChange={(e) => setFormData({...formData, business_income: parseFloat(e.target.value) || 0})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disallowable_expenses">Disallowable Expenses (RM)</Label>
                <Input
                  id="disallowable_expenses"
                  type="number"
                  step="0.01"
                  value={formData.disallowable_expenses}
                  onChange={(e) => setFormData({...formData, disallowable_expenses: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capital_allowance">Capital Allowance (RM)</Label>
                <Input
                  id="capital_allowance"
                  type="number"
                  step="0.01"
                  value={formData.capital_allowance}
                  onChange={(e) => setFormData({...formData, capital_allowance: parseFloat(e.target.value) || 0})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personal_relief">Personal Relief (RM)</Label>
                <Input
                  id="personal_relief"
                  type="number"
                  step="0.01"
                  value={formData.personal_relief}
                  onChange={(e) => setFormData({...formData, personal_relief: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tax_rate">Tax Rate (%)</Label>
                <Input
                  id="tax_rate"
                  type="number"
                  step="0.01"
                  value={formData.tax_rate}
                  onChange={(e) => setFormData({...formData, tax_rate: parseFloat(e.target.value) || 0})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax_rebate">Tax Rebate (RM)</Label>
                <Input
                  id="tax_rebate"
                  type="number"
                  step="0.01"
                  value={formData.tax_rebate}
                  onChange={(e) => setFormData({...formData, tax_rebate: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Taxable Income:</span>
                <span className="font-bold">RM {taxableIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-medium">Tax Payable:</span>
                <span className="font-bold text-red-600">RM {taxPayable.toLocaleString()}</span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading || !formData.financial_statement_id}>
              {loading ? 'Saving...' : (isEditing ? 'Update Computation' : 'Save Tax Computation')}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxComputationForm;
