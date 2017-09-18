#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const shell = require('shelljs');
const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.sshconfig'), 'utf8'));
//-----------------------------------
let command = `sshpass -p ${config.password} scp -r ${config.local}* ${config.username}@${config.ip}:${config.remote}`;
console.log(`=> Command: ${command}`.cyan);
shell.exec(command);
console.log(`=> Done!\n`.green);