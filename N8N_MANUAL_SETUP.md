# n8n Manual Setup Guide

Since the JSON import might not work perfectly, here's how to build the workflows manually in n8n:

## 🎯 Workflow 1: Document Sent Notification

### Step 1: Create New Workflow
1. Open your n8n instance
2. Click "New Workflow"
3. Name it "DocuSeal Document Sent"

### Step 2: Add Webhook Trigger
1. Click the "+" button
2. Search for "Webhook"
3. Add "Webhook" node
4. Configure:
   - **HTTP Method**: POST
   - **Path**: `docuseal-document-sent`
   - **Response Mode**: Respond to Webhook

### Step 3: Add Email Node
1. Click "+" after the webhook
2. Search for "Email"
3. Add "Send Email" node
4. Configure:
   - **To**: `={{ $json.client_email }}`
   - **Subject**: `Document Ready - {{ $json.form_name }}`
   - **Text**:
   ```
   Hi {{ $json.client_name || 'there' }},

   Your bookkeeper has sent you a document for signature: {{ $json.form_name }}

   Please click the link below to review and sign:
   {{ $json.document_url }}

   This document expires on: {{ $json.expires_at }}

   Message from your bookkeeper: {{ $json.message }}

   Best regards,
   Zelt Digital Platform
   ```

### Step 4: Connect Nodes
1. Connect Webhook → Send Email
2. Save the workflow
3. Activate it

## 🎯 Workflow 2: WhatsApp Notification

### Step 1: Create New Workflow
1. Click "New Workflow"
2. Name it "DocuSeal WhatsApp"

### Step 2: Add Webhook Trigger
1. Add "Webhook" node
2. Configure:
   - **HTTP Method**: POST
   - **Path**: `docuseal-whatsapp`
   - **Response Mode**: Respond to Webhook

### Step 3: Add HTTP Request Node (for WhatsApp)
1. Add "HTTP Request" node
2. Configure:
   - **Method**: POST
   - **URL**: `https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages`
   - **Headers**:
     ```
     Authorization: Bearer YOUR_WHATSAPP_TOKEN
     Content-Type: application/json
     ```
   - **Body**:
   ```json
   {
     "messaging_product": "whatsapp",
     "to": "{{ $json.client_phone }}",
     "type": "template",
     "template": {
       "name": "document_ready",
       "language": {
         "code": "en"
       },
       "components": [
         {
           "type": "body",
           "parameters": [
             {
               "type": "text",
               "text": "{{ $json.client_name }}"
             },
             {
               "type": "text",
               "text": "{{ $json.form_name }}"
             },
             {
               "type": "text",
               "text": "{{ $json.document_url }}"
             },
             {
               "type": "text",
               "text": "{{ $json.expires_at }}"
             },
             {
               "type": "text",
               "text": "{{ $json.message }}"
             }
           ]
         }
       ]
     }
   }
   ```

### Step 4: Connect and Save
1. Connect Webhook → HTTP Request
2. Save and activate

## 🎯 Workflow 3: Reminder System

### Step 1: Create New Workflow
1. Click "New Workflow"
2. Name it "DocuSeal Reminders"

### Step 2: Add Cron Trigger
1. Add "Cron" node
2. Configure:
   - **Rule**: `0 */6 * * *` (every 6 hours)

### Step 3: Add HTTP Request (Check Pending Docs)
1. Add "HTTP Request" node
2. Configure:
   - **Method**: GET
   - **URL**: `https://sign.app.ibnzelt.com/api/forms`
   - **Headers**:
     ```
     Authorization: Bearer eCfHk2FfiW3SsCjbELmjcVrzgy3VwUuenhaM9aNvwis
     ```

### Step 4: Add Filter Node
1. Add "Filter" node
2. Configure to filter documents that expire soon

### Step 5: Add Email/WhatsApp Nodes
1. Add notification nodes for filtered documents
2. Connect: Cron → HTTP Request → Filter → Notifications

## 🔧 Configuration Steps

### 1. Email Configuration
In n8n settings, configure your email provider:
- **SMTP Host**: Your email provider's SMTP server
- **SMTP Port**: Usually 587 or 465
- **Username**: Your email address
- **Password**: Your email password or app password

### 2. WhatsApp Configuration
1. Get WhatsApp Business API credentials
2. Create message templates in WhatsApp Business Manager
3. Add credentials to n8n environment variables

### 3. Test the Workflows
1. Use the test buttons in your DocuSealAutomation component
2. Check n8n execution logs
3. Verify emails/WhatsApp messages are sent

## 📝 Sample Test Data

Use this JSON to test your webhooks:

```json
{
  "event_type": "document_sent",
  "document_id": "test-123",
  "form_name": "Tax Authorization Form 2024",
  "client_email": "test@example.com",
  "client_name": "John Doe",
  "bookkeeper_email": "bookkeeper@example.com",
  "bookkeeper_name": "Jane Smith",
  "status": "pending",
  "created_at": "2024-01-15T10:00:00Z",
  "expires_at": "2024-01-22T10:00:00Z",
  "document_url": "https://sign.app.ibnzelt.com/s/test-submission",
  "message": "Please review and sign this tax authorization form."
}
```

## 🚀 Next Steps

1. **Build the workflows manually** using the steps above
2. **Test each workflow** with sample data
3. **Configure your DocuSealManager** to trigger the webhooks
4. **Monitor the executions** in n8n dashboard
5. **Optimize based on usage patterns**

This manual approach will give you more control and understanding of how the automation works! 🎯 