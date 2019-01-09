# uqlibrary-computers

[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-computers.svg)](https://david-dm.org/uqlibrary/uqlibrary-computers)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-computers/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-computers?type=dev)

uqlibrary-computers displays academic computers to the end user

Documentation can be found in [GitHub Pages](http://uqlibrary.github.io/uqlibrary-computers/uqlibrary-computers/demo/).

## Dev Setup

Java 8 is required, as are `node` and `npm`. Check `package.json` for required versions.

```bash
npm install -g gulp-cli web-component-tester bower
npm install
bower install
```

## Developing

* Please adhere to the Polymer code style guide provided at [Style Guide](http://polymerelements.github.io/style-guide/).
* Colors and common styles are imported (bower install) from [uqlibrary-styles](http://github.com/uqlibrary/uqlibrary-styles).
* GitHub pages should be updated after every commit to `polymer1.0` branch by running `bin/generate-gh-pages.sh`

## Testing

Run `npm test` to run local tests with `web-component-tester`. You can also run `wct` directly.
