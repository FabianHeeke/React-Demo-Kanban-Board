import { FormEvent, useActionState, useState } from 'react';
import Task from '../interfaces/Task.interface';
import KanbanSelect from '@/components/ui/KanbanSelect';
import classNames from 'classnames';
import useBoardStore from '../hooks/useBoardStore';

interface TaskFormProps {
  onSubmit: (updatedTask: Task) => void;
  taskParams?: Partial<Task>;
}

const TaskForm = ({ onSubmit, taskParams }: TaskFormProps) => {
  const date = new Date();
  const defautTaskData: Task = {
    id: date.getTime(),
    title: '',
    description: '',
    columnId: 1,
    priority: 2,
    creationDate: date.toISOString(),
    lastModifiedDate: date.toISOString(),
  };

  async function handleFormSubmit(
    prevState: Task,
    formData: FormData
  ): Promise<Task> {
    const updatedTask = {
      ...prevState,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
    };

    onSubmit(updatedTask);
    return updatedTask;
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    ...defautTaskData,
    ...taskParams,
  });

  const [isFormValid, setIsFormValid] = useState(
    state.title.length > 0 && state.description.length > 0
  );

  const handleFormChange = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    setIsFormValid(form.checkValidity());
  };

  return (
    <form
      action={formAction}
      onChange={handleFormChange}
      className="flex flex-col gap-4 rounded border p-4"
    >
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Titel</label>
        <input
          name="title"
          required
          defaultValue={state.title || ''}
          className="border-custom-dark rounded border px-2 py-1"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Beschreibung</label>
        <textarea
          required
          name="description"
          defaultValue={state.description || ''}
          className="border-custom-dark rounded border px-2 py-1"
        />
      </div>
      <div>
        <label className="font-semibold">Priorität</label>
        <KanbanSelect
          options={[
            { displayName: 'Hoch', value: 3 },
            { displayName: 'Mittel', value: 2 },
            { displayName: 'Niedrig', value: 1 },
          ]}
          onValueSelect={(newPriority: Task['priority']) =>
            (state.priority = newPriority)
          }
        />
      </div>
      <div>
        <label className="font-semibold">Spalte</label>
        <KanbanSelect
          options={useBoardStore((state) => state.columns).map((column) => ({
            displayName: column.name,
            value: column.id,
          }))}
          onValueSelect={(newColumnId: Task['priority']) =>
            (state.columnId = newColumnId)
          }
        />
      </div>
      <button
        type="submit"
        className={classNames({ 'bg-red-500': !isFormValid || isPending })}
        disabled={!isFormValid || isPending}
      >
        {isPending ? 'Speichere...' : 'Speichern'}
      </button>
      {/* Debug-Ansicht um zu sehen, was im State passiert */}
      <pre className="bg-gray-100 p-2 text-xs">
        Aktueller State: {JSON.stringify(state, null, 2)}
      </pre>
    </form>
  );
};

export default TaskForm;
