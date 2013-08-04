Listbox.js
==========

**Listbox.js** is a simple jQuery plugin that provides a more powerful
alternative to the standard ``<select>`` tag. The main problem of ``<select``
tag is that last one isn't flexible for customization with *CSS*. Listbox.js
solves this problem. This component runs on top of ``<select>`` tag and
creates an alternative to the last one based on ``<div>`` tags. It opens up
great possibilities for customization.

In addition, this component provides the search bar which would be useful in
lists with a lot of items.

This component was born special for XSnippet_ project.

    **NOTE:** This is my first JavaScript code. So don't judge strictly.


Usage
-----

Link the component and a stylesheet from your page.

.. code:: html

    <link href="styles/jquery.listbox.css" rel="stylesheet">
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.listbox.js"></script>


Create Listbox object.

.. code:: html

    <script>
        $(function() {
            $('select').listbox({
                'class':        'myOwnClass',
                'searchbar':    true,
                'multiselect':  false
            })
        })
    </script>

    <select>
      <option>Item #1</option>
      <option>Item #2</option>
      <option>Item #3</option>
      <option>Item #4</option>
    </select>


Customization
-------------

Listbox.js uses following ``CSS`` classes.

.. code:: css

    /* <div>: component container */
    .lbjs {}

    /* <div>: container for list items */
    .lbjs-list {}

    /* <div>: list item */
    .lbjs-item {}

    /* <div>: enabled list item */
    .lbjs-item:not([disabled]) {}

    /* <div>: disabled list item */
    .lbjs-item[disabled] {}

    /* <div>: selected list item */
    .lbjs-item[selected] {}

    /* <input>: search query input */
    .lbjs-searchbar {}


FAQ
---

- **How to bind event handler to the `click` list item event?**

  Because of Listbox.js dynamically changes DOM you should use jQuery's
  ``live()`` method:

  .. code:: js

      $('.myListboxClass .lbjs-item').live('click', function() {
          alert($(this).html());
      });

- **How to make disabled item?**

  The process is similar to making disabled items in the ``<select>``-tag.
  All you need is to set the ``disabled`` attribute.

  .. code:: js

      $('.myOwnClass .lbjs-item').each(function () {
          var value = $(this).html();

          if (['PHP', 'JavaScript'].indexOf(value) != -1)
              $(this).attr('disabled', '');
      })

Meta
----

* Author: Igor Kalnitsky <igor@kalnitsky.org>
* Version: 0.1.3


.. _XSnippet: http://xsnippet.org/
