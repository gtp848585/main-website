import { UploadCloud } from 'lucide-react';
import { useCallback, useRef, useState, type DragEvent } from 'react';
import type { UploadedFile } from '@/lib/types';

interface FileDropzoneProps {
  accept: string;
  multiFile: boolean;
  onFiles: (files: UploadedFile[]) => void;
}

export function FileDropzone({ accept, multiFile, onFiles }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (fileList: FileList) => {
      const accepted = accept.split(',').map((a) => a.trim());
      const files = Array.from(fileList).filter((f) =>
        accepted.some((a) => f.name.toLowerCase().endsWith(a)),
      );
      if (!multiFile) files.length = Math.min(files.length, 1);
      const uploaded: UploadedFile[] = files.map((f) => ({
        id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
        name: f.name,
        size: f.size,
        type: f.type || f.name.split('.').pop() || 'file',
        file: f,
      }));
      onFiles(uploaded);
    },
    [accept, multiFile, onFiles],
  );

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) processFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 cursor-pointer transition-all duration-200 ${
        isDragging
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 scale-[1.01]'
          : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 hover:border-brand-400 dark:hover:border-brand-600'
      }`}
    >
      <div className={`flex h-16 w-16 items-center justify-center rounded-full transition ${
        isDragging ? 'bg-brand-100 dark:bg-brand-900/40' : 'bg-gray-100 dark:bg-gray-800'
      }`}>
        <UploadCloud className={`h-8 w-8 transition ${
          isDragging ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400 dark:text-gray-500'
        }`} />
      </div>
      <p className="mt-4 text-base font-medium text-gray-900 dark:text-white">
        {isDragging ? 'Drop files here' : 'Drag & drop or click to browse'}
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {multiFile ? `Upload multiple files (${accept})` : `Upload a file (${accept})`}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiFile}
        className="hidden"
        onChange={(e) => e.target.files && processFiles(e.target.files)}
      />
    </div>
  );
}
