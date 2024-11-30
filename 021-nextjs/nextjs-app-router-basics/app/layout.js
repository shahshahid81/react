// layout.js is reserved name in next js which will wrap the page component. Nextjs always needs at least root layout.

// Imported global css will be available for every page. Note that we also have icon.png file which will be used as favicon.
import './globals.css';

// Reserved keyword, used to generate the meta tags in head section
export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

export default function RootLayout({
  // Content of page is sent as children
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
