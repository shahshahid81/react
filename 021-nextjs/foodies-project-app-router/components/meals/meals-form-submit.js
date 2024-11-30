'use client';
import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
  // useFormStatus is a Hook that gives you status information of the last form submission.
  // The useFormStatus Hook must be called from a component that is rendered inside a <form>.
  // useFormStatus will only return status information for a parent <form>. It will not return status information for any <form> rendered in that same component or children components.
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  );
}
