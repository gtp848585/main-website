import { FileText } from 'lucide-react';

interface FooterProps {
  onLegalClick: (page: 'privacy' | 'terms' | 'contact' | 'about') => void;
}

export function Footer({ onLegalClick }: FooterProps) {
  const year = new Date().getFullYear();

  const links = [
    { label: 'Privacy Policy', page: 'privacy' as const },
    { label: 'Terms of Service', page: 'terms' as const },
    { label: 'Contact Us', page: 'contact' as const },
    { label: 'About Us', page: 'about' as const },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">PDFKit Hub</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => onLegalClick(link.page)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © {year} PDFKit Hub. All-in-One Online PDF Tools. All files are processed locally in your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
