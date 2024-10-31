export default function SideBar({
  openAddForm,
  projects,
  activeId,
  setActiveId,
}) {
  return (
    <section className="bg-stone-900 font-semibold tracking-wide rounded-tr-xl min-h-[95vh] mt-[5vh]">
      <h1 className="text-stone-300 text-2xl uppercase min-h-32 pl-8 pb-8 pt-20">
        Your Projects
      </h1>
      <button
        onClick={openAddForm}
        className="bg-stone-500/15 text-stone-500 text-xl tracking-wide py-3 px-5  ml-8"
      >
        Add Project
      </button>
      <div className="mt-8">
        {projects.map((task) => (
          <p
            className={`ml-8 mr-20 mt-1 tracking-wide py-1 px-3 ${
              task.id === activeId
                ? 'bg-stone-800 text-stone-300'
                : 'text-stone-400'
            }`}
            onClick={() => setActiveId(task.id)}
            key={task.id}
          >
            {task.title}
          </p>
        ))}
      </div>
    </section>
  );
}
