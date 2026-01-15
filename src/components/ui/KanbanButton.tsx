interface KanbanButtonProps {
  children: React.ReactNode;
}

const KanbanButton = ({ children }: KanbanButtonProps) => {
  return (
    <button className="flex cursor-pointer items-center gap-2 rounded border border-black p-2">
      {children}
    </button>
  );
};

export default KanbanButton;
