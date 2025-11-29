import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, LogOut, Loader2 } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  useEffect(() => {
    // Check auth
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleGenerate = async () => {
    if (!productName || !productDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in both product name and description.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setGeneratedContent("");

    // Simulate AI generation (we'll implement real AI later)
    setTimeout(() => {
      setGeneratedContent(`# ${productName}

## Product Overview
${productDescription}

## Key Features
• Premium quality materials
• Modern, sleek design
• Easy to use and maintain
• Perfect for everyday use
• Excellent value for money

## Why Choose This Product?
This ${productName.toLowerCase()} stands out from the competition with its exceptional build quality and attention to detail. Whether you're looking for reliability, style, or performance, this product delivers on all fronts.

## Specifications
- Material: Premium grade
- Finish: Professional quality
- Warranty: 1 year manufacturer warranty
- Shipping: Fast and secure delivery

Ready to experience the difference? Add to cart now!`);
      
      toast({
        title: "Page Generated!",
        description: "Your AI-powered product page is ready.",
      });
      setLoading(false);
    }, 2000);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container px-4 py-4 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">PageCraft AI</span>
          </div>
          <Button variant="outline" onClick={handleSignOut} size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container px-4 py-12 mx-auto max-w-6xl">
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold">Generate Product Pages</h1>
          <p className="text-xl text-muted-foreground">
            Create AI-powered product pages in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Card */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Enter details about your product and let AI do the rest
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  placeholder="e.g., Premium Wireless Headphones"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">Brief Description</Label>
                <Textarea
                  id="product-description"
                  placeholder="Describe your product in a few sentences..."
                  rows={4}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-gradient-hero hover:shadow-glow transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Product Page
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Card */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>
                AI-generated product page content
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your generated content will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
