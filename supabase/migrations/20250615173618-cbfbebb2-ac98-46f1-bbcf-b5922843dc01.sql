
-- Enable Row Level Security for the table (if not already enabled)
ALTER TABLE public.individual_tax_rates ENABLE ROW LEVEL SECURITY;

-- Allow public (everyone) to SELECT from individual_tax_rates
CREATE POLICY "Public can view individual tax rates"
  ON public.individual_tax_rates
  FOR SELECT
  USING (true);
