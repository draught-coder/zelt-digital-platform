
-- Insert a sample 2024 tax bracket row to individual_tax_rates
INSERT INTO public.individual_tax_rates (
  category,
  chargeable_income,
  bracket_type,
  calculation,
  rate,
  tax_rm,
  year
) VALUES (
  'Resident Individual',           -- category
  'First RM5,000',                 -- chargeable_income
  'First',                         -- bracket_type
  '',                              -- calculation (optional, can be left blank)
  '0%',                            -- rate
  '0',                             -- tax_rm
  '2024'                           -- year (this is what will appear in the selector)
);
