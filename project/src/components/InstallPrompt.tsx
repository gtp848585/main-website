import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // Fallback for browsers where the prompt event hasn't fired
      alert("To install this app:\n\n• On Chrome/Edge (Desktop): Click the install icon in the right side of the address bar, or click the 3-dots menu -> 'Install PDFKit Hub'.\n• On Mobile: Tap the browser menu (3 dots) and select 'Add to Home screen' or 'Install app'.");
    }
  };

  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 shadow-md transition cursor-pointer"
    >
      <Download className="h-4 w-4" />
      Install App
    </button>
  );
}
