import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { Modal } from './Modal';
import type { LegalPage } from '@/lib/types';

interface LegalModalsProps {
  open: LegalPage;
  onClose: () => void;
}

export function LegalModals({ open, onClose }: LegalModalsProps) {
  return (
    <>
      <Modal open={open === 'privacy'} onClose={onClose} title="Privacy Policy">
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-4">
          <p className="text-sm"><strong className="text-gray-900 dark:text-white">Last updated:</strong> October 2026</p>
          <p>PDFKit Hub respects your privacy. This Privacy Policy explains how we handle your data when you use our tools.</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">File Processing</h3>
          <p>All PDF processing happens locally in your browser. Your files are never uploaded to our servers. We do not store, access, or share your documents.</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Cookies & Local Storage</h3>
          <p>We use local storage to remember your theme preference (light/dark mode). We do not use tracking cookies. Third-party advertisers (Google AdSense) may use cookies to serve relevant ads.</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Google AdSense</h3>
          <p>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other internet sites.</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Children's Privacy</h3>
          <p>Our services are not directed to children under 13. We do not knowingly collect personal information from children.</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Contact</h3>
          <p>If you have questions about this Privacy Policy, please contact us via the Contact Us page.</p>
        </div>
      </Modal>

      <Modal open={open === 'terms'} onClose={onClose} title="Terms of Service">
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-4">
          <p className="text-sm"><strong className="text-gray-900 dark:text-white">Last updated:</strong> October 2026</p>
          <p>By using PDFKit Hub, you agree to these Terms of Service. Please read them carefully.</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Acceptable Use</h3>
          <p>You agree to use our tools only for lawful purposes. You must not use our tools to process documents that contain illegal content or that violate intellectual property rights.</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Service Availability</h3>
          <p>We strive to keep our tools available at all times but do not guarantee uninterrupted service. We may modify or discontinue features at any time without notice.</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Disclaimer</h3>
          <p>All tools are provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of our tools.</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Changes to Terms</h3>
          <p>We may update these terms at any time. Continued use of the service constitutes acceptance of the updated terms.</p>
        </div>
      </Modal>

      <Modal open={open === 'contact'} onClose={onClose} title="Contact Us">
        <ContactContent />
      </Modal>

      <Modal open={open === 'about'} onClose={onClose} title="About Us">
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-4">
          <p>PDFKit Hub is a free, browser-based suite of PDF tools designed to make working with PDF files simple, fast, and secure.</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Our Mission</h3>
          <p>We believe everyone should have access to powerful PDF tools without paying for expensive software or worrying about privacy. All our tools run directly in your browser — no installations, no server uploads.</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">What We Offer</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Merge, split, and compress PDFs</li>
            <li>Convert between PDF, Word, and image formats</li>
            <li>Protect and unlock PDF documents</li>
            <li>Rotate, organize, and watermark pages</li>
          </ul>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Privacy First</h3>
          <p>Your files never leave your device. All processing happens locally, ensuring complete privacy and security.</p>
        </div>
      </Modal>
    </>
  );
}

function ContactContent() {
  const [sent, setSent] = useState(false);

  return (
    <div className="space-y-4">
      {!sent ? (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Have a question or feedback? We'd love to hear from you.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
              <textarea
                required
                rows={4}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <Send className="h-7 w-7 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">Message Sent!</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Thanks for reaching out. We'll get back to you soon.</p>
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>support@pdfkithub.com</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>Available worldwide · Online</span>
        </div>
      </div>
    </div>
  );
}
