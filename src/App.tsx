import Header from '@/components/layout/header';
import KanbanBoard from '@/features/kanban-board/KanbanBoard';
import classnames from 'classnames';

function App() {
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

export default App;
