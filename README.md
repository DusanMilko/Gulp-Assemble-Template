# Static Builder

A light scaffold to build static sites using assemble, handlebars, gulp, browserify, sass, json.


### Tasks:

**gulp build** - cleans and builds everything into build folder

**gulp clean** - cleans build folder

**gulp css** - compile scss to css

**gulp js** - compile js with browserify

**gulp assemble** - generate all pages

**gulp fonts** - cmove fonts to build folder

**gulp todo** - go through and generate todo's based off of comments "//TODO:"

**gulp watch** - look for changes in src/pages|scss|js


### Folder Structure

```
└── src
  ├── assets
  │    ├── fonts
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
  └── views
      ├── partials
      │   └── *.{hbs,html,php}
      ├── layouts
      │   └── default.{hbs,html,php}
      └── pages
          └── index.{hbs,html,php}
```

## Markup

Declare array 

---
arr:
- {"a":"b"}

this.arr.[0] // {"a","b"}

---


Call Partial

{{>nav }}

Pass current page variable into partial

{{>nav this}}

Pass global data variable into partial 

{{>nav site}}

Pass inline variable

{{>nav key="value"}}