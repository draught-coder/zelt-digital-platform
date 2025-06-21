import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TaxComputationList from './TaxComputationList';
import TaxComputationForm from './TaxComputationForm';

const TaxComputationManager = () => {
  const [view, setView] = useState<'list' | 'new' | 'edit'>('list');
  const [editingComputationId, setEditingComputationId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingComputationId(id);
    setView('edit');
  };

  const handleNew = () => {
    setEditingComputationId(null);
    setView('new');
  };

  const handleSave = () => {
    setEditingComputationId(null);
    setView('list');
  };

  const handleBack = () => {
    setEditingComputationId(null);
    setView('list');
  };

  if (view === 'list') {
    return (
      <>
        <div className="flex justify-end mb-4">
          <Button onClick={handleNew}>
            <Plus className="h-4 w-4 mr-2" />
            New Computation
          </Button>
        </div>
        <TaxComputationList onEdit={handleEdit} />
      </>
    );
  }

  if (view === 'new' || view === 'edit') {
    return (
      <TaxComputationForm 
        computationId={editingComputationId} 
        onSave={handleSave}
        onBack={handleBack}
      />
    );
  }

  return null;
};

export default TaxComputationManager; 