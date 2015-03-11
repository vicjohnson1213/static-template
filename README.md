# static-template

>An Express middleware to serve the contents a directory through a templating engine

## Getting Started

You can install the module using the following command:

```shell
npm install static-template --save
```

## Usage

```js
var staticTemplate = require('static-template');
var express = require('express');
var app = express();

app.set('view engine', 'jade');

app.use('/', staticTemplate.staticTemplate('public/views'));

//If rendering fails, express will move on to the next middleware.
app.use('/', function(req, res, next) {
    res.status(404);
    res.render('404');
});
```

## Options
You can pass options to the middleware like this:
```js
app.use('/', staticTemplate.staticTemplate('public/views', {
    serveDirs: false,
    templateOpts: {
        title: 'title for the view',
        message: 'message for the view'
    }
}));
```

#### serveDirs: Boolean (default: true)
If serveDirs is **true**, static-serve will check for an `index` file inside a directory with the requested path if the first page render fails.

#### templateOpts: Object (default empty)
This object will be sent to the templating engine in the `render` calls.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## License

MIT