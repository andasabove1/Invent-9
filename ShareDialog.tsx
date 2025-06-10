import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2, Globe, Smartphone, Monitor, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareDialogProps {
  children: React.ReactNode;
}

export function ShareDialog({ children }: ShareDialogProps) {
  const { toast } = useToast();
  const currentUrl = window.location.origin;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Your App
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="h-5 w-5" />
                Live Preview URL
              </CardTitle>
              <CardDescription>
                Share this link with users to test your app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 p-2 bg-muted rounded">
                <code className="flex-1 text-sm">{currentUrl}</code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(currentUrl)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button
                className="w-full"
                onClick={() => window.open(currentUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Smartphone className="h-8 w-8 text-blue-500" />
                  <h3 className="font-medium">Mobile Testing</h3>
                  <p className="text-sm text-muted-foreground">
                    Works on phones & tablets
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Monitor className="h-8 w-8 text-green-500" />
                  <h3 className="font-medium">Desktop Ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Full desktop experience
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}