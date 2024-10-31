import { useState } from 'react';
import AddProject from './components/AddProject';
import ProjectList from './components/ProjectList';
import SideBar from './components/Sidebar';
import ProjectDetail from './components/ProjectDetail';

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [activeId, setActiveId] = useState('');

  function openAddForm() {
    setShowAddForm(true);
  }

  function closeAddForm() {
    setShowAddForm(false);
  }

  function addProject(project) {
    setProjects((previousProjects) => {
      const newProjects = previousProjects.map((project) => ({
        ...project,
        tasks: [...project.tasks],
      }));
      newProjects.push(project);
      return newProjects;
    });
    closeAddForm();
  }

  function addTask(projectId, task) {
    setProjects((previousProjects) => {
      const newProjects = previousProjects.map((project) => ({
        ...project,
        tasks: [...project.tasks],
      }));
      const project = newProjects.find((project) => project.id === projectId);
      if (project && !project.tasks.includes(task)) {
        project.tasks.push(task);
      }
      return newProjects;
    });
  }

  function removeTask(projectId, taskToRemove) {
    setProjects((previousProjects) => {
      const newProjects = previousProjects.map((project) => ({
        ...project,
        tasks: [...project.tasks],
      }));
      const project = newProjects.find((project) => project.id === projectId);
      if (project) {
        project.tasks = project.tasks.filter((task) => task !== taskToRemove);
      }
      return newProjects;
    });
  }

  function removeProject(projectId) {
    setProjects((previousProjects) => {
      const newProjects = previousProjects
        .map((project) => ({
          ...project,
          tasks: [...project.tasks],
        }))
        .filter((project) => project.id !== projectId);
      return newProjects;
    });
  }

  if (activeId === '' && projects?.[0]?.id) {
    setActiveId(projects[0].id);
  }

  const activeProject = projects.find((project) => project.id === activeId);

  return (
    <main className="flex">
      <aside className="basis-1/4">
        <SideBar
          projects={projects}
          openAddForm={openAddForm}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      </aside>
      <section className="basis-3/4">
        {showAddForm ? (
          <AddProject addProject={addProject} closeAddForm={closeAddForm} />
        ) : activeProject ? (
          <ProjectDetail
            addTask={addTask}
            removeTask={removeTask}
            removeProject={removeProject}
            project={activeProject}
          />
        ) : (
          <ProjectList openAddForm={openAddForm} />
        )}
      </section>
    </main>
  );
}

export default App;
