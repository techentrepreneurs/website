"use client";

import React from "react";
import { 
  Card, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectAuthor {
  name: string;
  image?: string;
  handle: string;
}

interface ProjectUpdate {
  message: string;
  author: ProjectAuthor;
  timestamp: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  category?: string;
  status: "Active" | "Funding";
  update: ProjectUpdate;
  channelLink: string;
  externalLink?: string;
  githubLink?: string;
}

interface FeaturedBuilderProjectsProps {
  title?: string;
  description?: string;
  recentProjects: Project[];
  trendingProjects: Project[];
  newBuilderProjects: Project[];
}

export function FeaturedBuilderProjects({
  title = "Featured Builder Projects",
  description = "Check out what our community members are building right now.",
  recentProjects,
  trendingProjects,
  newBuilderProjects,
}: FeaturedBuilderProjectsProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <Tabs defaultValue="recent" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-full">
              <TabsTrigger value="recent" className="rounded-full text-sm">Recent Updates</TabsTrigger>
              <TabsTrigger value="trending" className="rounded-full text-sm">Trending Projects</TabsTrigger>
              <TabsTrigger value="new" className="rounded-full text-sm">New Builders</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="recent" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProjects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingProjects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newBuilderProjects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function getCategoryBorderColor(category?: string): string {
  switch(category?.toLowerCase()) {
    case 'saas':
      return 'border-purple-500/30';
    case 'ai':
      return 'border-amber-500/30';
    case 'edtech':
      return 'border-emerald-500/30';
    default:
      return 'border-blue-500/30';
  }
}

function getCategoryLabel(category?: string): string {
  switch(category?.toLowerCase()) {
    case 'saas':
      return 'SaaS';
    case 'ai':
      return 'AI';
    case 'edtech':
      return 'EdTech';
    default:
      return category || 'Other';
  }
}

function ProjectCard({ project }: { project: Project }) {
  const borderColor = getCategoryBorderColor(project.category);
  const categoryLabel = getCategoryLabel(project.category);
  
  return (
    <div className={cn(
      "group relative rounded-xl overflow-hidden backdrop-blur-md border",
      "transition-all duration-300 hover:bg-zinc-800/10",
      "bg-zinc-900/40",
      borderColor
    )}>
      {/* Content */}
      <div className="relative h-full flex flex-col p-4">
        {/* Top section with category */}
        <div className="mb-4">
          {project.category && (
            <Badge className="bg-black/40 hover:bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5">
              {categoryLabel}
            </Badge>
          )}
        </div>
        
        {/* Title and description */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">
            {project.name}
          </h2>
          <p className="text-zinc-300 text-sm">
            {project.description}
          </p>
        </div>
        
        {/* Update message */}
        <div className="my-4 flex-grow">
          <div className="pl-3 border-l border-zinc-700/50">
            <p className="text-zinc-300 text-sm italic">
              "{project.update.message}"
            </p>
          </div>
        </div>
        
        {/* Bottom section with timestamp */}
        <div className="mt-auto pt-2">
          <div className="flex items-center text-xs text-zinc-400 mb-3">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>Updated {project.update.timestamp} by @{project.update.author.handle}</span>
          </div>
          
          {/* View Channel Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-zinc-300 hover:text-white hover:bg-white/5 rounded-md mt-2"
            asChild
          >
            <a href={project.channelLink}>
              View Channel
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
} 