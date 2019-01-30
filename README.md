# uqlibrary-computers

[![Codeship Status for uqlibrary/uqlibrary-computers](https://app.codeship.com/projects/f20138c0-899d-0132-b6ff-4635861fb902/status?branch=polymer1.0)](https://codeship.com/projects/59767)
[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-computers.svg)](https://david-dm.org/uqlibrary/uqlibrary-computers)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-computers/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-computers?type=dev)

uqlibrary-computers displays academic computers to the end user

For full documentation and demo, see [GH Pages](http://uqlibrary.github.io/uqlibrary-computers/uqlibrary-computers/).

In the demo, the map of computers is only visible (due to limited mock data) for "Biological Sciences Library" > "Level 1" & "Level 2".

## Dev Setup

Java 8 is required, as are `node` and `npm`. Check `package.json` for required versions.

```bash
npm install -g gulp-cli bower web-component-tester polymer-cli
npm install
bower install
```

## Developing

* Please adhere to the Polymer code style guide provided at [Style Guide](http://polymerelements.github.io/style-guide/).
* Colors and common styles are imported (bower install) from [uqlibrary-styles](http://github.com/uqlibrary/uqlibrary-styles).
* A preview of the component can be viewed locally by running `npm start`. Use the second URL from the command output.
* GitHub pages should be updated after every commit to `polymer1.0` branch by running `bin/generate-gh-pages.sh`

## Testing

Run `npm test` to run local tests with Web Component Tester.
