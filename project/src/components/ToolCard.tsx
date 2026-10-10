import { ArrowRight } from 'lucide-react';
import type { Tool } from '@/lib/tools';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-start gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 text-left shadow-sm hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-700 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-sm`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {tool.description}
        </p>
      </div>
      <div className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
        Open tool
        <ArrowRight className="h-4 w-4" />
      </div>
    </button>
  );
}
