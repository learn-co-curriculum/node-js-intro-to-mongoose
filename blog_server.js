"use strict";

const _            = require('lodash');
const express      = require('express');
const bodyParser   = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dbName = process.env.NODE_ENV ? 'learnco_blog_test' : 'learnco_blog';
console.log('Using database: ', dbName);

// ***** Knex & Bookshelf Configuration ***** //

const knex = require('knex')({
  client: 'pg',
  connection: {
    database: dbName
  },
  debug: true
});

const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
});

const bookshelf = require('bookshelf')(knex);



// ***** Schema Helper Functions ***** //

const setupSchema = () => {
  // This function should return a Promise
  // that builds your schema using knex.
};

const destroySchema = () => {
  // This function should return a Promise that
  // destroys your schema using knex.
};


// ***** Module Exports ***** //

const listen = (port) => {
  return new Promise((resolve, reject) => {
    app.listen(port, () => {
      resolve();
    });
  });
};

const up = (justBackend) => {
  justBackend = _.isUndefined(justBackend) ? false : justBackend;
  return setupSchema().then(() => {
    console.log('Done building schema...');
  }).then(() => {
    if(justBackend)
      return;
    return listen(3000);
  }).then(() => {
    console.log('Listening on port 3000...');
  }).catch((error) => {
    console.error(error);
  });
};

const tearDown = () => {
  if(!process.env.TESTING)
    return;
  return destroySchema().then(() => {
    console.log('Schema destroyed.');
  }).catch((error) => {
    console.error(error);
  });
};

module.exports = {
//  'User': User,
//  'Posts': Posts,
//  'Comments': Comments,
  'up': up,
  'tearDown': tearDown
};
