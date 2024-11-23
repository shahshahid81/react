import {
  json,
  redirect,
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  // returns the data returned by the action function, this will automatically extract the data from response.
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    // Component from react router that will handle submission of form data, POST request will be sent to the current active route. we can specify action attribute to send request to different route
    <Form method={method} className={classes.form}>
      {data?.errors && (
        <ul>
          {Object.values(data.errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

// Function that will handle form submission
export async function action({ request, params }) {
  // Returns FormData instance, important to have name attribute for all the input elements in the form
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  console.log(`http://localhost:8080/events${request.method === 'PATCH' ? `/${params.id}` : ''}`);

  const response = await fetch(`http://localhost:8080/events${request.method === 'PATCH' ? `/${params.id}` : ''}`, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  console.log(response);

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save event' }, { status: 500 });
  }

  return redirect('/events');
}
