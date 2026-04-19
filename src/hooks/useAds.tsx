import { useAuth } from '@/context/AuthContext';

export const useAds = () => {
  const { isPro, user } = useAuth();

  const showAds = !user || !isPro;

  return {
    showAds,
  };
};

export const AdSlot = ({ slotId = 'default' }: { slotId?: string }) => {
  const { showAds } = useAds();

  if (!showAds) {
    return null;
  }

  return (
    <div
      id={`ad-slot-${slotId}`}
      className="flex items-center justify-center py-4 bg-muted/50 rounded-lg border border-dashed"
      data-ad-placeholder
    >
      <div className="text-sm text-muted-foreground">
        [Ad Space - Google AdSense will be displayed here]
      </div>
    </div>
  );
};
