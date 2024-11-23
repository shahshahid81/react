import { Link, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem({ event }) {
  // returns the action function of current route, note that the component is rendered on the component where the action is defined, so it is available.
  const submit = useSubmit();

  function startDeleteHandler() {

    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(
        // Data that is to be sent as payload, it will be added inside form data internally, here setting to null because no data has to be sent
        null,
        { method: 'DELETE' }
      );
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
