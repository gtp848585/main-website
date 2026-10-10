import { useMemo, useState } from 'react';
import { TOOLS, CATEGORIES, type Tool } from '@/lib/tools';
import { ToolCard } from './ToolCard';

interface ToolGridProps {
  searchQuery: string;
  onToolClick: (tool: Tool) => void;
}

export function ToolGrid({ searchQuery, onToolClick }: ToolGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = useMemo(() => {
    let result = TOOLS;
    if (activeCategory !== 'All') {
      result = result.filter((t) => t.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <section id="tools" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">All PDF Tools</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Pick a tool below to get started</p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCategory === cat
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onClick={() => onToolClick(tool)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">No tools found. Try a different search.</p>
        </div>
      )}
    </section>
  );
}
