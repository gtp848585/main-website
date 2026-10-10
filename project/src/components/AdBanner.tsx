interface AdBannerProps {
  variant: 'leaderboard' | 'sidebar' | 'in-feed';
  className?: string;
}

const LABELS: Record<AdBannerProps['variant'], string> = {
  leaderboard: 'Advertisement · 728×90 / 320×50',
  sidebar: 'Advertisement · 300×250',
  'in-feed': 'Advertisement · In-Feed',
};

const SIZES: Record<AdBannerProps['variant'], string> = {
  leaderboard: 'min-h-[90px] md:min-h-[90px]',
  sidebar: 'min-h-[250px]',
  'in-feed': 'min-h-[120px]',
};

export function AdBanner({ variant, className = '' }: AdBannerProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 ${SIZES[variant]} ${className}`}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="0000000000"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <span className="text-xs text-gray-400 dark:text-gray-600 select-none pointer-events-none absolute">
        {LABELS[variant]}
      </span>
    </div>
  );
}
