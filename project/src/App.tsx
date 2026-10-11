import { useState } from 'react';
import { TOOLS, type Tool } from '@/lib/tools';
import { ToolCard } from '@/components/ToolCard';
import { ToolDetail } from '@/components/ToolDetail';
import { FileText, ShieldCheck, Zap } from 'lucide-react';
import { AdBanner } from '@/components/AdBanner';

export function App() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            onClick={() => setSelectedTool(null)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              PDFKit <span className="text-brand-600">Hub</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            <span className="hidden sm:inline">100% Secure & Client-Side</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {!selectedTool ? (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Every tool you need to work with PDFs
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Watermark, rotate, and split your PDF files easily and securely right inside your browser. No uploads required!
              </p>
            </div>

            <AdBanner variant="header" className="mb-10" />

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOOLS.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onSelect={(t) => setSelectedTool(t)}
                />
              ))}
            </div>

            {/* Features Info */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200 dark:border-gray-800 pt-12">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">100% Secure</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Files never leave your device. All processing happens locally in your browser.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">No waiting for large uploads or server queue times. Instant results.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Easy to Use</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Simple interface designed to get your tasks done in seconds.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ToolDetail tool={selectedTool} onBack={() => setSelectedTool(null)} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} PDFKit Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
