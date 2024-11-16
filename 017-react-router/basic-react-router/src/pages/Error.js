import MainNavigation from '../components/MainNavigation';

export default function Error() {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>Something went wrong!</h1>
        <p>We were not able to find the requested page!</p>
      </main>
    </>
  );
}
