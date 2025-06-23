-- Documents table for assignment and client filtering
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  template_id text not null,
  assigned_client text not null, -- client email or user id
  created_at timestamptz default now()
);

create index if not exists documents_template_id_idx on documents(template_id);
create index if not exists documents_assigned_client_idx on documents(assigned_client);

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
  updated_at timestamptz default now(),
  status text default 'assigned'
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

-- Optionally, add a check constraint for allowed values
-- alter table documents add constraint documents_status_check check (status in ('assigned', 'pending', 'viewed', 'signed', 'completed')); 

-- Event logs table for document event tracking
create table if not exists event_logs (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents(id),
  event_type text not null, -- e.g., 'assigned', 'viewed', 'signed', 'reminder_sent'
  event_details text,       -- optional: extra info (e.g., IP, device, etc.)
  created_at timestamptz default now()
);

create index if not exists event_logs_document_id_idx on event_logs(document_id); 