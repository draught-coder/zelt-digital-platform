import { useState } from 'react';
import { supabase } from "../../dashboard-app/src/integrations/supabase/client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddUserFormProps {
  onUserAdded: () => void;
}

const AddUserForm = ({ onUserAdded }: AddUserFormProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'bookkeeper' | ''>('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
        toast({
            title: 'Error',
            description: 'Please select a role.',
            variant: 'destructive',
        });
        return;
    }
    setLoading(true);

    try {
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          }
        }
      });

      if (authError) {
        throw authError;
      }

      if (authData.user) {
        // Insert profile data
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: fullName,
            email: email,
            role: role
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Note: The user was created in auth but profile insertion failed
          // In a production app, you might want to handle this differently
        }

        toast({
          title: 'User created successfully',
          description: `${fullName} has been added. They will receive an email to confirm their account.`,
        });
        onUserAdded();
      }
    } catch (error: any) {
      console.error('User creation error:', error);
      toast({
        title: 'Failed to create user',
        description: error.message || 'An error occurred while creating the user.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="fullName" className="text-right">
          Full Name
        </Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="password" className="text-right">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="col-span-3"
          required
          minLength={6}
          placeholder="Min. 6 characters"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="role" className="text-right">
          Role
        </Label>
        <Select onValueChange={(value) => setRole(value as any)} value={role}>
            <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="bookkeeper">Bookkeeper</SelectItem>
            </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create User'}
        </Button>
      </div>
    </form>
  );
};

export default AddUserForm; 