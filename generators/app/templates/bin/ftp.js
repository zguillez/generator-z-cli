#! /usr/bin/env node
/* eslint no-unused-vars: "off", no-restricted-modules: "off" */
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const EasyFtp = require('easy-ftp');
const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.sshconfig'), 'utf8'));
const ftp = new EasyFtp();
// -----------------------------------
ftp.connect(config.ftp);
let files = [];
if (argv.lite) {
  files = [
    `${config.ftp.local}.htaccess`, `${config.ftp.local}index.php`, `${config.ftp.local}inc`
  ];
} else {
  files = [
    `${config.ftp.local}.htaccess`, `${config.ftp.local}index.php`, `${config.ftp.local}inc`, `${config.ftp.local}static` // , `${config.ftp.local}vendor`, `${config.ftp.local}logs`
  ];
}
ftp.upload(files, config.ftp.remote, err => {
  if (err) {
    console.log(`${err}\n`.red);
  } else if (argv.lite) {
    files = [
      `${config.ftp.local}static/styles.min.css`, `${config.ftp.local}static/scripts.min.js`
    ];
    ftp.upload(files, `${config.ftp.remote}static/`, err => {
      if (err) {
        console.log(`${err}\n`.red);
      } else {
        console.log(`=> Done!\n`.green);
      }
      ftp.close();
    });
  } else {
    console.log(`=> Done!\n`.green);
    ftp.close();
  }
});

