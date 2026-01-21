import Header from '@/components/layout/header';
import KanbanBoard from '@/features/kanban-board/KanbanBoard';
import classnames from 'classnames';

function App() {
  const maxContentWidthClassName = 'max-w-4xl px-4';

  return (
    <div className="bg-custom-light grid min-h-screen min-w-screen grid-rows-[auto_1fr]">
      <Header maxContentWidthClassName={maxContentWidthClassName} />
      <div
        className={classnames(
          'justify-self-center p-8',
          maxContentWidthClassName
        )}
      >
        <KanbanBoard />
      </div>
    </div>
  );
}

export default App;
