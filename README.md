# static-template

>An Express middleware to serve the contents a directory through a templating engine

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install static-template --save
```

## Usage

To use static-template you must first require the module in the file running your express server.  You can then specify the express route and the directory of the views.  If no views directory is specified, the middleware will look in the `views` directory.

The second parameter to the staticTemplate is for any options.  Options to be sent to your templates should be put in the `templateOpts` property.

```js
staticTemplate = require('static-template');
app.use('/route/to/use', staticTemplate.staticTemplate('path/to/views'));
```

Any asset directories should be designated static using express' built in static middleware.

```js
app.use('/route/to/asset', express.static('/path/to/assets'));
```

If rendering fails, express will move on to the next middleware.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## License

MIT