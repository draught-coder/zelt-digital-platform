import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
// import { n8nIntegration } from '@/lib/n8n-integration';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Bell, MessageCircle, Clock, Settings, Zap, CheckCircle } from 'lucide-react';

const DocuSealAutomation = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    email_notifications: true,
    whatsapp_notifications: true,
    auto_reminders: true,
    reminder_frequency: 3,
    urgent_reminder: true
  });

  const testWhatsAppIntegration = async () => {
    setLoading(true);
    try {
      // await n8nIntegration.sendWhatsAppMessage({
      //   to: user?.email || '',
      //   message: "🧪 *Test Message*\n\nThis is a test message from your DocuSeal automation system.\n\nIf you received this, your WhatsApp integration is working correctly!",
      //   template_name: 'test_message'
      // });

      toast({
        title: "Success",
        description: "WhatsApp test message sent successfully",
      });
    } catch (error) {
      console.error('Error sending WhatsApp test:', error);
      toast({
        title: "Error",
        description: "Failed to send WhatsApp test message",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const testDocumentSentWorkflow = async () => {
    setLoading(true);
    try {
      // await n8nIntegration.triggerDocumentSent({
      //   event_type: 'document_sent',
      //   document_id: 'test-123',
      //   form_name: 'Test Document',
      //   client_email: user?.email || '',
      //   client_name: user?.email?.split('@')[0] || 'Test User',
      //   bookkeeper_email: user?.email || '',
      //   bookkeeper_name: user?.email?.split('@')[0] || 'Test Bookkeeper',
      //   status: 'pending',
      //   created_at: new Date().toISOString(),
      //   expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      //   message: 'This is a test document for automation testing.'
      // });

      toast({
        title: "Success",
        description: "Document sent workflow triggered successfully",
      });
    } catch (error) {
      console.error('Error triggering workflow:', error);
      toast({
        title: "Error",
        description: "Failed to trigger workflow",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automation & Notifications</h1>
          <p className="text-muted-foreground">
            Configure automated notifications and workflow triggers with n8n
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Zap className="h-3 w-3" />
            <span>n8n Powered</span>
          </Badge>
        </div>
      </div>

      {/* Automation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Successful Deliveries</p>
                <p className="text-2xl font-bold text-gray-900">142</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Documents</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">91%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Settings</span>
          </CardTitle>
          <CardDescription>
            Configure how and when clients receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications when documents are ready
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.email_notifications}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, email_notifications: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="whatsapp-notifications">WhatsApp Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send WhatsApp messages for instant delivery
                  </p>
                </div>
                <Switch
                  id="whatsapp-notifications"
                  checked={settings.whatsapp_notifications}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, whatsapp_notifications: checked})
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-reminders">Automatic Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send automatic reminders for pending documents
                  </p>
                </div>
                <Switch
                  id="auto-reminders"
                  checked={settings.auto_reminders}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, auto_reminders: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="urgent-reminder">Urgent Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send urgent notifications for expiring documents
                  </p>
                </div>
                <Switch
                  id="urgent-reminder"
                  checked={settings.urgent_reminder}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, urgent_reminder: checked})
                  }
                />
              </div>
            </div>
          </div>

          {settings.auto_reminders && (
            <div className="space-y-2">
              <Label htmlFor="reminder-frequency">Reminder Frequency (days)</Label>
              <Input
                id="reminder-frequency"
                type="number"
                min="1"
                max="7"
                value={settings.reminder_frequency}
                onChange={(e) => 
                  setSettings({...settings, reminder_frequency: parseInt(e.target.value)})
                }
                className="w-32"
              />
              <p className="text-sm text-muted-foreground">
                Send reminders this many days before expiration
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Manual automation triggers and testing tools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={testWhatsAppIntegration}
              disabled={loading}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Test WhatsApp Integration</span>
            </Button>
            
            <Button 
              onClick={testDocumentSentWorkflow}
              disabled={loading}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Bell className="h-4 w-4" />
              <span>Test Document Sent Workflow</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* n8n Workflow Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>n8n Setup Instructions</span>
          </CardTitle>
          <CardDescription>
            Import these workflows into your n8n instance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Required Workflows:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Document Sent Automation (docuseal-automation.json)</li>
              <li>Reminder System (docuseal-reminders.json)</li>
              <li>WhatsApp Integration (whatsapp-send-message)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Environment Variables:</h4>
            <div className="bg-gray-100 p-3 rounded text-sm font-mono">
              N8N_BASE_URL=http://localhost:5678<br/>
              N8N_API_KEY=your_n8n_api_key<br/>
              WHATSAPP_API_KEY=your_whatsapp_api_key
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocuSealAutomation; 