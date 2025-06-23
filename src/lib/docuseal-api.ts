// DocuSeal API Client
const DOCUSEAL_BASE_URL = 'https://docuseal-cors-proxy.ashrafsallehzelt.workers.dev';
const DOCUSEAL_API_KEY = import.meta.env.VITE_DOCUSEAL_API_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!DOCUSEAL_API_KEY) throw new Error("VITE_DOCUSEAL_API_KEY is required");
if (!SUPABASE_URL) throw new Error("VITE_SUPABASE_URL is required");
if (!SUPABASE_ANON_KEY) throw new Error("VITE_SUPABASE_ANON_KEY is required");

import { createClient } from '@supabase/supabase-js';
export const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

export interface DocuSealTemplate {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface DocuSealSubmission {
  id: string;
  template_id: number;
  email?: string;
  status?: string;
  created_at?: string;
  completed_at?: string;
  document_url?: string;
}

export interface CreateSubmissionData {
  template_id: number;
  submitters?: any[];
  emails?: string;
  values?: Record<string, any>;
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
    let extraHeaders: Record<string, string> = {};
    if (options.headers && typeof options.headers === 'object' && !Array.isArray(options.headers)) {
      extraHeaders = options.headers as Record<string, string>;
    }
    const headers: Record<string, string> = {
      'X-Auth-Token': this.apiKey,
      ...extraHeaders,
    };
    // Only set Content-Type if not sending FormData
    if (!(options.body instanceof FormData) && options.method !== 'GET') {
      headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(url, {
      ...options,
      headers,
    });
    if (!response.ok) {
      throw new Error(`DocuSeal API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  // Get all templates (forms)
  async getTemplates(): Promise<DocuSealTemplate[]> {
    return this.request('/templates');
  }

  // Get a specific template
  async getTemplate(templateId: number): Promise<DocuSealTemplate> {
    return this.request(`/templates/${templateId}`);
  }

  // Create a submission (send for signing)
  async createSubmission(data: CreateSubmissionData): Promise<DocuSealSubmission> {
    return this.request('/submissions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Send to multiple emails (alternative endpoint)
  async sendSubmissionEmails(templateId: number, emails: string): Promise<any> {
    return this.request('/submissions/emails', {
      method: 'POST',
      body: JSON.stringify({ template_id: templateId, emails }),
    });
  }

  // Get template details
  async getTemplateDetails(templateId: number): Promise<any> {
    return this.request(`/templates/${templateId}`);
  }

  // Get a specific submission
  async getSubmission(submissionId: string): Promise<DocuSealSubmission> {
    return this.request(`/submissions/${submissionId}`);
  }

  // Get signing URL for a submission
  getSigningUrl(submissionId: string): string {
    return `${this.baseURL}/s/${submissionId}`;
  }

  // Create a new template (not supported in DocuSeal 2.x API)
  async createTemplate({ name, description }: { name: string; description?: string }): Promise<DocuSealTemplate> {
    throw new Error('DocuSeal 2.x does not support creating templates via API. Please upload documents via the DocuSeal web UI.');
  }

  // Upload a document to a template (not supported in DocuSeal 2.x API)
  async uploadDocument(templateId: number, file: File): Promise<any> {
    throw new Error('DocuSeal 2.x does not support uploading documents via API. Please upload via the DocuSeal web UI.');
  }

  // Send a template for signing (create a submission)
  async sendSubmission(templateId: number, data: { email: string; message?: string; expires_in_days?: number }): Promise<DocuSealSubmission> {
    return this.createSubmission({
      template_id: templateId,
      emails: data.email,
      values: {},
    });
  }

  // Get the template builder URL (for editing a template in the UI)
  getTemplateBuilderUrl(templateId: number): string {
    return `${this.baseURL}/templates/${templateId}/edit`;
  }
}

export const docuSealAPI = new DocuSealAPI(); 