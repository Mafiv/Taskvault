/**
 * Types for the Snippet Vault feature
 */

export type CodeLanguage = 
  | "javascript" 
  | "typescript" 
  | "python" 
  | "jsx" 
  | "tsx" 
  | "html" 
  | "css" 
  | "json" 
  | "sql" 
  | "bash" 
  | "rust" 
  | "go" 
  | "java" 
  | "cpp" 
  | "c" 
  | "php" 
  | "ruby" 
  | "swift" 
  | "kotlin" 
  | "plaintext";

export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: CodeLanguage;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSnippetInput {
  title: string;
  code: string;
  language: CodeLanguage;
  tags?: string[];
}

export interface UpdateSnippetInput {
  id: string;
  title?: string;
  code?: string;
  language?: CodeLanguage;
  tags?: string[];
}
