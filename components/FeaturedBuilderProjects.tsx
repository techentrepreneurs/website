"use client";

import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

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
            <TabsList className="bg-black/20 border border-zinc-800/50 rounded-full">
              <TabsTrigger value="recent" className="rounded-full">Recent Updates</TabsTrigger>
              <TabsTrigger value="trending" className="rounded-full">Trending Projects</TabsTrigger>
              <TabsTrigger value="new" className="rounded-full">New Builders</TabsTrigger>
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

function getCategoryData(category?: string): { color: string, label: string, badgeClass: string } {
  switch(category?.toLowerCase()) {
    case 'saas':
      return {
        color: 'border-purple-500',
        label: 'SaaS',
        badgeClass: 'bg-purple-950/80 text-white'
      };
    case 'ai':
      return {
        color: 'border-amber-500',
        label: 'AI',
        badgeClass: 'bg-amber-950/80 text-white'
      };
    case 'edtech':
      return {
        color: 'border-emerald-500',
        label: 'EdTech',
        badgeClass: 'bg-emerald-950/80 text-white'
      };
    default:
      return {
        color: 'border-blue-500',
        label: category || 'Other',
        badgeClass: 'bg-blue-950/80 text-white'
      };
  }
}

function getStatusBadgeClass(status: "Active" | "Funding") {
  return status === "Active" 
    ? "bg-green-500" 
    : "bg-blue-500";
}

function ProjectCard({ project }: { project: Project }) {
  const categoryData = getCategoryData(project.category);
  
  return (
    <Card className={`overflow-hidden bg-[#121212] border border-zinc-800/50 ${categoryData.color} rounded-lg shadow-md`}>
      <CardHeader className="pt-5 pb-2 px-5">
        <div className="flex items-start justify-between">
          <div>
            {project.category && (
              <Badge 
                className={`mb-3 px-2 py-0.5 text-xs font-medium ${categoryData.badgeClass}`}
              >
                {categoryData.label}
              </Badge>
            )}
            <CardTitle className="text-xl font-bold text-white">
              {project.name}
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400 mt-1">
              {project.description}
            </CardDescription>
          </div>
          <div>
            <Badge 
              className={`text-xs font-medium text-black ${getStatusBadgeClass(project.status)}`}
            >
              {project.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-5 pt-1 pb-4">
        <div className="mt-1 pl-3 border-l border-zinc-700 mb-4">
          <p className="text-sm text-zinc-300 italic">
            "{project.update.message}"
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Clock className="h-3.5 w-3.5" />
          <span>Updated {project.update.timestamp} by @{project.update.author.handle}</span>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-zinc-800/30 py-3 px-5">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-zinc-300 hover:text-white hover:bg-zinc-800/50 px-0" 
          asChild
        >
          <a href={project.channelLink}>
            View Channel
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
} 