import { Text, Button } from "@/components/atoms";

import AlienShip from "@/assets/AlienShip.svg";

type EmptyStateProps = {
  text: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const EmptyState = ({ text, description, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <section className="flex flex-col items-center justify-center text-center gap-2 py-12 px-6">
      <div className="size-20 rounded-full bg-surface-2 flex items-center justify-center mb-2">
        <img src={AlienShip} alt="" className="size-12 opacity-80" />
      </div>
      <Text as="h2" variant="title" size="md">
        {text}
      </Text>
      {description && (
        <Text as="p" variant="muted" size="sm" className="max-w-xs">
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button label={actionLabel} size="sm" onClick={onAction} className="mt-3" />
      )}
    </section>
  );
};
