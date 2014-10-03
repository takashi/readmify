#!/usr/bin/env node
'use strict'

/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path');
var program = require('commander');
var multiline = require('multiline');
var _ = require('underscore');
var iconv = require('iconv-lite');
var extend = require('node.extend');
var gh = require("github-url-to-object");

// Set underscore.template options.
_.options = {
  matcher: /<%%([^%]+)%>/g,
  detecter: /<%%?[^%]+%>/,
  start: '<%',
  end: '%>'
};

var defaultParameters = {
  name: '',
  description: '',
  repository: {url: '', type: ''},
  scripts: {build: '', test: ''},
  dependencies: {},
  devDependencies: {},
  bugs: '',
  travisUrl: '',
  license: ''
}

program
  .version('0.0.0')
  .option('-t, --travis', 'add travis badge (default: false)', false)
  .option('-f, --file <type>', 'location of package.json', 'package.json');

program.on('--help', function() {
  console.log(multiline(function(){/*
  Examples:

    $ readmify --travis > README.md
    $ readmify --file path/to/package.json > README.md

  */}));
});

program.parse(process.argv);

var packageFile = program.file
var pkgPath = path.resolve(process.cwd(), packageFile)
try {
  var pkgJson = require(pkgPath);
} catch(e) {
  return console.error('Can\'t load ' + pkgPath + '. please check your json syntax.');
}

pkgJson = extend(true, defaultParameters, pkgJson);

if(program.travis){
  if(pkgJson.repository.url && gh(pkgJson.repository.url)){
    pkgJson.travisUrl = gh(pkgJson.repository.url).travis_url
  }else{
    return console.error('You must set repository.url option in your package.json with --travis option');
  }
}

var tpl = path.resolve(process.cwd(), 'template.tpl');
var body = _.template(readFile(tpl))(pkgJson);

process.stdout.write(body)

function readFile(filepath) {
  var contents;
  try {
    contents = fs.readFileSync(String(filepath));
    contents = iconv.decode(contents, 'utf8');
    if (contents.charCodeAt(0) === 0xFEFF) {
      contents = contents.substring(1);
    }
    return contents;
  } catch (e) {
    throw new Error('Unable to read "' + filepath + '" file (Error code: ' + e.code + ').');
  }
}
