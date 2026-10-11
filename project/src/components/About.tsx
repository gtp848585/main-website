import { ArrowLeft, ShieldCheck, Zap, FileText } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export function About({ onBack }: AboutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-600 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>

      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 sm:p-12 shadow-sm space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">About PDFKit Hub</h1>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Welcome to <strong className="text-brand-600">PDFKit Hub</strong> (iloveyoupdf.in), your ultimate, lightning-fast, and 100% secure client-side PDF utility platform. We believe managing documents should be simple, instant, and completely private.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">100% Privacy</h3>
            <p className="text-sm text-gray-500">Your files never leave your device. All processing happens locally in your browser using advanced client-side technology.</p>
          </div>
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">Lightning Fast</h3>
            <p className="text-sm text-gray-500">No waiting for large uploads or server queues. Get your files merged, split, or converted instantly.</p>
          </div>
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">Free & Easy</h3>
            <p className="text-sm text-gray-500">Clean interface designed to help you get your daily document tasks done in seconds without hidden limits.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
