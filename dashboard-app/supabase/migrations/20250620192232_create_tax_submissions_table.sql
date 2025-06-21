-- Create enum for submission status
CREATE TYPE public.submission_status AS ENUM ('Pending', 'Submitted', 'Audited', 'Amended');

-- Create tax submissions table
CREATE TABLE public.tax_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  bookkeeper_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assessment_year INTEGER NOT NULL,
  status submission_status NOT NULL DEFAULT 'Pending',
  submission_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(client_id, assessment_year)
);

-- Enable RLS on the new table
ALTER TABLE public.tax_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tax submissions
CREATE POLICY "Clients can view their own tax submissions" ON public.tax_submissions
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Bookkeepers can view all tax submissions" ON public.tax_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'bookkeeper'
    )
  );

CREATE POLICY "Bookkeepers can manage tax submissions" ON public.tax_submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'bookkeeper'
    )
  );

-- Add updated_at trigger for tax submissions
CREATE TRIGGER update_tax_submissions_updated_at
  BEFORE UPDATE ON public.tax_submissions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
