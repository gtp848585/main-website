import { FileText, Trash2 } from 'lucide-react';
import type { UploadedFile } from '@/lib/types';
import { formatBytes } from '@/lib/format';

interface FileListProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
}

function getFileIcon(file: UploadedFile) {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return '🖼️';
  if (['doc', 'docx'].includes(ext)) return '📄';
  return '📄';
}

export function UploadedFileList({ files, onRemove }: FileListProps) {
  return (
    <div className="space-y-3">
      {files.map((file, index) => (
        <div
          key={file.id}
          className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 animate-scale-in"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              <span className="mr-1.5">{getFileIcon(file)}</span>
              {file.name}
            </p>
            <div className="mt-0.5 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span>{formatBytes(file.size)}</span>
              {file.type && <span className="uppercase">{file.type}</span>}
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <span>File {index + 1}</span>
            </div>
          </div>
          <button
            onClick={() => onRemove(file.id)}
            aria-label="Remove file"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
