import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { client, fetchEvent, updateEvent } from '../../util/http.js';
import {
  //  useMutation,
  useQuery,
} from '@tanstack/react-query';
import ErrorBlock from '../UI/ErrorBlock.jsx';
// import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EditEvent() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const params = useParams();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  // Note that we have loader as well. We are keeping this as it is to keep our subscription as well.
  const {
    data,
    // Removed because we added loader so we will have the data
    // isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['events', { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    // Added stale time of 1 sec because we have a loader as well and we don't want to execute duplicate request
    staleTime: 1000,
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;

  //     // Note that only queries are cancelled, not the mutations so write operations won't be impacted
  //     await client.cancelQueries(['events', { id: params.id }]);

  //     const previousEvent = client.getQueryData(['events', { id: params.id }]);

  //     client.setQueryData(['events', { id: params.id }], newEvent);

  //     return { previousEvent };
  //   },
  //   onError: (
  //     _error,
  //     _data,
  //     //Context is the data returned from onMutate
  //     context
  //   ) => {
  //     client.setQueryData(['events', { id: params.id }], context.previousEvent);
  //   },
  //   onSettled: () => {
  //     client.invalidateQueries(['events', { id: params.id }]);
  //   },
  // });

  function handleSubmit(formData) {
    // mutate({ id: params.id, event: formData });
    // navigate('../');

    console.log(formData);
    submit(formData, { method: 'PUT' });
  }

  function handleClose() {
    navigate('../');
  }

  let content;
  // Removed because we added loader so we will have the data
  // if (isPending) {
  //   content = (
  //     <div className="center">
  //       <LoadingIndicator />
  //     </div>
  //   );
  // }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Error Loading Event Details"
          message={error.info?.message || 'Failed to load event details.'}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {isSubmitting ? (
          <p>Submitting....</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  // execute the query programatically. It is different from useQuery in the sense that this will cause infinite loop whereas useQuery won't and useQuery will create a subscription as well where as fetchQuery won't. Refer https://stackoverflow.com/questions/70548117/usequery-hook-vs-queryclient-fetchquery-when-to-prefer-one-over-the-other
  return client.fetchQuery({
    queryKey: ['events', { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedData });
  await client.invalidateQueries(['events']);
  return redirect('../');
}
