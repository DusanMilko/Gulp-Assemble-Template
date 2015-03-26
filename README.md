# Static Builder

A light static site builder using handlebars, gulp, browserify, sass, json.


Tasks:

gulp build - cleans and builds everything into build folder

gulp clean - cleans build folder

gulp css - compile scss to css

gulp js - compile js with browserify

gulp pages - generate all pages

gulp todo - go through and generate todo's based off of comments "//TODO:"

gulp watch - look for changes in src/pages|scss|js


Folder Structure

```
└── src
  ├── assets
  │    ├── imgs
  │    │   └── *.*
  │    ├── js
  │    │   ├── libs
  │    │   ├── app
  │    │   └── main.js
  │    └── scss
  │        ├── libs
  │        ├── partials
  │        ├── main.scss
  │        └── _*.scss
  ├── data
  │   └── *.{json,yml}
  ├── docs
  │   └── *.md
  ├── partials
  │   └── *
  │       └── *.{hbs,html,php}
  └── views
      ├── layouts
      │   └── default.{hbs,html,php}
      └── pages
          └── index.{hbs,html,php}
```
