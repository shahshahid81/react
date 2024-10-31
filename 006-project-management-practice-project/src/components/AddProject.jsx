import { useState, useRef } from 'react';
import FormInput from './FormInput';

function getInitialState() {
  return { title: '', description: '', dueDate: '' };
}

export default function AddProject({ closeAddForm, addProject }) {
  const id = useRef({ count: 1 });
  const [formState, setFormState] = useState(getInitialState());

  const isFormComplete = Object.values(formState).every(
    (value) => value !== ''
  );

  function updateFormData(key, value) {
    setFormState((previousFormState) => {
      const newFormState = { ...previousFormState, [key]: value };
      return newFormState;
    });
  }

  function handleSave() {
    addProject({ ...formState, id: id.current.count++, tasks: [] });
    setFormState(getInitialState());
  }

  return (
    <section className="mt-[20vh] flex flex-col items-center justify-center gap-6 pr-28">
      <div className="self-end flex">
        <button
          onClick={closeAddForm}
          className="text-xl text-stone-600 px-4 py-3"
        >
          Cancel
        </button>
        <button
          disabled={!isFormComplete}
          className="text-xl bg-stone-800 text-stone-100 px-4 py-3 rounded-md"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      <div className="flex flex-col self-start pl-28 w-full">
        <FormInput
          value={formState['title']}
          onChange={(e) => {
            updateFormData('title', e.target.value);
          }}
          label="title"
          id="title"
          type="text"
          Component="input"
        />
      </div>

      <div className="flex flex-col self-start pl-28 w-full">
        <FormInput
          value={formState['description']}
          onChange={(e) => {
            updateFormData('description', e.target.value);
          }}
          label="description"
          id="description"
          Component="textarea"
        />
      </div>

      <div className="flex flex-col self-start pl-28 w-full">
        <FormInput
          value={formState['dueDate']}
          onChange={(e) => {
            updateFormData('dueDate', e.target.value);
          }}
          label="Due Date"
          id="due-date"
          type="date"
          Component="input"
        />
      </div>
    </section>
  );
}
