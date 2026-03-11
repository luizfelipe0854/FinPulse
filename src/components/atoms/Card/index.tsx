import { Text } from "@/components/atoms";

type CardProps = {
  icon?: React.ReactNode;
  title: string;
  content: string;
};

export const Card = ({ icon, title, content }: CardProps) => {
  return (
    <div className="max-w-[300px] min-w-[200px] border border-[var(--border)] p-2 rounded-lg bg-[var(--surface)] ">
      <div className="flex flex-row items-center justify-center gap-2">
        {icon}
        <Text variant="title" as="h2">
          {title}
        </Text>
      </div>
      <hr />
      <Text variant="body" as="p" moreProps="text-center text-xl">
        {content}
      </Text>
    </div>
  );
};
