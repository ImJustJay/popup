const { Pool } = require('pg');
//connect to pg database

//client or pool ----- client only makes one connect at once
const uri = 'postgres://whznpqqr:jnYpb12XBSAxEFih-y0TiPFpBCV-NIUu@raja.db.elephantsql.com:5432/whznpqqr';

/**
 * using a pool gives us access to a pool of clients,
 * as opposed to a single client;
 * we avoid major pitfalls, e.g. having too many clients
 * trying to connect to the server which will crash it
 * and being forced to perform queries serially
 */
const pool = new Pool({ connectionString: uri });

pool
  .connect()
  // .then(client => client.query('CREATE EXTENSION pgcrypto'))
  .then(client => client
    .query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY NOT NULL,
      first_name VARCHAR (255) NOT NULL,
      last_name VARCHAR (255) NOT NULL,
      email VARCHAR (255) NOT NULL,
      password VARCHAR (255) NOT NULL,
      role VARCHAR (255) NOT NULL
    )`)
    .then(() => client.query(`CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY NOT NULL,
      title VARCHAR (255) NOT NULL,
      description VARCHAR (500) NOT NULL,
      max_attendees INTEGER NOT NULL,
      host INTEGER REFERENCES users(id) NOT NULL,
      location VARCHAR (255) NOT NULL,
      cuisine_type VARCHAR (255) NOT NULL,
      rating INTEGER,
      start TIME WITH TIME ZONE NOT NULL,
      "end" TIME WITH TIME ZONE NOT NULL,
      date DATE NOT NULL,
      price NUMERIC (6, 2) NOT NULL
    )`))
    .then(() => client.query(`CREATE TABLE IF NOT EXISTS user_events (
        id SERIAL PRIMARY KEY NOT NULL,
        user_id INTEGER REFERENCES users(id),
        event_id INTEGER REFERENCES events(id)
      )`))
    .then(() => client.release())
    .catch((e) => {
      client.release();
      console.log(e.stack);
    }))
  .catch(e => console.log(e.stack));

/**
 * In order to prevent leaking clients, we will export methods
 * to use on our pool; this will help facilitate debugging
 * the entire pool and will not affect our functionality otherwise
 */

module.exports = {
  //we can find where the error is within the query rather than going into pool
  query: (queryObj) => pool.query(queryObj),
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      callback(err, client, done);
    });
  },
};
