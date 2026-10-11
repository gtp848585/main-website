import { Stamp, RotateCw, Scissors } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  accept: Record<string, string[]>;
  multiFile: boolean;
}

export const CATEGORIES = [
  { id: 'all', name: 'All Tools' },
  { id: 'popular', name: 'Popular' },
];

export const TOOLS: Tool[] = [
  {
    id: 'watermark',
    name: 'Watermark PDF',
    description: 'Add custom text watermark across all pages of your PDF document.',
    icon: Stamp,
    color: 'from-blue-500 to-indigo-600',
    accept: { 'application/pdf': ['.pdf'] },
    multiFile: false,
  },
  {
    id: 'rotate',
    name: 'Rotate PDF',
    description: 'Rotate all pages of your PDF document by 90, 180, or 270 degrees.',
    icon: RotateCw,
    color: 'from-emerald-500 to-teal-600',
    accept: { 'application/pdf': ['.pdf'] },
    multiFile: false,
  },
  {
    id: 'split',
    name: 'Split PDF',
    description: 'Extract specific pages or page ranges from your PDF into a new document.',
    icon: Scissors,
    color: 'from-amber-500 to-orange-600',
    accept: { 'application/pdf': ['.pdf'] },
    multiFile: false,
  },
];
