#! /usr/bin/env node
/* eslint no-unused-vars: "off", no-restricted-modules: "off" */
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const colors = require('colors');
const rexec = require('remote-exec');
const mysql = require('mysql');
const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.sshconfig'), 'utf8'));
const options = {
  host: config.database.host,
  user: config.database.username,
  password: config.database.password,
  database: config.database.database
};
let connection;
// -----------------------------------
const queryError = (err, query) => {
  console.log(`Error while performing Query:`.red);
  console.log(`${query}`.yellow);
  console.log(`${err}`.red);
  connection.end();
};
const queryHelper = (query, index, data) => {
  query[index] = query[index].replace('%LEAD_ID%', data.id);
  return query;
};
// -----------------------------------
const queriesExecute = (q, index = 0) => {
  connection = mysql.createConnection(options);
  let queries = q;
  new Promise((resolve, reject) => {
    console.log(`${queries[index]}`.yellow);
    connection.query(queries[index], (err, row) => {
      if (err) {
        reject(err);
      } else {
        console.log(`done!`.green);
        resolve(row);
      }
    });
  })
    .then(data => {
      if (index < queries.length - 1) {
        index++;
        queryHelper(queries, index, {id: data.insertId});
        queriesExecute(queries, index);
      } else {
        connection.end();
      }
    })
    .catch(err => {
      queryError(err, queries[index]);
    });
};
const queryExecute = q => {
  connection = mysql.createConnection(options);
  return new Promise((resolve, reject) => {
    new Promise((resolve, reject) => {
      console.log(`${q}`.yellow);
      connection.query(q, (err, row) => {
        if (err) {
          reject(err);
        } else {
          console.log(`done!`.green);
          // Console.log(row);
          resolve(row);
        }
      });
    })
      .then(data => {
        connection.end();
        resolve(data);
      })
      .catch(err => {
        queryError(err, q);
      });
  });
};
// -----------------------------------
exports.query = queryExecute;
exports.queries = queriesExecute;
