'use client';
import Header from '@/components/ui/header/header';
import KanbanBoard from '@/features/kanban-board/KanbanBoard';

export default function Home() {
  return (
    <>
      <Header />
      <KanbanBoard />
    </>
  );
}
