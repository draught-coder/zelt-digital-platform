-- Create the documents table
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  docuseal_envelope_id text, -- DocuSeal envelope or document ID
  docuseal_status text,      -- e.g., 'sent', 'signed', 'viewed'
  file_url text,             -- URL to the uploaded document (if stored)
  signed_file_url text,      -- URL to the signed document (if available)
  assigned_client uuid references auth.users(id), -- The client who should sign
  created_by uuid references auth.users(id),      -- Bookkeeper/admin who uploaded
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create indexes
create index if not exists documents_assigned_client_idx on documents(assigned_client);
create index if not exists documents_created_by_idx on documents(created_by);

-- Enable Row Level Security
alter table documents enable row level security;

-- Bookkeepers/Admins can view all documents
create policy if not exists "Bookkeepers can view all documents"
on documents
for select
using (
  auth.role() = 'bookkeeper' or auth.role() = 'admin'
);

-- Clients can only view their assigned documents
create policy if not exists "Clients can view their documents"
on documents
for select
using (
  assigned_client = auth.uid()
);

-- Bookkeepers/Admins can insert documents
create policy if not exists "Bookkeepers can insert documents"
on documents
for insert
with check (
  auth.role() = 'bookkeeper' or auth.role() = 'admin'
);

-- Clients cannot insert documents
create policy if not exists "Clients cannot insert documents"
on documents
for insert
with check (
  false
);

-- Bookkeepers/Admins can update documents
create policy if not exists "Bookkeepers can update documents"
on documents
for update
using (
  auth.role() = 'bookkeeper' or auth.role() = 'admin'
);

-- Clients cannot update documents
create policy if not exists "Clients cannot update documents"
on documents
for update
using (
  false
); 