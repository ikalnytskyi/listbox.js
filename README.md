# Listbox.js

**Listbox.js** is a simple JavaScript component that provides a more powerful
alternative to the standard ``<select>`` tag. The main problem of ``<select``
tag is that last one isn't flexible for customization with *CSS*. Listbox.js
solves this problem. This component runs on top of ``<select>`` tag and
creates an alternative to the last one based on ``<div>`` tags. It opens up
great possibilities for customization.

In addition, this component provides the search bar which would be useful in
lists with a lot of items.

This component was born special for [xsnippet](http://www.xsnippet.org/)
project.

> **NOTE:** Listbox.js depends on [jQuery](http://jquery.com/)


## Usage

Link the component and a stylesheet from your page.

```html
<link href="styles/listbox.css" rel="stylesheet">
<script src="js/jquery.min.js"></script>
<script src="js/listbox.js"></script>
```

Create Listbox object.

```html
<script>
    $(function() {
        var listbox = new Listbox({
            parent: $('#someId'),   // <select> element
            class: 'myOwnClass',    // a class which will be added to your list
            withSearchbar: true,    // use searchbar
            multiselect: false      // is list multiselect or not?
        })
    });
</script>

<select id="someId">
  <option>Item #1</option>
  <option>Item #2</option>
  <option>Item #3</option>
  <option>Item #4</option>
</select>
```


## Customization

Listbox.js uses following *CSS* classes.

```css
/* <div>: component container */
.lbjs {}

/* <div>: container for list items */
.lbjs-list {}

/* <div>: list item */
.lbjs-item {}

/* <input>: search query input */
.lbjs-searchbar {}
```


## Meta

* Author: Igor Kalnitsky <igor@kalnitsky.org>
* Version: 0.1
