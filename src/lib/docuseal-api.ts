// DocuSeal API Client
const DOCUSEAL_BASE_URL = 'https://sign.app.ibnzelt.com';
const DOCUSEAL_API_KEY = 'eCfHk2FfiW3SsCjbELmjcVrzgy3VwUuenhaM9aNvwis';

export interface DocuSealForm {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'archived';
  created_at: string;
  updated_at: string;
  submissions_count: number;
  fields_count: number;
}

export interface DocuSealSubmission {
  id: string;
  form_id: string;
  email: string;
  status: 'pending' | 'completed' | 'expired';
  created_at: string;
  completed_at?: string;
  expires_at?: string;
  document_url?: string;
}

export interface CreateFormData {
  name: string;
  description?: string;
  fields?: any[];
}

export interface SendSubmissionData {
  email: string;
  message?: string;
  expires_in_days?: number;
}

class DocuSealAPI {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = DOCUSEAL_BASE_URL;
    this.apiKey = DOCUSEAL_API_KEY;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`DocuSeal API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get all forms
  async getForms(): Promise<DocuSealForm[]> {
    return this.request('/forms');
  }

  // Get a specific form
  async getForm(formId: string): Promise<DocuSealForm> {
    return this.request(`/forms/${formId}`);
  }

  // Create a new form
  async createForm(data: CreateFormData): Promise<DocuSealForm> {
    return this.request('/forms', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Upload a document to a form
  async uploadDocument(formId: string, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseURL}/api/forms/${formId}/documents`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`DocuSeal API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get submissions for a form
  async getSubmissions(formId: string): Promise<DocuSealSubmission[]> {
    return this.request(`/forms/${formId}/submissions`);
  }

  // Send a submission for signing
  async sendSubmission(formId: string, data: SendSubmissionData): Promise<DocuSealSubmission> {
    return this.request(`/forms/${formId}/submissions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Get a specific submission
  async getSubmission(submissionId: string): Promise<DocuSealSubmission> {
    return this.request(`/submissions/${submissionId}`);
  }

  // Delete a form
  async deleteForm(formId: string): Promise<void> {
    return this.request(`/forms/${formId}`, {
      method: 'DELETE',
    });
  }

  // Get signing URL for a submission
  getSigningUrl(submissionId: string): string {
    return `${this.baseURL}/s/${submissionId}`;
  }

  // Generate a direct signing link (no login required)
  generateDirectSigningLink(submissionId: string, clientEmail: string): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/sign/${submissionId}?email=${encodeURIComponent(clientEmail)}`;
  }

  // Get form builder URL
  getFormBuilderUrl(formId: string): string {
    return `${this.baseURL}/forms/${formId}/edit`;
  }
}

export const docuSealAPI = new DocuSealAPI(); 