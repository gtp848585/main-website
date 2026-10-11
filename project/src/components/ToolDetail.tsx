import { useState } from 'react';
import { ArrowLeft, Loader2, CheckCircle2, Download, Settings2, RotateCw } from 'lucide-react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
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
  const [processedPdfBytes, setProcessedPdfBytes] = useState<Uint8Array | null>(null);
  const [processedFileName, setProcessedFileName] = useState<string>('document.pdf');

  // Tool options
  const [pageRange, setPageRange] = useState('1');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [rotation, setRotation] = useState(90);

  const addFiles = (newFiles: UploadedFile[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setStatus('processing');

    try {
      const fileObj = files[0].file;
      const originalName = files[0].name || 'document.pdf';
      setProcessedFileName(`${tool.id}_${originalName}`);
      
      const arrayBuffer = await fileObj.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();

      if (tool.id === 'watermark') {
        const pages = pdfDoc.getPages();
        for (const page of pages) {
          const { width, height } = page.getSize();
          page.drawText(watermarkText || 'CONFIDENTIAL', {
            x: width / 6,
            y: height / 2,
            size: 45,
            color: rgb(0.6, 0.6, 0.6),
            opacity: 0.45,
            rotate: degrees(45),
          });
        }
        const pdfBytes = await pdfDoc.save();
        setProcessedPdfBytes(pdfBytes);
      } else if (tool.id === 'rotate') {
        const pages = pdfDoc.getPages();
        for (const page of pages) {
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees((currentRotation + rotation) % 360));
        }
        const pdfBytes = await pdfDoc.save();
        setProcessedPdfBytes(pdfBytes);
      } else if (tool.id === 'split') {
        const subPdf = await PDFDocument.create();
        let targetPages: number[] = [];

        if (pageRange.includes('-')) {
          const [start, end] = pageRange.split('-').map((n) => parseInt(n.trim(), 10));
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              if (i >= 1 && i <= totalPages) targetPages.push(i - 1);
            }
          }
        } else {
          const pageNum = parseInt(pageRange.trim(), 10);
          if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
            targetPages.push(pageNum - 1);
          }
        }

        if (targetPages.length === 0) targetPages = [0];

        const copiedPages = await subPdf.copyPages(pdfDoc, targetPages);
        copiedPages.forEach((p) => subPdf.addPage(p));
        
        const subBytes = await subPdf.save();
        setProcessedPdfBytes(subBytes);
      }

      setStatus('done');
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('Failed to process PDF. Please try a standard unsecured PDF file.');
      setStatus('idle');
    }
  };

  const handleDownload = () => {
    const targetData = processedPdfBytes || files[0]?.file;
    if (!targetData) return;

    const blob = new Blob([targetData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = processedFileName;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => URL.revokeObjectURL(url), 200);
  };

  const reset = () => {
    setFiles([]);
    setStatus('idle');
    setProcessedPdfBytes(null);
  };

  const hasOptions = tool.id === 'split' || tool.id === 'watermark' || tool.id === 'rotate';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all tools
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.color} text-white shadow-md`}>
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">{tool.description}</p>
            </div>
          </div>

          {status !== 'done' && (
            <FileDropzone accept={tool.accept} multiFile={tool.multiFile} onFiles={addFiles} />
          )}

          {files.length > 0 && status !== 'done' && (
            <UploadedFileList files={files} onRemove={removeFile} />
          )}

          {files.length > 0 && hasOptions && status === 'idle' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                <Settings2 className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Options
              </div>

              {tool.id === 'split' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Page Range (e.g. 1-3 or 2)
                  </label>
                  <input
                    type="text"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder="e.g. 1-3"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition"
                  />
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

          {files.length > 0 && status === 'idle' && (
            <button
              onClick={handleProcess}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition"
            >
              <Icon className="h-5 w-5" />
              Process {files.length} File{files.length > 1 ? 's' : ''}
            </button>
          )}

          {status === 'processing' && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 animate-fade-in">
              <Loader2 className="h-12 w-12 animate-spin text-brand-600 dark:text-brand-400" />
              <p className="mt-4 text-base font-medium text-gray-900 dark:text-white">Processing your files...</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This may take a few seconds</p>
            </div>
          )}

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
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition"
                >
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

        <aside className="space-y-4">
          <AdBanner variant="sidebar" />
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Privacy</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              All files are processed securely in your browser. Nothing is uploaded to a server.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
