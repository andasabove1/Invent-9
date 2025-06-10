import React, { useState } from 'react';
import { Button } from './ui/button';
import { GitBranch } from 'lucide-react';
import { GitImportDialog } from './GitImportDialog';
import { GitService } from '../services/gitService';
import { toast } from 'sonner';

export function GitImportButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const gitService = GitService.getInstance();

  const handleImport = async (repoUrl: string, branch = 'main') => {
    try {
      toast.loading('Validating repository...', { id: 'git-import' });
      
      // First validate the repository URL
      const isValid = await gitService.validateRepository(repoUrl);
      if (!isValid) {
        throw new Error('Invalid repository URL format');
      }
      
      toast.loading('Cloning repository...', { id: 'git-import' });
      
      // Clone the repository with enhanced error handling
      const files = await gitService.cloneRepository(repoUrl, branch);
      
      toast.loading('Integrating files...', { id: 'git-import' });
      
      // Integrate the files
      await gitService.integrateFiles(files);
      
      toast.success('Repository imported successfully!', {
        id: 'git-import',
        description: `${files.length} files imported from ${branch} branch`,
        duration: 5000
      });
      
      console.log('Import completed successfully:', { 
        repoUrl, 
        branch, 
        fileCount: files.length,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      let errorMessage = 'Unknown error occurred';
      let errorDescription = '';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Provide specific guidance based on error type
        if (error.message.includes('Authentication required') || error.message.includes('redirect')) {
          errorDescription = 'Try using a public repository URL instead.';
        } else if (error.message.includes('Invalid repository URL')) {
          errorDescription = 'Please check the URL format and try again.';
        } else if (error.message.includes('access denied')) {
          errorDescription = 'Verify the repository exists and is publicly accessible.';
        }
      }
      
      toast.error('Failed to import repository', {
        id: 'git-import',
        description: errorDescription || errorMessage,
        duration: 8000
      });
      
      console.error('Import failed:', {
        error: errorMessage,
        repoUrl,
        branch,
        timestamp: new Date().toISOString()
      });
      
      throw error;
    }
  };

  return (
    <>
      <Button 
        onClick={() => setDialogOpen(true)}
        variant="outline"
        className="gap-2 hover:bg-blue-50 hover:border-blue-300"
      >
        <GitBranch className="h-4 w-4" />
        Import Git Repo
      </Button>
      
      <GitImportDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onImport={handleImport}
      />
    </>
  );
}