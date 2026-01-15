'use client';
import Header from '@/components/ui/header/header';
import KanbanBoard from '@/features/kanban-board/KanbanBoard';

export default function Home() {
  return (
    <>
      <Header />
      <div className="relative mx-auto max-w-4xl">
        <KanbanBoard />
      </div>
    </>
  );
}
