import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, GitBranch, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface GitImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (repoUrl: string, branch?: string) => Promise<void>;
}

export function GitImportDialog({ open, onOpenChange, onImport }: GitImportDialogProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleImport = async () => {
    if (!repoUrl.trim()) {
      setError('Please enter a repository URL');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      await onImport(repoUrl.trim(), branch.trim() || 'main');
      setSuccess(true);
      setTimeout(() => {
        onOpenChange(false);
        setRepoUrl('');
        setBranch('main');
        setSuccess(false);
      }, 2000);
    } catch (err) {
      let errorMessage = 'Failed to import repository';
      
      if (err instanceof Error) {
        if (err.message.includes('Authentication required') || err.message.includes('redirect') || err.message.includes('login')) {
          errorMessage = 'Repository requires authentication or is private. Please use a public repository URL.';
        } else if (err.message.includes('Invalid repository URL')) {
          errorMessage = 'Invalid repository URL. Please use a valid GitHub, GitLab, or Bitbucket URL.';
        } else if (err.message.includes('access denied')) {
          errorMessage = 'Access denied. The repository may be private or the URL may be incorrect.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
      setError('');
      setSuccess(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Import Git Repository
          </DialogTitle>
          <DialogDescription>
            Import code from a public Git repository. Enter the repository URL and branch.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="repo-url">Repository URL</Label>
            <Input
              id="repo-url"
              placeholder="https://github.com/user/repo.git"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="branch">Branch (optional)</Label>
            <Input
              id="branch"
              placeholder="main"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Repository imported successfully!
              </AlertDescription>
            </Alert>
          )}
          
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Note:</strong> Only public repositories can be imported. Private repositories require authentication.
            </AlertDescription>
          </Alert>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={isLoading || !repoUrl.trim() || success}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {success ? 'Imported!' : 'Import Repository'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}