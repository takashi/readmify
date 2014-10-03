"use strict";

var nixt = require("nixt");


describe('readmify', function() {
  it('generates markdown from package.json', function(done) {
    nixt()
      .run('./index.js --file test/fixtures/package.json')
      .stdout(/# sample/)
      .end(done);
  });

  it('fails with invalid syntax JSON file', function(done) {
    nixt()
      .run('./index.js --file test/fixtures/invalid.json')
      .stderr(/please check your json syntax./)
      .end(done);
  });
});

describe('readmify --travis', function() {
  it('generates travis badge with repository.url', function(done) {
    nixt()
      .run('./index.js --file test/fixtures/package.json --travis')
      .stdout(/[![Build Status]/)
      .end(done);
  });

  it('fails if repository.url is missing', function(done) {
    nixt()
      .run('./index.js --file test/fixtures/without.repourl.json --travis')
      .stderr(/You must set repository.url option in your package.json with --travis option/)
      .end(done);
  })
})
