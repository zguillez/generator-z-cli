#! /usr/bin/env node
/* eslint no-unused-vars: "off", no-restricted-modules: "off" */
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const replace = require('replace');
const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.sshconfig'), 'utf8'));
// -----------------------------------
replace({
  regex: '{site}',
  replacement: config.domain,
  paths: ['package.json'],
  silent: true
});
console.log(`=> Done!\n`.green);
