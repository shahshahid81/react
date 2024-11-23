import { Link } from 'react-router-dom';

const PRODUCTS = [
  { id: 'product-1', title: 'Product 1' },
  { id: 'product-2', title: 'Product 2' },
  { id: 'product-3', title: 'Product 3' },
];

export default function HomePage() {
  return (
    <>
      <h1>Products Page</h1>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <Link to={product.id}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
