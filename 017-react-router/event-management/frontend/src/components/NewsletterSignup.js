import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

export default function NewsletterSignup() {
  // When we use action or loader function, we are directed to the route where it is defined. Using fetcher will allow us to use the action without redirection to the component. To test the changes, use Form instead of fetcher.Form to understand better.
  const fetcher = useFetcher();

  const { data, state } = fetcher;
  useEffect(() => {
    if (state === 'idle' && data?.message) {
      window.alert(data.message);
    }
  }, [data, state])

  return (
    <fetcher.Form method="post"
      // Important to define action here because the component can be on any route
      action="/newsletter"
      className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}
