-- DocuSeal Integration Tables
-- These tables store references to DocuSeal forms and submissions

-- Table to store DocuSeal form references
CREATE TABLE IF NOT EXISTS docuseal_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  docuseal_form_id VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  description TEXT,
  client_id UUID REFERENCES profiles(id),
  document_type VARCHAR DEFAULT 'custom',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table to store DocuSeal submission references
CREATE TABLE IF NOT EXISTS docuseal_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  docuseal_submission_id VARCHAR NOT NULL UNIQUE,
  docuseal_form_id VARCHAR NOT NULL,
  client_email VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  signed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  document_url TEXT,
  message TEXT,
  sent_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_docuseal_forms_client_id ON docuseal_forms(client_id);
CREATE INDEX IF NOT EXISTS idx_docuseal_forms_created_by ON docuseal_forms(created_by);
CREATE INDEX IF NOT EXISTS idx_docuseal_submissions_client_email ON docuseal_submissions(client_email);
CREATE INDEX IF NOT EXISTS idx_docuseal_submissions_status ON docuseal_submissions(status);
CREATE INDEX IF NOT EXISTS idx_docuseal_submissions_form_id ON docuseal_submissions(docuseal_form_id);

-- Add RLS policies
ALTER TABLE docuseal_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE docuseal_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for docuseal_forms
CREATE POLICY "Users can view forms they created" ON docuseal_forms
  FOR SELECT USING (created_by = auth.uid());

CREATE POLICY "Users can insert forms" ON docuseal_forms
  FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update forms they created" ON docuseal_forms
  FOR UPDATE USING (created_by = auth.uid());

-- Policies for docuseal_submissions
CREATE POLICY "Users can view submissions they sent" ON docuseal_submissions
  FOR SELECT USING (sent_by = auth.uid());

CREATE POLICY "Users can view submissions sent to them" ON docuseal_submissions
  FOR SELECT USING (client_email = (SELECT email FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can insert submissions" ON docuseal_submissions
  FOR INSERT WITH CHECK (sent_by = auth.uid());

CREATE POLICY "Users can update submissions they sent" ON docuseal_submissions
  FOR UPDATE USING (sent_by = auth.uid()); 