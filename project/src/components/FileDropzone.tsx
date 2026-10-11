import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import type { UploadedFile } from '@/lib/types';

interface FileDropzoneProps {
  accept: Record<string, string[]>;
  multiFile?: boolean;
  onFiles: (files: UploadedFile[]) => void;
}

export function FileDropzone({ accept, multiFile = false, onFiles }: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36.substring(2, 9)),
        file,
        name: file.name,
        size: file.size,
      }));
      onFiles(newFiles);
    },
    [onFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: multiFile,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-12 text-center transition cursor-pointer ${
        isDragActive
          ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/20'
          : 'border-gray-300 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-600 bg-white dark:bg-gray-900'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 mb-4 shadow-sm">
        <Upload className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {isDragActive ? 'Drop the files here...' : 'Drag & drop files here'}
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        or <span className="text-brand-600 dark:text-brand-400 font-semibold underline">browse</span> from your computer
      </p>
      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
        {multiFile ? 'You can upload multiple files' : 'Supports standard files'}
      </p>
    </div>
  );
}
