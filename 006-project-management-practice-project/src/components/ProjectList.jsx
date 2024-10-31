import noProjectIcon from '../assets/no-projects.png';

export default function ProjectList({ openAddForm }) {
  return (
    <section className="font-semibold tracking-wide mt-[20vh] flex flex-col items-center justify-center gap-6">
      <img className="w-20" src={noProjectIcon} alt="Project Icon" />
      <h2 className="text-stone-600 text-2xl">No Project Selected</h2>
      <p className="text-stone-400 font-light text-xl">
        Select a project or get started with a new one
      </p>
      <button
        className="bg-stone-700 text-stone-400 font-extralight rounded-lg text-xl tracking-wide py-3 px-5  ml-8"
        onClick={openAddForm}
      >
        Create new Project
      </button>
    </section>
  );
}
