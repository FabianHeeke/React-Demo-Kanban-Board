'use client';
import Header from '@/components/layout/header';
import KanbanBoard from '@/features/kanban-board/KanbanBoard';
import classnames from 'classnames';

export default function Home() {
  const maxContentWidthClassName = 'max-w-4xl';
  return (
    <>
      <Header maxContentWidthClassName={maxContentWidthClassName} />
      <div className={classnames('relative mx-auto', maxContentWidthClassName)}>
        <KanbanBoard />
      </div>
    </>
  );
}
