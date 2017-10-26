'use strict';
var path = require('path');
var helpers = require('yeoman-test');

describe('generator-z-cli:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true});
  });
});
