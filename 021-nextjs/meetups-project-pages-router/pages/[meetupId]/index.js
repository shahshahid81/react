import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import Head from 'next/head'

export default function MeetupDetails(props) {
  return <>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta name='description' content={props.meetupData.description} />
    </Head>
    <MeetupDetail {...props.meetupData} />
  </>
}

// Since this is a dynamic path file, we need below method to fetch all the possible paths
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb://test:test@localhost:27017/meetups?authSource=admin`
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // specifies if we have all the paths covered or not. Here we have set it to false so if we return id other than the ones specified in the path 404 page will be rendered. If true, nextjs will try to generate the page for new id
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps({ params }) {
  const meetupId = params.meetupId;

  const client = await MongoClient.connect(
    `mongodb://test:test@localhost:27017/meetups?authSource=admin`
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
