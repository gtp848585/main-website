import { ArrowLeft, Mail, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

interface ContactProps {
  onBack: () => void;
}

export function Contact({ onBack }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-600 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>

      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 sm:p-12 shadow-sm space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Contact Us</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Have a question, feedback, or feature request? Drop us a message below!
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-6 text-center space-y-2">
            <h3 className="text-lg font-bold text-green-800 dark:text-green-300">Message Sent Successfully!</h3>
            <p className="text-sm text-green-600 dark:text-green-400">Thank you for reaching out. We will get back to you soon.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs font-semibold underline text-green-700 dark:text-green-400"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea
                required
                rows={4}
                placeholder="How can we help you?"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-700 transition shadow-md"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
