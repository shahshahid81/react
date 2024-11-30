// Note that we are getting props from next js, one prop is params which is the dynamic path set using [] brackets in the file name.
export default function BlogPostPage({ params }) {
  return (
    <main>
      <h1>Blog Post Page</h1>
      <p>{params.id}</p>
    </main>
  );
}
