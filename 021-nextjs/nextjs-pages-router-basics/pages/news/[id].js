// [id].js file here will be mapped to /news/:id route. 

import { useRouter } from 'next/router'

export default function DetailsPage() {
  const router = useRouter();

  // Note that the value will be undefined first, it will be rendered immediately first but won't know the url content then again with the content available.
  console.log(router.query.id);

  return <h1>The Details Page</h1>;
}
