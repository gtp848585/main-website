import { useCallback, useState } from 'react';
import { ThemeProvider } from '@/lib/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { ToolGrid } from '@/components/ToolGrid';
import { ToolDetail } from '@/components/ToolDetail';
import { AdBanner } from '@/components/AdBanner';
import { LegalModals } from '@/components/LegalModals';
import type { Tool } from '@/lib/tools';
import type { LegalPage } from '@/lib/types';

type Page = 'home' | 'tool';
type LegalModalState = LegalPage;

function AppContent() {
  const [page, setPage] = useState<Page>('home');
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [legalModal, setLegalModal] = useState<LegalModalState>(null);

  const goHome = useCallback(() => {
    setPage('home');
    setActiveTool(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openTool = useCallback((tool: Tool) => {
    setActiveTool(tool);
    setPage('tool');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (page !== 'home') {
      setPage('home');
    }
    setTimeout(() => {
      document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [page]);

  const scrollToTools = useCallback(() => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
      <Navbar onSearch={handleSearch} onLogoClick={goHome} />

      <main className="flex-1">
        {page === 'home' && (
          <>
            <Hero onSearch={handleSearch} onExplore={scrollToTools} />

            {/* Leaderboard ad */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
              <AdBanner variant="leaderboard" className="relative" />
            </div>

            <ToolGrid searchQuery={searchQuery} onToolClick={openTool} />

            {/* In-feed ad above footer */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
              <AdBanner variant="in-feed" className="relative" />
            </div>
          </>
        )}

        {page === 'tool' && activeTool && (
          <ToolDetail tool={activeTool} onBack={goHome} />
        )}
      </main>

      <Footer onLegalClick={(p) => setLegalModal(p)} />

      <LegalModals open={legalModal} onClose={() => setLegalModal(null)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
