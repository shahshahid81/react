// index.js file here will be mapped to /news route. We could have also created news.js at the root route but we needed more routes hence added folder

import Link from 'next/link';

export default function NewsPage() {
  return (
    <>
      <h1>The News Page</h1>
      <ul>
        <li>
          {/* Using link like below will cause client side routing instead of triggering refresh on route click */}
          <Link href="/news/nextjs-is-a-great-framework">
            NextJS is a great framework
          </Link>
        </li>
        <li>Something Else</li>
      </ul>
    </>
  );
}
