// Note that we could have added components folder in the app folder and the /components route wouldn't have been created because we need page.js file to add a route.

export default function Header() {
  return (
    <>
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
    </>
  );
}
