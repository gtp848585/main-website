import { Sun, Moon, Search, FileText, Menu, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useTheme } from '@/lib/ThemeContext';

interface NavbarProps {
  onSearch: (query: string) => void;
  onLogoClick: () => void;
}

export function Navbar({ onSearch, onLogoClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={onLogoClick} className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
              <FileText className="h-5 w-5" />
            </div>
            <div className="text-left">
              <span className="block text-lg font-bold tracking-tight text-gray-900 dark:text-white leading-none">
                PDFKit
              </span>
              <span className="block text-xs font-medium text-brand-600 dark:text-brand-400 leading-none mt-0.5">
                Hub
              </span>
            </div>
          </button>

          {/* Search bar (desktop) */}
          <form onSubmit={handleSubmit} className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search PDF tools..."
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {mobileOpen && (
          <div className="pb-4 md:hidden animate-fade-in">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search PDF tools..."
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
