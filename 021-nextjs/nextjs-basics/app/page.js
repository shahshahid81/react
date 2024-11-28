// Content of page is rendered on the route. app/page.js will be mapped to / route

// @ refers to the root folder, this is configured for the project
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      {/* Added Link from nextjs to ensure that we are using client side routing */}
      <p>
        <Link href="/about">About us</Link>
      </p>
    </main>
  );
}
