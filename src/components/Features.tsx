import { Zap, Sparkles, TrendingUp, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate complete product pages in seconds, not hours. Let AI handle the heavy lifting.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Content",
    description: "Smart AI generates compelling product descriptions, features, and SEO-optimized content.",
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimized",
    description: "Every page is designed to convert with proven e-commerce best practices built-in.",
  },
  {
    icon: Shield,
    title: "Shopify Native",
    description: "Seamless integration with your Shopify store. Publish with one click, no code required.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything you need to sell more
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful features that help you create product pages that convert visitors into customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="border-border/50 hover:border-primary/50 hover:shadow-elegant transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
