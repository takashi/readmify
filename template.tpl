# <%= name %>
<% if(travisUrl){ %>[![Build Status](<%= travisUrl.replace('//', '//secure.') %>.png?branch=master)](<%= travisUrl %>)<% } %>

<%= description %>

<% if(scripts.build){ %>## Build

```shell
<% if(repository) { %>git clone <%= repository.url %><% } %>
cd ./<%= name %>
npm install
npm run build
```
Inside, you will run with `<%= scripts.build %>`<% } %>
<% if(scripts.test){  %>## Test

```shell
npm install
npm run test
```
Inside, you will run with `<%= scripts.test %>`<% } %>

## Dependencies
<% for(d in dependencies){ %>
- <%= d %><% } %>

## Contributing

Fork, fix, then send me a pull request.
<% if(bugs){  %>If your find any problem on <%= name %>, [please open issue](<%= bugs.url %>)<% } %>

## License

<% if(license) { %><%= license %><% } %>