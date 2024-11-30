// error page must be client component to catch all the client side errors as well
'use client';

// This component will be rendered when we don't find any data for dynamic path. E.g., if we are using id dynamically to get the data and there is no such id at backend, this component will be rendered
export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Not Found</h1>
      <p>Unfortunately, we could not find the requested page or resource.</p>
    </main>
  );
}
