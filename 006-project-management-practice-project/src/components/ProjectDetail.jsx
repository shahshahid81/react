import { useRef } from 'react';

function formatDate(date) {
  if (!date) {
    return '';
  }
  return Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export default function ProjectDetail({
  project,
  removeProject,
  addTask,
  removeTask,
}) {
  const inputRef = useRef(null);

  function handleAddTask() {
    if (inputRef.current?.value) {
      addTask(project.id, inputRef.current.value);
      inputRef.current.value = '';
    }
  }

  const doesTaskExists = Boolean(project?.tasks?.length);

  return (
    <section className="mt-[13vh] flex flex-col gap-6 pr-28 pl-10">
      <div className="w-full flex justify-between pr-10">
        <h3 className="text-stone-800 text-3xl font-semibold">
          {project.title}
        </h3>
        <button
          onClick={() => removeProject(project.id)}
          className="capitalize"
        >
          delete
        </button>
      </div>
      <p className="text-xl text-stone-400">{formatDate(project.dueDate)}</p>
      {project.description.split('\n').map((description, index) => (
        <p className="text-lg tracking-wide" key={index}>
          {description}
        </p>
      ))}
      <hr className="border-b-2 border-b-stone-400 mr-10" />
      <h3 className="text-stone-800 text-2xl font-bold">Tasks</h3>
      <div>
        <input ref={inputRef} className="bg-stone-500/15 text-xl" type="text" />
        <button onClick={handleAddTask} className="ml-4">
          Add Task
        </button>
      </div>
      {!doesTaskExists ? (
        <p className="text-lg">This project does not have any tasks yet.</p>
      ) : null}
      {doesTaskExists ? (
        <div className="bg-stone-100 py-6 px-4">
          {project.tasks.map((task) => (
            <div key={task} className="flex justify-between mt-3">
              <p>{task}</p>
              <button onClick={() => removeTask(project.id, task)}>
                Clear
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
