import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import FinancialStatementList from './FinancialStatementList';
import FinancialStatementForm from './FinancialStatementForm';

const FinancialStatementManager = () => {
  const [view, setView] = useState<'list' | 'new' | 'edit'>('list');
  const [editingStatementId, setEditingStatementId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingStatementId(id);
    setView('edit');
  };

  const handleNew = () => {
    setEditingStatementId(null);
    setView('new');
  };

  const handleSave = () => {
    setEditingStatementId(null);
    setView('list');
  };

  const handleBack = () => {
    setEditingStatementId(null);
    setView('list');
  };

  if (view === 'list') {
    return (
      <>
        <div className="flex justify-end mb-4">
          <Button onClick={handleNew}>
            <Plus className="h-4 w-4 mr-2" />
            New Statement
          </Button>
        </div>
        <FinancialStatementList onEdit={handleEdit} />
      </>
    );
  }

  if (view === 'new' || view === 'edit') {
    return (
      <FinancialStatementForm 
        statementId={editingStatementId} 
        onSave={handleSave}
        onBack={handleBack}
      />
    );
  }

  return null;
};

export default FinancialStatementManager; 