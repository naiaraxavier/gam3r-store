export interface TagProps {
  label: string;
  icon: React.ElementType;
  outlined?: boolean;
}

export const Tag = ({ label, icon: Icon, outlined }: TagProps) => {
  return (
    <div
      className={`
                flex items-center gap-2 self-start py-1 px-4
                rounded-full text-xs uppercase
                ${
                  outlined
                    ? "border border-violet-500 text-white"
                    : "bg-gradient-to-r from-violet-600 to-violet-700"
                }
                
    `}
    >
      <Icon size={15} />
      <span>{label}</span>
    </div>
  );
};
