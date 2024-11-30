// All the files in pages/api will be used to create routes
// Url will be /api/new-meetup

import { MongoClient } from 'mongodb'

// Code will not be there in client side build
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // Command to run mongodb docker container temporarily
    // docker run --name mongodb-test -e MONGO_INITDB_ROOT_USERNAME=test -e MONGO_INITDB_ROOT_PASSWORD=test -p 27017:27017 --rm mongo:latest

    // Command to connect to the mongo shell
    // Connect to container
    // docker exec -it mongodb-test bash

    // Within container
    // apt-get update && apt-get install -y curl
    // echo "deb [arch=amd64] https://repo.mongodb.org/apt/debian stretch/mongodb-org/6.0 main" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    // curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | tee /etc/apt/trusted.gpg.d/mongodb.asc
    // apt-get update && apt-get install -y mongodb-mongosh
    // mongosh -u test -p test --authenticationDatabase admin

    // ideally use .env but good for test
    const client = await MongoClient.connect(
      `mongodb://test:test@localhost:27017/meetups?authSource=admin`
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}
