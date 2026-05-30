import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut, Search, Folder, Loader2, MoreVertical, Trash, Download, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { api, removeAuthToken, removeUserInfo, getUserInfo } from "@/lib/api";
import { ProjectSummaryResponse } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { generateGradient, cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ProjectsDashboard() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [projects, setProjects] = useState<ProjectSummaryResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Rename state
    const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
    const [projectToRename, setProjectToRename] = useState<ProjectSummaryResponse | null>(null);
    const [renameName, setRenameName] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await api.getProjects();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            toast({
                title: "Error",
                description: "Failed to load projects. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async () => {
        if (!newProjectName.trim()) return;

        setIsCreating(true);
        try {
            const newProject = await api.createProject(newProjectName);
            setProjects([newProject, ...projects]);
            setNewProjectName("");
            setIsDialogOpen(false);
            toast({
                title: "Success",
                description: "Project created successfully",
            });
            // Optionally navigate to the new project immediately
            // navigate(`/projects/${newProject.id}`);
        } catch (error) {
            console.error("Failed to create project:", error);
            toast({
                title: "Error",
                description: "Failed to create project",
                variant: "destructive",
            });
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteProject = async (e: React.MouseEvent, projectId: number) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;

        try {
            await api.deleteProject(projectId.toString());
            setProjects(projects.filter(p => p.id !== projectId));
            toast({ title: "Success", description: "Project deleted successfully" });
        } catch (error) {
            console.error("Failed to delete:", error);
            toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
        }
    };

    const handleDownloadProject = async (e: React.MouseEvent, projectId: number) => {
        e.stopPropagation();
        try {
            const blob = await api.downloadProjectZip(projectId.toString());
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `project-${projectId}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast({ title: "Success", description: "Download started" });
        } catch (error) {
            console.error("Failed to download:", error);
            toast({ title: "Error", description: "Failed to download project", variant: "destructive" });
        }
    };

    const handleRenameClick = (e: React.MouseEvent, project: ProjectSummaryResponse) => {
        e.stopPropagation();
        setProjectToRename(project);
        setRenameName(project.name);
        setIsRenameDialogOpen(true);
    };

    const handleRenameSubmit = async () => {
        if (!projectToRename || !renameName.trim()) return;

        try {
            await api.updateProject(projectToRename.id.toString(), renameName);
            setProjects(projects.map(p => p.id === projectToRename.id ? { ...p, name: renameName } : p));
            setIsRenameDialogOpen(false);
            setProjectToRename(null);
            toast({ title: "Success", description: "Project renamed successfully" });
        } catch (error) {
            console.error("Failed to rename:", error);
            toast({ title: "Error", description: "Failed to rename project", variant: "destructive" });
        }
    };

    const handleLogout = () => {
        removeAuthToken();
        removeUserInfo();
        navigate("/login");
    };

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Folder className="w-5 h-5 text-primary" />
                        </div>
                        Project Companion
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                        {(() => {
                                            const userInfo = getUserInfo();
                                            if (userInfo?.name) {
                                                return userInfo.name.charAt(0).toUpperCase();
                                            }
                                            return "U";
                                        })()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="flex flex-col space-y-1 p-2">
                                <p className="text-sm font-medium leading-none">
                                    {getUserInfo()?.name || "User"}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {getUserInfo()?.username || ""}
                                </p>
                            </div>
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <main className="container max-w-screen-2xl py-8 px-4 sm:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage and create your AI-powered projects
                        </p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <Plus className="w-4 h-4" />
                                New Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Project</DialogTitle>
                                <DialogDescription>
                                    Give your project a name to get started. You can change this later.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                <Input
                                    placeholder="My Awesome Project"
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleCreateProject()}
                                />
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleCreateProject} disabled={isCreating || !newProjectName.trim()}>
                                    {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create Project
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Rename Dialog */}
                    <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Rename Project</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                                <Input
                                    value={renameName}
                                    onChange={(e) => setRenameName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleRenameSubmit()}
                                />
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleRenameSubmit} disabled={!renameName.trim() || renameName === projectToRename?.name}>
                                    Save
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search */}
                <div className="relative mb-8 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search projects..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-20 border border-dashed rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                        <p className="text-muted-foreground mb-6">
                            {searchQuery ? "Try a different search query" : "Create your first project to get started"}
                        </p>
                        {!searchQuery && (
                            <Button onClick={() => setIsDialogOpen(true)}>Create Project</Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProjects.map((project) => (
                            <Card
                                key={project.id}
                                className="group cursor-pointer hover:shadow-lg transition-all hover:border-primary/50"
                                onClick={() => navigate(`/projects/${project.id}`)}
                            >
                                <CardHeader className="p-0">
                                    <div className="aspect-video bg-muted/50 w-full relative overflow-hidden rounded-t-lg">
                                        {project.thumbnailUrl ? (
                                            <img
                                                src={project.thumbnailUrl}
                                                alt={project.name}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            />
                                        ) : (
                                            <div
                                                className="w-full h-full"
                                                style={generateGradient(project.name)}
                                            />
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 flex flex-col gap-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
                                            {project.name}
                                        </CardTitle>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2 text-muted-foreground hover:text-foreground">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={(e) => handleRenameClick(e, project)}>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Rename
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={(e) => handleDownloadProject(e, project.id)}>
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={(e) => handleDeleteProject(e, project.id)}>
                                                    <Trash className="w-4 h-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    {project.role && (
                                        <div className="flex">
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border",
                                                project.role === 'OWNER' ? "bg-primary/10 text-primary border-primary/20" :
                                                    project.role === 'EDITOR' ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                                                        "bg-muted text-muted-foreground border-border"
                                            )}>
                                                {project.role}
                                            </span>
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
                                    Updated {new Date(project.createdAt).toLocaleDateString()}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
