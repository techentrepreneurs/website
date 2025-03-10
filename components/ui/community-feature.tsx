import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CommunityFeatureProps {
  className?: string;
}

function CommunityFeature({ className }: CommunityFeatureProps) {
  return (
    <div className={cn("w-full py-20 lg:py-32 bg-background relative", className)}>
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] dark:bg-grid-slate-800/20" />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16 animate-appear opacity-0">
          <Badge className="mb-4">Community</Badge>
          <h2 className="text-3xl md:text-5xl tracking-tighter font-bold text-center mb-6">
            Not Just Another Discord Server
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-10 animate-appear opacity-0" style={{ animationDelay: "100ms" }}>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold tracking-tight">Builder-First Community</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This is a dedicated space for tech entrepreneurs who are actively building products. Our community prioritizes those who are creating, launching, and growing tech startups.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold tracking-tight">Personal Company Channels</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Active builders receive their own company channel to share updates, get feedback, and connect with potential collaborators, investors, and early users.
              </p>
            </div>
          </div>
          
          {/* Right column */}
          <div className="bg-muted/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:shadow-md animate-appear opacity-0" style={{ animationDelay: "200ms" }}>
            <h3 className="text-2xl font-semibold tracking-tight mb-6">Community Features</h3>
            
            <div className="flex flex-col gap-5">
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-green-500 shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Dedicated company channels for active builders</p>
                </div>
              </div>
              
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-green-500 shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Regulated builder chat for focused discussions</p>
                </div>
              </div>
              
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-green-500 shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Maintained builder role for active entrepreneurs</p>
                </div>
              </div>
              
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-green-500 shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Thread-based discussions to reduce noise</p>
                </div>
              </div>
              
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-green-500 shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Direct feedback from other tech founders</p>
                </div>
              </div>
              
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-green-500 shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Opportunities for collaboration and networking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CommunityFeature }; 