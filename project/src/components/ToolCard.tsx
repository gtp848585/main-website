import type { Tool } from '@/lib/tools';

interface ToolCardProps {
  tool: Tool;
  onSelect: (tool: Tool) => void;
}

export function ToolCard({ tool, onSelect }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <div
      onClick={() => onSelect(tool)}
      className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-md mb-4 group-hover:scale-105 transition`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 transition">
          {tool.name}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {tool.description}
        </p>
      </div>
      <div className="mt-6 flex items-center text-sm font-semibold text-brand-600 dark:text-brand-400">
        <span>Use Tool</span>
        <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );
}
