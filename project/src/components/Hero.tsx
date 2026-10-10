import { Search, ArrowRight } from 'lucide-react';
import { useState, type FormEvent } from 'react';

interface HeroProps {
  onSearch: (query: string) => void;
  onExplore: () => void;
}

export function Hero({ onSearch, onExplore }: HeroProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white dark:from-brand-950/30 dark:via-gray-950 dark:to-gray-950" />
      <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-brand-100/50 to-transparent dark:from-brand-900/20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/30 px-4 py-1.5 text-xs font-medium text-brand-700 dark:text-brand-300 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          11 Free PDF Tools · No Installation Required
        </div>

        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white animate-slide-up">
          All-in-One Online
          <span className="block bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
            PDF Tools
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400 animate-slide-up">
          Merge, compress, split, convert, protect, and organize your PDF files —
          all in your browser. Fast, secure, and completely free.
        </p>

        {/* Search */}
        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl animate-slide-up">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a tool... e.g. merge, compress, watermark"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-12 pr-32 py-4 text-base text-gray-900 dark:text-white placeholder-gray-400 shadow-lg shadow-brand-500/5 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 focus:outline-none transition"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition"
            >
              Search
            </button>
          </div>
        </form>

        <button
          onClick={onExplore}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:gap-3 transition-all animate-fade-in"
        >
          Explore all tools
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
