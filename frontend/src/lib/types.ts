export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  projectId: string;
  user?: {
    id: number;
    username: string;
    name: string;
  };
}

export interface FileNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileNode[];
}

export interface DeployResponse {
  previewUrl: string;
}

export interface ChatHistoryMessage {
  id: number;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: string;
}

export enum ChatEventType {
  THOUGHT = 'THOUGHT',
  MESSAGE = 'MESSAGE',
  FILE_EDIT = 'FILE_EDIT',
  TOOL_LOG = 'TOOL_LOG'
}

export interface ChatEvent {
  id?: number;
  type: ChatEventType;
  content: string; // Markdown, Code, or Tool Summary
  metadata?: string; // Tool args (e.g. "src/App.tsx")
  filePath?: string; // For FILE_EDIT
  sequenceOrder?: number;
}

export interface ChatMessage {
  id: number;
  role: 'USER' | 'ASSISTANT';
  content?: string; // Fallback raw text
  events: ChatEvent[]; // The granular events
  createdAt?: string;
}

export interface ProjectSummaryResponse {
  id: number;
  name: string;
  description?: string;
  thumbnailUrl?: string; // Optional URL for project thumbnail
  role?: ProjectRole; // Added to show user's role in the project list
  createdAt: string;
}

export interface ProjectResponse {
  id: number;
  name: string;
  role?: ProjectRole; // Added to check user's permission in the project
  createdAt: string;
  updatedAt?: string;
}

export interface ProjectRequest {
  name: string;
}

export type ProjectRole = 'OWNER' | 'EDITOR' | 'VIEWER';

export interface ProjectMember {
  userId: number; // Changed to number based on schema
  username: string; // The email/username
  name?: string;
  role: ProjectRole;
  invitedAt?: string;
}

export interface InviteMemberRequest {
  username: string;
  role: ProjectRole;
}

export interface SignupRequest {
  username: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    name: string;
    plan?: any;
  };
}