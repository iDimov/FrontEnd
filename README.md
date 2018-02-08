A sensible baseline for simple web projects using [HTML5](https://github.com/h5bp/html5-boilerplate), [SASS](http://sass-lang.com/), [Bourbon](http://bourbon.io/), [Neat](http://neat.bourbon.io/), and [Gulp](http://gulpjs.com/).

### Production Features:
* HTML minification
* Script concatenation, uglifying, and sourcemapping
* CSS minification and concatenation
* Image optimization

### Getting Started

```
$ npm i
$ npm run dev 
$ npm run prod 

```

## Usage:
---
**IMPORTANT:** New files and edits to existing files should take place only within the app folder. Files in the .tmp and public folders are autmatically generated and will be overwritten when the gulp tasks are run.

### Production Build Instructions:
1. When you are ready to create project files that are ready for a production environment, run the `gulp prod` task.
2. Once this process completes, the public folder will contain production-ready files.

More info https://github.com/demersdesigns/baseplate