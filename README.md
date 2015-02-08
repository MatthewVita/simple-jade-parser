#Simple-Jade-Parser
Simple-Jade-Parser is a convenience library that makes working with Jade even easier. It serves as the sole reference point for rendering Jade files with a simple API that uses promises, has great error handling, and helps with "fractal design" in frameworks like Express as opposed to having a single `views/` directory.

##Usage

#### Basic Example
```javascript
var simpleJadeParser = require('simple-jade-parser');

simpleJadeParser({
    file: './foo.jade',
    data: {
        bar: 'baz',
        bop: [{a: 2, b: 3}, {a: -1, b: 5}]
    }
}).then(function(html) {
    console.log(html);
}).catch(function(err) {
    console.error(err);
});
```

#### More Interesting Example
```javascript
var express = require('express');
var app = express();
var simpleJadeParser = require('simple-jade-parser');

app.get('/zoo/animals/:type', function(req, res) {
    simpleJadeParser({
        file: './zoo/animals/template.jade',
        data: {
            type: req.params.type
        }
    }).then(function(html) {
        res.status(200).send(html);
    }).catch(function(err) {
        res.status(500).send();
        console.error(err);
    });
});

var server = app.listen(3000);
```

##License
MIT