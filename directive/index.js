'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askFor = function askFor() {
  var done = this.async();
  this.dir = path.join(this.config.get('directiveDirectory'), this.name);
  var prompts = [
    {
      type:'confirm',
      name: 'complex',
      message: 'Does this directive need an external html file?',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.complex = props.complex;
    done();
  }.bind(this));
};

Generator.prototype.createFiles = function createFiles() {
  var configName = 'directiveSimple';
  var templateDir = path.join(this.sourceRoot(), 'directiveSimple');
  if (this.complex) {
    configName = 'directiveComplex';
    templateDir = path.join(this.sourceRoot(), 'directiveComplex');
  }

  this.htmlPath = this.dir + this.name + '.html';
  ngUtil.copyTemplates(this, 'directive', templateDir, configName);
};
