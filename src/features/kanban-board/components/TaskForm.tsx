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
      className="flex flex-col gap-8"
    >
      {/* Title + description */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Titel</label>
          <input
            name="title"
            required
            defaultValue={state.title || ''}
            className="border-custom-medium rounded border bg-white px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Beschreibung</label>
          <textarea
            required
            rows={4}
            name="description"
            defaultValue={state.description || ''}
            className="border-custom-medium rounded border bg-white px-2 py-1"
          />
        </div>
      </div>
      {/* Priority + columnId */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-1">
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
        <div className="flex gap-1">
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
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs">{`Erstellt: ${state.creationDate}`}</span>
        <span className="text-xs">{`Zuletzt geändert: ${state.lastModifiedDate}`}</span>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className={classNames({ 'bg-red-500': !isFormValid || isPending })}
          disabled={!isFormValid || isPending}
        >
          {isPending ? 'Speichere...' : 'Speichern'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
