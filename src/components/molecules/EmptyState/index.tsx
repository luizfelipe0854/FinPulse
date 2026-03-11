import { Text, Button } from "@/components/atoms";

import AlienShip from "@/assets/AlienShip.svg";

type EmptyStateProps = {
  text: string;
  redirectText?: string;
  redirectButtonText?: string;
};

export const EmptyState = ({
  text,
  redirectText,
  redirectButtonText,
}: EmptyStateProps) => {
  return (
    <section className="flex flex-col items-center justify-center h-full gap-2">
      <img src={AlienShip} alt="Alien Ship" className="w-20 h-20 mb-2" />
      <Text as="h2" variant="title">
        {text}
      </Text>
      {redirectText && redirectButtonText && (
        <div className="flex flex-col items-center justify-center gap-2">
          <Text as="p" variant="body">
            {redirectText}
          </Text>
          <Button
            label={redirectButtonText}
            onClick={() => {
              alert("ta funcionano");
            }}
            variant="primary"
          />
        </div>
      )}
    </section>
  );
};
