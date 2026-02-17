'use client';
import Header from '@/components/layout/Header';
import classnames from 'classnames';
import dynamic from 'next/dynamic';

const KanbanBoard = dynamic(
  () => import('@/features/kanban-board/KanbanBoard'),
  { ssr: false }
); // We are storing data in localstorage for this demo so this is needed to avoid a hydration mismatch

export default function Home() {
  const maxContentWidthClassName = 'max-w-4xl px-4';
  return (
    <>
      <Header maxContentWidthClassName={maxContentWidthClassName} />
      <div className={classnames('relative mx-auto', maxContentWidthClassName)}>
        <KanbanBoard />
      </div>
    </>
  );
}
