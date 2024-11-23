import { useParams, Link } from 'react-router-dom';

export default function HomePage() {
  // fetch route params
  const params = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
      <p>
        <Link
          to=".."
          /*
          This attribute has two values, route which is default value and path. 
          If we keep the value as route or don't specify the relative attribute, '..' will go up one level as per the route definitions. So we have definition as '/' at first level and '/products' and '/products/:id/ at second level. '..' at '/products/:id' will go to '/' route.

          If we keep the value as path, '..' will go up one level as per the current route. So we have current route as '/products/:id/'. '..' at '/products/:id' will go to '/products' route.
          */
          // relative="route"
          relative="path"
        >
          Back
        </Link>
      </p>
    </>
  );
}
