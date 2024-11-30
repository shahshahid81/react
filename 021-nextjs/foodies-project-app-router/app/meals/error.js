// error page must be client component to catch all the client side errors as well
'use client';

// This component will be rendered when there is error for current page, it's siblings and nested pages and layouts
export default function Error() {
  return (
    <main className="error">
      <h1>An error occured</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}
