import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {

  const navigate = useNavigate();

  return (
    <>
      <h1>
        Home Page
      </h1>
      <p>
        {/* Link internally renders a tag */}
        {/* 
          Path starts with `/` is absolute path
          Go to <Link to="/products">Products</Link>
        */}
        Go to <Link to="products">Products</Link>
      </p>
      <button
        // Ideally, we should use Link element instead of button, added for demo of navigate method
        onClick={() => navigate('/products')}
      >Navigate</button>
    </>
  );
}
