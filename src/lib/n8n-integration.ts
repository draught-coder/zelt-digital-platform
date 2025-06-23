// n8n Integration for DocuSeal Automation
const N8N_BASE_URL = process.env.N8N_BASE_URL || 'http://localhost:5678';
const N8N_API_KEY = process.env.N8N_API_KEY;

export interface N8NWebhookData {
  event_type: 'document_created' | 'document_sent' | 'document_signed' | 'document_expired' | 'reminder_sent';
  document_id: string;
  form_name: string;
  client_email: string;
  client_name?: string;
  bookkeeper_email: string;
  bookkeeper_name?: string;
  status: string;
  created_at: string;
  expires_at?: string;
  signed_at?: string;
  document_url?: string;
  message?: string;
}

export interface WhatsAppMessage {
  to: string;
  message: string;
  document_url?: string;
  template_name?: string;
}

class N8NIntegration {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = N8N_BASE_URL;
    this.apiKey = N8N_API_KEY || '';
  }

  private async triggerWebhook(webhookId: string, data: any) {
    const url = `${this.baseURL}/webhook/${webhookId}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'X-N8N-API-KEY': this.apiKey }),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`n8n webhook error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('n8n webhook error:', error);
      throw error;
    }
  }

  // Trigger document creation workflow
  async triggerDocumentCreated(data: N8NWebhookData) {
    return this.triggerWebhook('docuseal-document-created', {
      ...data,
      event_type: 'document_created',
      timestamp: new Date().toISOString(),
    });
  }

  // Trigger document sent workflow
  async triggerDocumentSent(data: N8NWebhookData) {
    return this.triggerWebhook('docuseal-document-sent', {
      ...data,
      event_type: 'document_sent',
      timestamp: new Date().toISOString(),
    });
  }

  // Trigger document signed workflow
  async triggerDocumentSigned(data: N8NWebhookData) {
    return this.triggerWebhook('docuseal-document-signed', {
      ...data,
      event_type: 'document_signed',
      timestamp: new Date().toISOString(),
    });
  }

  // Trigger reminder workflow
  async triggerReminder(data: N8NWebhookData) {
    return this.triggerWebhook('docuseal-reminder', {
      ...data,
      event_type: 'reminder_sent',
      timestamp: new Date().toISOString(),
    });
  }

  // Trigger expiration warning workflow
  async triggerExpirationWarning(data: N8NWebhookData) {
    return this.triggerWebhook('docuseal-expiration-warning', {
      ...data,
      event_type: 'document_expired',
      timestamp: new Date().toISOString(),
    });
  }

  // Send WhatsApp message via n8n
  async sendWhatsAppMessage(messageData: WhatsAppMessage) {
    return this.triggerWebhook('whatsapp-send-message', {
      ...messageData,
      timestamp: new Date().toISOString(),
    });
  }

  // Bulk send WhatsApp messages
  async sendBulkWhatsAppMessages(messages: WhatsAppMessage[]) {
    return this.triggerWebhook('whatsapp-bulk-send', {
      messages,
      timestamp: new Date().toISOString(),
    });
  }

  // Get workflow status
  async getWorkflowStatus(workflowId: string) {
    const url = `${this.baseURL}/api/v1/workflows/${workflowId}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`n8n API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('n8n API error:', error);
      throw error;
    }
  }
}

export const n8nIntegration = new N8NIntegration(); 