import {
  Combine,
  Minimize2,
  Scissors,
  FileText,
  FileType2,
  Image as ImageIcon,
  Lock,
  Unlock,
  RotateCw,
  Layers,
  Droplets,
  type LucideIcon,
} from 'lucide-react';

export type ToolId =
  | 'merge'
  | 'compress'
  | 'split'
  | 'pdf-to-word'
  | 'word-to-pdf'
  | 'pdf-to-jpg'
  | 'pdf-to-png'
  | 'protect'
  | 'unlock'
  | 'rotate'
  | 'watermark';

export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  icon: LucideIcon;
  category: 'Organize' | 'Convert' | 'Optimize' | 'Security' | 'Edit';
  color: string;
  multiFile: boolean;
  accept: string;
}

export const CATEGORIES = [
  'All',
  'Organize',
  'Convert',
  'Optimize',
  'Security',
  'Edit',
] as const;

export const TOOLS: Tool[] = [
  {
    id: 'merge',
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into one document.',
    icon: Combine,
    category: 'Organize',
    color: 'from-blue-500 to-blue-600',
    multiFile: true,
    accept: '.pdf',
  },
  {
    id: 'compress',
    name: 'Compress PDF',
    description: 'Reduce file size with adjustable quality.',
    icon: Minimize2,
    category: 'Optimize',
    color: 'from-green-500 to-green-600',
    multiFile: false,
    accept: '.pdf',
  },
  {
    id: 'split',
    name: 'Split PDF',
    description: 'Extract specific pages from a PDF document.',
    icon: Scissors,
    category: 'Organize',
    color: 'from-orange-500 to-orange-600',
    multiFile: false,
    accept: '.pdf',
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert PDF pages into editable Word documents.',
    icon: FileText,
    category: 'Convert',
    color: 'from-cyan-500 to-cyan-600',
    multiFile: false,
    accept: '.pdf',
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Convert Word documents into PDF format.',
    icon: FileText,
    category: 'Convert',
    color: 'from-teal-500 to-teal-600',
    multiFile: false,
    accept: '.doc,.docx',
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Convert each PDF page into a JPG image.',
    icon: ImageIcon,
    category: 'Convert',
    color: 'from-pink-500 to-pink-600',
    multiFile: false,
    accept: '.pdf',
  },
  {
    id: 'pdf-to-png',
    name: 'PDF to PNG',
    description: 'Convert each PDF page into a PNG image.',
    icon: FileType2,
    category: 'Convert',
    color: 'from-rose-500 to-rose-600',
    multiFile: false,
    accept: '.pdf',
  },
  {
    id: 'protect',
    name: 'Protect PDF',
    description: 'Add password protection to your PDF.',
    icon: Lock,
    category: 'Security',
    color: 'from-red-500 to-red-600',
    multiFile: false,
    accept: '.pdf',
  },
  {
    id: 'unlock',
    name: 'Unlock PDF',
    description: 'Remove password protection from a PDF.',
    icon: Unlock,
    category: 'Security',
    color: 'from-amber-500 to-amber-600',
    multiFile: false,
    accept: '.pdf',
  },
  {
    id: 'rotate',
    name: 'Rotate & Organize',
    description: 'Rearrange and rotate pages visually.',
    icon: RotateCw,
    category: 'Organize',
    color: 'from-indigo-500 to-indigo-600',
    multiFile: false,
    accept: '.pdf',
  },
  {
    id: 'watermark',
    name: 'Watermark PDF',
    description: 'Add a custom text overlay to your PDF.',
    icon: Droplets,
    category: 'Edit',
    color: 'from-purple-500 to-purple-600',
    multiFile: false,
    accept: '.pdf',
  },
];

export function getToolById(id: ToolId): Tool | undefined {
  return TOOLS.find((t) => t.id === id);
}
