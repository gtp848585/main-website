import { Upload } from 'lucide-react';
import type { UploadedFile } from '@/lib/types';

interface FileDropzoneProps {
  accept: Record<string, string[]>;
  multiFile?: boolean;
  onFiles: (files: UploadedFile[]) => void;
}

export function FileDropzone({ accept, multiFile = false, onFiles }: FileDropzoneProps) {
  // Convert accept object (e.g. {'image/*': ['.jpg']}) to accept string format for HTML input
  const acceptString = Object.keys(accept).join(',');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const filesArray = Array.from(e.target.files);
    
    const newFiles: UploadedFile[] = filesArray.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      name: file.name,
      size: file.size,
    }));

    onFiles(newFiles);
    // Reset input so same file can be selected again if needed
    e.target.value = '';
  };

  return (
    <label className="relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-12 text-center transition cursor-pointer border-gray-300 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-600 bg-white dark:bg-gray-900 group">
      <input
        type="file"
        accept={acceptString}
        multiple={multiFile}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 mb-4 shadow-sm group-hover:scale-105 transition">
        <Upload className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        Click to browse files
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Select files from your computer to get started
      </p>
      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
        {multiFile ? 'You can select multiple files at once' : 'Supports standard format'}
      </p>
    </label>
  );
}
