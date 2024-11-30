// import { useEffect, useState } from 'react';

// This won't be added in client side bundle since this will be used only for server side code
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 5, 12345 Some City',
//     description: 'This is a first meetup!',
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 10, 12345 Some City',
//     description: 'This is a second meetup!',
//   },
// ];

export default function HomePage(props) {
  // Using below approach will require the html to not be generated before sending the data which is not good for SEO. Hence, we used getStaticProps which will execute the code at build time and generate the html with the loaded data before hand. Note that it is static and api will be called only at the build time.
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS)
  // }, [])

  // return <MeetupList meetups={loadedMeetups} />;

  return (
    <>
      {/* Component that will add the metadata for the page */}
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// // The method is called to generate the props and send it to the component during every request
// context has request and response.
// export async function getServerSideProps(context) {
//   const request = context.req;
//   const response = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

// The method is called to generate the props and send it to the component during build time
// context won't have request and response.
export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb://test:test@localhost:27017/meetups?authSource=admin`
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // The return type must always be an object with props key since this will be passed to the component
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          description: meetup.description,
          address: meetup.address,
          id: meetup._id.toString(),
        };
      }),
    },
    // Below value is in seconds, this will ensure that the page is re generated after the time
    revalidate: 1,
  };
}
