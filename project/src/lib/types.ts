import type { ToolId } from './tools';

export type LegalPage = 'privacy' | 'terms' | 'contact' | 'about' | null;

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

export type View =
  | { type: 'home' }
  | { type: 'tool'; toolId: ToolId }
  | { type: 'legal'; page: LegalPage };
