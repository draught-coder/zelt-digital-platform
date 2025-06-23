# DocuSeal Integration Guide

## Quick Start

You now have a complete DocuSeal integration ready to use! Here's what's been created:

### 1. API Client (`src/lib/docuseal-api.ts`)
- Handles all communication with your DocuSeal instance at `https://sign.app.ibnzelt.com`
- Uses your API key: `eCfHk2FfiW3SsCjbELmjcVrzgy3VwUuenhaM9aNvwis`
- Provides methods for creating forms, uploading documents, and sending for signatures

### 2. Bookkeeper Interface (`src/components/DocuSealManager.tsx`)
- Upload documents (PDF, DOC, DOCX)
- Create signing forms
- Send documents to clients for signatures
- Track form status and submissions

### 3. Client Interface (`src/components/DocuSealClientView.tsx`)
- View pending documents
- Sign documents directly
- Download completed documents
- Track signing status

### 4. Database Schema (`supabase/docuseal_tables.sql`)
- Tables to store DocuSeal form and submission references
- Row Level Security policies for data protection

## How to Use

### For Bookkeepers:

1. **Create a Document:**
   - Click "Create Document" button
   - Enter document name and description
   - Upload your PDF/DOC file
   - Click "Create Document"

2. **Send for Signing:**
   - Click "Send" on any document
   - Select client email from dropdown
   - Add a message (optional)
   - Set expiration days
   - Click "Send for Signature"

3. **Edit Forms:**
   - Click "Edit" to open DocuSeal form builder
   - Add signature fields, text fields, etc.
   - Save changes

### For Clients:

1. **View Documents:**
   - See all documents sent by your bookkeeper
   - Check status (Pending, Completed, Expired)

2. **Sign Documents:**
   - Click "Sign Document" for pending documents
   - DocuSeal opens in a new tab
   - Complete the signing process
   - Return to your dashboard

3. **Download Signed Documents:**
   - Click "Download" for completed documents
   - Get the signed PDF version

## Integration Steps

### Step 1: Add to Your Routes
Add the components to your routing system:

```typescript
// In your main App.tsx or router
import DocuSealManager from '@/components/DocuSealManager';
import DocuSealClientView from '@/components/DocuSealClientView';

// For bookkeepers
<Route path="/documents" element={<DocuSealManager />} />

// For clients  
<Route path="/my-documents" element={<DocuSealClientView />} />
```

### Step 2: Run Database Migration
Execute the SQL schema in your Supabase dashboard:

```sql
-- Run the contents of supabase/docuseal_tables.sql
```

### Step 3: Test the Integration

1. **Test Document Creation:**
   - Log in as a bookkeeper
   - Navigate to `/documents`
   - Create a test document
   - Verify it appears in DocuSeal

2. **Test Document Signing:**
   - Send a document to a client email
   - Log in as the client
   - Navigate to `/my-documents`
   - Sign the document
   - Verify status updates

## API Endpoints Used

The integration uses these DocuSeal API endpoints:

- `GET /api/forms` - List all forms
- `POST /api/forms` - Create new form
- `POST /api/forms/{id}/documents` - Upload document
- `POST /api/forms/{id}/submissions` - Send for signing
- `GET /api/forms/{id}/submissions` - Get submissions
- `GET /api/submissions/{id}` - Get specific submission

## Customization Options

### 1. Document Types
Add more document types in the form creation:

```typescript
// In DocuSealManager.tsx
<SelectItem value="tax_authorization">Tax Authorization</SelectItem>
<SelectItem value="financial_approval">Financial Statement Approval</SelectItem>
<SelectItem value="engagement_letter">Engagement Letter</SelectItem>
<SelectItem value="custom">Custom Document</SelectItem>
```

### 2. Email Templates
Customize the messages sent to clients:

```typescript
// In DocuSealManager.tsx
const defaultMessages = {
  tax_authorization: "Please review and sign this tax authorization form for the current year.",
  financial_approval: "Please review and approve the attached financial statements.",
  engagement_letter: "Please review and sign our engagement letter for the upcoming year."
};
```

### 3. Expiration Settings
Set different expiration periods for different document types:

```typescript
const expirationSettings = {
  tax_authorization: 7, // 7 days
  financial_approval: 14, // 14 days
  engagement_letter: 30 // 30 days
};
```

## Troubleshooting

### Common Issues:

1. **API Key Issues:**
   - Verify your API key is correct
   - Check if DocuSeal API is enabled
   - Ensure proper permissions

2. **Document Upload Fails:**
   - Check file format (PDF, DOC, DOCX only)
   - Verify file size (usually < 10MB)
   - Check network connectivity

3. **Client Can't See Documents:**
   - Verify client email matches exactly
   - Check RLS policies in Supabase
   - Ensure client is logged in

### Debug Mode:
Enable debug logging in the API client:

```typescript
// In src/lib/docuseal-api.ts
private async request(endpoint: string, options: RequestInit = {}) {
  const url = `${this.baseURL}/api${endpoint}`;
  console.log('DocuSeal API Request:', url, options); // Add this line
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  console.log('DocuSeal API Response:', response.status); // Add this line
  // ... rest of the method
}
```

## Next Steps

1. **Add to Navigation:** Include document signing in your main navigation
2. **Email Notifications:** Set up email alerts for document status changes
3. **Bulk Operations:** Add ability to send multiple documents at once
4. **Templates:** Create reusable document templates
5. **Analytics:** Track document completion rates and signing times

## Security Notes

- All documents are encrypted in DocuSeal
- API key should be stored securely (use environment variables)
- Row Level Security ensures users only see their own documents
- Document URLs expire automatically
- Audit trail is maintained for all signing activities

Your DocuSeal integration is now ready to use! The bookkeepers can upload government documents or software-generated files and send them to clients for digital signatures, all within your clean, integrated interface. 