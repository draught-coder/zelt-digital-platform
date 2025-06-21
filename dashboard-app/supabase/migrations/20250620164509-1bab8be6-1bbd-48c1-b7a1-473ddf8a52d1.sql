
-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('bookkeeper', 'client');

-- Create profiles table to extend auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create financial statements table
CREATE TABLE public.financial_statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bookkeeper_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  revenue NUMERIC(15,2) DEFAULT 0,
  cost NUMERIC(15,2) DEFAULT 0,
  gross_profit NUMERIC(15,2) GENERATED ALWAYS AS (revenue - cost) STORED,
  gross_profit_percentage NUMERIC(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN revenue > 0 THEN ROUND(((revenue - cost) / revenue * 100)::numeric, 2)
      ELSE 0
    END
  ) STORED,
  expenses NUMERIC(15,2) DEFAULT 0,
  net_profit NUMERIC(15,2) GENERATED ALWAYS AS (revenue - cost - expenses) STORED,
  net_profit_percentage NUMERIC(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN revenue > 0 THEN ROUND(((revenue - cost - expenses) / revenue * 100)::numeric, 2)
      ELSE 0
    END
  ) STORED,
  fixed_asset NUMERIC(15,2) DEFAULT 0,
  current_asset NUMERIC(15,2) DEFAULT 0,
  fixed_liability NUMERIC(15,2) DEFAULT 0,
  current_liability NUMERIC(15,2) DEFAULT 0,
  owners_equity NUMERIC(15,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(client_id, year)
);

-- Create tax computations table
CREATE TABLE public.tax_computations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  financial_statement_id UUID NOT NULL REFERENCES public.financial_statements(id) ON DELETE CASCADE,
  business_income NUMERIC(15,2) DEFAULT 0,
  disallowable_expenses NUMERIC(15,2) DEFAULT 0,
  capital_allowance NUMERIC(15,2) DEFAULT 0,
  personal_relief NUMERIC(15,2) DEFAULT 0,
  tax_rebate NUMERIC(15,2) DEFAULT 0,
  tax_rate NUMERIC(5,2) DEFAULT 0,
  tax_payable NUMERIC(15,2) GENERATED ALWAYS AS (
    GREATEST(
      ((business_income + disallowable_expenses - capital_allowance - personal_relief) * tax_rate / 100) - tax_rebate,
      0
    )
  ) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tax planning table
CREATE TABLE public.tax_planning (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bookkeeper_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  planning_details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tax simulations table
CREATE TABLE public.tax_simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bookkeeper_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  simulation_details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_computations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_planning ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_simulations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for financial statements
CREATE POLICY "Bookkeepers can view all financial statements" ON public.financial_statements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'bookkeeper'
    )
  );

CREATE POLICY "Clients can view their own financial statements" ON public.financial_statements
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Bookkeepers can insert financial statements" ON public.financial_statements
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'bookkeeper'
    )
  );

CREATE POLICY "Bookkeepers can update financial statements" ON public.financial_statements
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'bookkeeper'
    )
  );

-- Create RLS policies for tax computations (similar pattern)
CREATE POLICY "Bookkeepers can manage tax computations" ON public.tax_computations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'bookkeeper'
    )
  );

CREATE POLICY "Clients can view their tax computations" ON public.tax_computations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.financial_statements fs
      WHERE fs.id = financial_statement_id AND fs.client_id = auth.uid()
    )
  );

-- Create RLS policies for tax planning
CREATE POLICY "Bookkeepers can manage tax planning" ON public.tax_planning
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'bookkeeper'
    )
  );

CREATE POLICY "Clients can view their tax planning" ON public.tax_planning
  FOR SELECT USING (auth.uid() = client_id);

-- Create RLS policies for tax simulations
CREATE POLICY "Bookkeepers can manage tax simulations" ON public.tax_simulations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'bookkeeper'
    )
  );

CREATE POLICY "Clients can view their tax simulations" ON public.tax_simulations
  FOR SELECT USING (auth.uid() = client_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')::user_role,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_financial_statements_updated_at
  BEFORE UPDATE ON public.financial_statements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_tax_computations_updated_at
  BEFORE UPDATE ON public.tax_computations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_tax_planning_updated_at
  BEFORE UPDATE ON public.tax_planning
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_tax_simulations_updated_at
  BEFORE UPDATE ON public.tax_simulations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
