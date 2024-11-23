import { useRouteError } from 'react-router-dom';
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
  const errorData = useRouteError();

  let title = 'An error occured!';
  let message = 'Something went wrong!';

  if (errorData.status === 500) {
    // message = JSON.parse(errorData.data).message;

    // Parsing will be done by react router because json helper is used
    message = errorData.data.message;
  }

  if (errorData.status === 404) {
    title = 'Not Found!';
    message = 'Could not find resource or page.'
  }

  return <>
    <MainNavigation />
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  </>;
}
