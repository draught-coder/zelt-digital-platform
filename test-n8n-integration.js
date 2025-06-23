// Test script for n8n integration
// Run this with: node test-n8n-integration.js

const fetch = require('node-fetch');

// Configuration
const N8N_BASE_URL = 'http://localhost:5678'; // Change to your n8n URL
const WEBHOOK_PATH = 'docuseal-document-sent';

// Test data
const testData = {
  event_type: 'document_sent',
  document_id: 'test-123',
  form_name: 'Tax Authorization Form 2024',
  client_email: 'test@example.com',
  client_name: 'John Doe',
  bookkeeper_email: 'bookkeeper@example.com',
  bookkeeper_name: 'Jane Smith',
  status: 'pending',
  created_at: new Date().toISOString(),
  expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  document_url: 'https://sign.app.ibnzelt.com/s/test-submission',
  message: 'Please review and sign this tax authorization form.'
};

async function testN8NWebhook() {
  try {
    console.log('🧪 Testing n8n webhook integration...');
    console.log('📡 Sending test data to:', `${N8N_BASE_URL}/webhook/${WEBHOOK_PATH}`);
    
    const response = await fetch(`${N8N_BASE_URL}/webhook/${WEBHOOK_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Webhook test successful!');
      console.log('📊 Response:', result);
    } else {
      console.log('❌ Webhook test failed!');
      console.log('📊 Status:', response.status);
      console.log('📊 Status Text:', response.statusText);
    }
  } catch (error) {
    console.log('❌ Error testing webhook:', error.message);
    console.log('💡 Make sure your n8n instance is running and accessible');
  }
}

async function testWhatsAppWebhook() {
  try {
    console.log('\n📱 Testing WhatsApp webhook...');
    
    const whatsappData = {
      ...testData,
      client_phone: '+1234567890' // Add phone number for WhatsApp
    };
    
    const response = await fetch(`${N8N_BASE_URL}/webhook/docuseal-whatsapp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(whatsappData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ WhatsApp webhook test successful!');
      console.log('📊 Response:', result);
    } else {
      console.log('❌ WhatsApp webhook test failed!');
      console.log('📊 Status:', response.status);
    }
  } catch (error) {
    console.log('❌ Error testing WhatsApp webhook:', error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting n8n integration tests...\n');
  
  await testN8NWebhook();
  await testWhatsAppWebhook();
  
  console.log('\n🎯 Test completed!');
  console.log('📋 Next steps:');
  console.log('1. Check your n8n dashboard for workflow executions');
  console.log('2. Verify emails were sent (check spam folder)');
  console.log('3. Check WhatsApp messages if configured');
  console.log('4. Review n8n execution logs for any errors');
}

runTests(); 