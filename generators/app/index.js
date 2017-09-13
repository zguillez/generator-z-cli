'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
module.exports = class extends Generator {
  prompting() {
    this.log(yosay('Welcome to the zetadelic ' + chalk.red('generator-z-cli') + ' generator!'));
    /*const prompts = [{
     type: 'confirm',
     name: 'someAnswer',
     message: 'Would you like to enable this option?',
     default: true
     }];*/
    const prompts = [
      {
        type: 'text',
        name: 'name',
        message: 'Which is the app name?',
        default: 'myapp'
      }, {
        type: 'list',
        name: 'framework',
        message: 'Which Javascript framework you want to use?',
        choices: ['Angular', 'Ionic', 'Polymer', 'ReactJS', 'Vue']
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath(`package-${this.props.framework.toLowerCase()}.json`), this.destinationPath('package.json'), {name: this.props.name});
    if(this.props.framework === 'ReactJS') {
      this.fs.copy(this.templatePath(`.eslintrc-${this.props.framework.toLowerCase()}`), this.destinationPath('.eslintrc'), {name: this.props.name});
    }
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true,
      callback: () => {
        console.log(chalk.green('=> Everything is ready!'));
      }
    });
  }
};
