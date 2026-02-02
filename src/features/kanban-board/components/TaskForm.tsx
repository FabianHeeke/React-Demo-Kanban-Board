import { FormEvent, useActionState, useState } from 'react';
import Task from '../interfaces/Task.interface';
import KanbanCheckboxSelect from '@/components/ui/KanbanCheckboxSelect';
import useBoardStore from '../hooks/useBoardStore';
import KanbanButton from '@/components/ui/KanbanButton';
import { useTaskUtils } from '../hooks/useTaskUtils';
import { useDateFormatter } from '../hooks/useDateFormatter';

interface TaskFormProps {
  onSubmit: (updatedTask: Task) => void;
  taskParams?: Partial<Task>;
}

const TaskForm = ({ onSubmit, taskParams }: TaskFormProps) => {
  const { createTask } = useTaskUtils();
  const { formatDate } = useDateFormatter(true);

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

  const handleFormChange = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    setIsFormValid(form.checkValidity());
  };

  const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    createTask(taskParams)
  );

  const [isFormValid, setIsFormValid] = useState(
    state.title.length > 0 && state.description.length > 0
  );

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
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Priorität</label>
          <KanbanCheckboxSelect
            options={[
              { displayName: 'Hoch', value: 3 },
              { displayName: 'Mittel', value: 2 },
              { displayName: 'Niedrig', value: 1 },
            ]}
            onValueSelect={(newPriority: Task['priority']) =>
              (state.priority = newPriority)
            }
            preSelectedValue={state.priority}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Spalte</label>
          <KanbanCheckboxSelect
            options={useBoardStore((state) => state.columns).map((column) => ({
              displayName: column.name,
              value: column.id,
            }))}
            onValueSelect={(newColumnId: Task['priority']) =>
              (state.columnId = newColumnId)
            }
            preSelectedValue={state.columnId}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs">{`Erstellt: ${formatDate(new Date(state.creationDate))}`}</span>
        <span className="text-xs">{`Zuletzt geändert: ${formatDate(new Date(state.lastModifiedDate))}`}</span>
      </div>
      <div className="flex justify-end gap-2">
        <KanbanButton variant="secondary">Abbrechen</KanbanButton>
        <KanbanButton
          variant="primary"
          type="submit"
          isDisabled={!isFormValid || isPending}
        >
          Speichern
        </KanbanButton>
      </div>
    </form>
  );
};

export default TaskForm;
