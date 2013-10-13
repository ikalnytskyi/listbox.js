Listbox.js
==========

:Author:   `Igor Kalnitsky <igor@kalnitsky.org>`_
:License:  `BSD 3-clause`_
:Version:  0.3.0-dev
:Tests:    |travis|


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

    <!-- make sure that jQuery is already included -->
    <script src="/path/to/jquery.js"></script>

    <!-- include listbox plugin and default stylesheet -->
    <link href="/path/to/listbox.css" rel="stylesheet">
    <script src="/path/to/listbox.js"></script>


Create Listbox object.

.. code:: html

    <select>
      <option>Item #1</option>
      <option>Item #2</option>
      <option>Item #3</option>
      <option>Item #4</option>
    </select>

    <script>
        $(function() {
            $('select').listbox({
                'class':      'myOwnClass',
                'searchbar':  true
            });
        });
    </script>


Customization
-------------

Listbox.js uses following ``CSS`` classes.

.. code:: css

    .lbjs {}                        /* <div>: component container */
    .lbjs-list {}                   /* <div>: container for list items */
    .lbjs-item {}                   /* <div>: list item */
    .lbjs-item:not([disabled]) {}   /* <div>: enabled list item */
    .lbjs-item[disabled] {}         /* <div>: disabled list item */
    .lbjs-item[selected] {}         /* <div>: selected list item */
    .lbjs-searchbar {}              /* <input>: search query input */


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
      });



.. _BSD 3-clause: http://raw.github.com/ikalnitsky/listbox.js/master/LICENSE
.. _XSnippet:     http://xsnippet.org/

.. |travis| image:: https://travis-ci.org/ikalnitsky/listbox.js.png?branch=master
