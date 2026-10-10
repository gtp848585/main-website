import { useState } from 'react';
import { ArrowLeft, Loader2, CheckCircle2, Download, Settings2, RotateCw } from 'lucide-react';
import type { Tool } from '@/lib/tools';
import type { UploadedFile } from '@/lib/types';
import { FileDropzone } from './FileDropzone';
import { UploadedFileList } from './UploadedFileList';
import { AdBanner } from './AdBanner';

interface ToolDetailProps {
  tool: Tool;
  onBack: () => void;
}

type ProcessingState = 'idle' | 'processing' | 'done';

export function ToolDetail({ tool, onBack }: ToolDetailProps) {
  const Icon = tool.icon;
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [status, setStatus] = useState<ProcessingState>('idle');

  // Tool-specific options
  const [quality, setQuality] = useState(70);
  const [password, setPassword] = useState('');
  const [pageRange, setPageRange] = useState('1-3');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [rotation, setRotation] = useState(90);

  const addFiles = (newFiles: UploadedFile[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleProcess = () => {
    if (files.length === 0) return;
    setStatus('processing');
    // Simulate processing (real implementation would use pdf-lib or similar)
    setTimeout(() => setStatus('done'), 2000);
  };

  const reset = () => {
    setFiles([]);
    setStatus('idle');
  };

  const hasOptions =
    tool.id === 'compress' ||
    tool.id === 'protect' ||
    tool.id === 'split' ||
    tool.id === 'watermark' ||
    tool.id === 'rotate';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb / back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all tools
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* Main column */}
        <div className="space-y-6">
          {/* Tool header */}
          <div className="flex items-start gap-4">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.color} text-white shadow-md`}>
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">{tool.description}</p>
            </div>
          </div>

          {/* Upload zone */}
          {status !== 'done' && (
            <FileDropzone accept={tool.accept} multiFile={tool.multiFile} onFiles={addFiles} />
          )}

          {/* File list */}
          {files.length > 0 && status !== 'done' && (
            <UploadedFileList files={files} onRemove={removeFile} />
          )}

          {/* Tool-specific options */}
          {files.length > 0 && hasOptions && status === 'idle' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                <Settings2 className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Options
              </div>

              {tool.id === 'compress' && (
                <div>
                  <label className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Quality Level</span>
                    <span className="font-semibold text-brand-600 dark:text-brand-400">{quality}%</span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-brand-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Smaller file</span>
                    <span>Higher quality</span>
                  </div>
                </div>
              )}

              {(tool.id === 'protect' || tool.id === 'unlock') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {tool.id === 'protect' ? 'Password' : 'Current Password'}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={tool.id === 'protect' ? 'Enter a password' : 'Enter the current password'}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition"
                  />
                </div>
              )}

              {tool.id === 'split' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Page Range
                  </label>
                  <input
                    type="text"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder="e.g. 1-3, 5, 8-10"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition"
                  />
                  <p className="mt-2 text-xs text-gray-400">Specify pages to extract, using ranges or individual numbers.</p>
                </div>
              )}

              {tool.id === 'watermark' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Watermark Text
                  </label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="Enter watermark text"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition"
                  />
                </div>
              )}

              {tool.id === 'rotate' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rotation Angle
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setRotation((r) => (r + 90) % 360)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      <RotateCw className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{rotation}°</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Process button */}
          {files.length > 0 && status === 'idle' && (
            <button
              onClick={handleProcess}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition"
            >
              <Icon className="h-5 w-5" />
              Process {files.length} File{files.length > 1 ? 's' : ''}
            </button>
          )}

          {/* Processing state */}
          {status === 'processing' && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 animate-fade-in">
              <Loader2 className="h-12 w-12 animate-spin text-brand-600 dark:text-brand-400" />
              <p className="mt-4 text-base font-medium text-gray-900 dark:text-white">Processing your files...</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This may take a few seconds</p>
            </div>
          )}

          {/* Success state */}
          {status === 'done' && (
            <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-8 text-center animate-scale-in">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Processing Complete!</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Your {tool.name.toLowerCase()} result is ready to download.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition">
                  <Download className="h-4 w-4" />
                  Download Processed PDF
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Process Another File
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <AdBanner variant="sidebar" />

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">How it works</h3>
            <ol className="mt-3 space-y-2.5">
              {[
                'Upload your file(s)',
                'Adjust options if needed',
                'Click Process',
                'Download the result',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/40 text-xs font-bold text-brand-700 dark:text-brand-300">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Privacy</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              All files are processed locally in your browser. Nothing is uploaded to a server.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
