import React, { useContext } from 'react';

import TodoItem from './TodoItem';
import classes from './Todos.module.css';
import { TodosContext } from '../store/todos-context';

const Todos: React.FC = () => {
  const todosContext = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {todosContext.items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          onRemoveTodo={() => todosContext.removeTodo(item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
