# Static Builder

A light scaffold to build static sites using assemble, gulp, browserify, sass, handlebars, and json.

All the files you edit go into **src** and get compiles into **build**

## Setup

NPM is required to be installed.

Run `npm install` after clone to download gulp and other required modules.


### Tasks:

**gulp build** - cleans and builds everything into build folder

**gulp clean** - cleans build folder

**gulp css** - compile scss to css

**gulp js** - compile js with browserify

**gulp assemble** - generate all pages

**gulp fonts** - move fonts to build folder

**gulp todo** - go through and generate todo's based off of comments "//TODO:"

**gulp watch** - look for changes in src/pages|scss|js

**gulp iconfont** - generate icon font


### Folder Structure

```
└── src
  ├── assets
  │    ├── fonts
  │    ├── icons
  │    │   ├── _icon-font.css (icon font template)
  │    │   └── svgs
  │    │        └── *.svg
  │    ├── imgs
  │    │   └── *.*
  │    ├── js
  │    │   ├── libs
  │    │   ├── app
  │    │   ├── templates
  │    │   └── main.js
  │    └── scss
  │        ├── libs
  │        ├── partials
  │        ├── elements
  │        ├── main.scss
  │        └── _*.scss
  ├── data
  │   └── *.{json,yml}
  ├── helpers
  │   └── *.js
  └── views
      ├── docs
      │   └── *.{hbs,html,php}
      ├── partials
      │   └── *.{hbs,html,php}
      ├── layouts
      │   └── default.{hbs,html,php}
      └── pages
          └── index.{hbs,html,php}
```

### Pages

All the files in **pages** folder are used to generate static pages.
These files in pages should contain the core content of the page.
The layout files will contain the major layout and are refrenced to by front matter(more on that below)
Pages can also load partials anywhere in the page


##### Front matter

Pages can use YAML front matter as shown below or call a variable from a data.json file in the **data** folder, for things like the layout.

```
---
layout: 'default'
title: 'site'
arr:
- {"a":"b"}
---

this.arr.[0] // {"a","b"}

```

##### Loading partial

```
{{>nav }}

with current front matter
{{>nav this}}

with custom variable
{{>nav key="value"}}

with global data variable
{{>nav site}}

with custom json
{{#parseJSON '{
  "a": "b",
  "c": "d"
}'}}
{{> nav }}
{{/parseJSON}}

```

### SCSS

All scss goes into the "src/assets/scss/" 

All scss goes into the "src/assets/scss/libs"  

### JS

Using Browserify for JS

All js goes into the "src/assets/js/app"
Refrence js in the main.js file located in "src/assets/js/" 

All libraries goes into the "src/assets/js/libs"  

If you do any js templating put that into "src/assets/js/templates/"

### Icon Font

Put svg files into "src/assets/icons" 
Then run **gulp iconfont** to generate font and matching scss file


