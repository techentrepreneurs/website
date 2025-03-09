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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Clock, 
  ExternalLink, 
  Github, 
  MessageSquare
} from "lucide-react";

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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <Tabs defaultValue="recent" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="recent">Recent Updates</TabsTrigger>
              <TabsTrigger value="trending">Trending Projects</TabsTrigger>
              <TabsTrigger value="new">New Builders</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="recent" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trendingProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {newBuilderProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden transition-all duration-200 h-full flex flex-col hover:shadow-md">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          {project.category && (
            <Badge variant="outline" className="mb-2">
              {project.category}
            </Badge>
          )}
          <Badge
            className={
              project.status === "Active"
                ? "bg-green-100 text-green-600 dark:bg-green-800/20 dark:text-green-400"
                : "bg-amber-100 text-amber-600 dark:bg-amber-800/20 dark:text-amber-400"
            }
          >
            {project.status}
          </Badge>
        </div>
        <CardTitle className="text-xl">{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-md border p-3 bg-muted/50">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarImage 
                src={project.update.author.image || `https://avatar.vercel.sh/${project.update.author.handle}`} 
                alt={project.update.author.name} 
              />
              <AvatarFallback>{project.update.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm leading-relaxed">{project.update.message}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>Updated {project.update.timestamp} by @{project.update.author.handle}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-4">
        <Button variant="outline" className="flex-1" asChild>
          <a href={project.channelLink}>
            <MessageSquare className="h-4 w-4 mr-2" />
            View Channel
          </a>
        </Button>
        
        <div className="flex gap-2">
          {project.githubLink && (
            <Button size="icon" variant="outline" asChild>
              <a href={project.githubLink} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.externalLink && (
            <Button size="icon" variant="outline" asChild>
              <a href={project.externalLink} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
} 