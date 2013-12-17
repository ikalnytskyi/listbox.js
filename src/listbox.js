/**
 * Listbox.js is a simple jQuery plugin that provides a more powerful
 * alternative to the standard `<select>` tag.
 *
 * The main problem of <select> tag is that last one isn't flexible for
 * customization with CSS. Listbox.js solves this problem. This component
 * runs on top of <select> tag and creates an alternative to the last one
 * based on <div> tags. It opens up great possibilities for customization.
 *
 * @copyright   (c) 2012, Igor Kalnitsky <igor@kalnitsky.org>
 * @version     0.3.0-dev
 * @license     BSD
 */

(function ($) {
    'use strict';


    // CSS classes used by Listbox.js
    var MAIN_CLASS      = 'lbjs';
    var LIST_CLASS      = 'lbjs-list';
    var LIST_ITEM_CLASS = 'lbjs-item';
    var SEARCHBAR_CLASS = 'lbjs-searchbar';



    /**
     * Inherit the prototype methods from one constructor into another.
     * The prototype of `constructor` will be set to a new object created
     * from `superConstructor`.
     *
     * As an additional convenience, `superConstructor` will be accessible
     * through the `constructor.super_` property.
     */
    function inherits(constructor, superConstructor) {
        constructor.prototype = Object.create(superConstructor.prototype);
        constructor.prototype.constructor = constructor;
        constructor.prototype.super_ = superConstructor;
    }



    /**
     * Create an instance of Listbox. The constructor makes div-based
     * listbox alternative for the sandard's `<select>` tag, hide parent
     * element and place the alternative on the parent place.
     *
     * @constructor
     * @this {Listbox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    function Listbox(domelement, options) {
        var settings = $.extend({
            'class':      null,
            'searchbar':  false
        }, options);

        this._parent   = domelement;
        this._settings = settings;

        this._createListbox();                // create a fake listbox
        this._parent.css('display', 'none');  // hide a parent element
    }



    /**
     * Creates a `div`-based listbox, which includes such things as
     * container, listbox itself and searchbar as an optional element.
     *
     * @private
     * @this {Listbox}
     */
    Listbox.prototype._createListbox = function () {
        this._listbox = $('<div>')
            .addClass(MAIN_CLASS)
            .addClass(this._settings['class'])
            .insertAfter(this._parent)
        ;

        if (this._settings.searchbar)
            this._createSearchbar();
        this._createList();
    };

    /**
     * Creates a Listbox's searchbar.
     *
     * @private
     * @this {Listbox}
     * @TODO: critical to rewrite this piece of shit
     */
    Listbox.prototype._createSearchbar = function () {
        // searchbar wrapper is needed for properly stretch
        // the seacrhbar over the listbox width
        var searchbarWrapper = $('<div>')
            .addClass(SEARCHBAR_CLASS + '-wrapper')
            .appendTo(this._listbox);

        var searchbar = $('<input>')
            .addClass(SEARCHBAR_CLASS)
            .appendTo(searchbarWrapper)
            .attr('placeholder', 'search...');

        // set filter handler
        var self = this;
        searchbar.keyup(function () {
            var searchQuery = $(this).val().toLowerCase();

            if (searchQuery !== '') {
                // hide list items which are not matched search query
                self._list.children().each(function (index) {
                    var text = $(this).text().toLowerCase();

                    if (text.search('^' + searchQuery) != -1) {
                        $(this).css('display', 'block');
                    } else {
                        $(this).css('display', 'none');
                    }
                });
            } else {
                // make visible all list items
                self._list.children().each(function () {
                    $(this).css('display', 'block');
                });
            }

            // @hack: call special handler which is used only for SingleSelectListbox
            //        to prevent situation when none of items are selected
            if (self.onFilterChange) {
                self.onFilterChange();
            }
        });

        // save for using in _resizeListToListbox()
        this._searchbarWrapper = searchbarWrapper;
    };


    /**
     * Creates a listbox itself.
     *
     * @private
     * @this {Listbox}
     */
    Listbox.prototype._createList = function () {
        // create container
        this._list = $('<div>')
            .addClass(LIST_CLASS)
            .appendTo(this._listbox);

        this._resizeListToListbox();

        // create items
        var self = this;
        this._parent.children().each(function () {
            self.addItem($(this));
        });
    };




    /**
     * Add item to the listbox.
     *
     * @this {Listbox}
     * @param {object} parentItem DOM element of the parent options
     */
    Listbox.prototype.addItem = function (parentItem) {
        var self = this;
        var item = $('<div>')
            .addClass(LIST_ITEM_CLASS)
            .appendTo(this._list)
            .text(parentItem.text())
            .click(function () {
                self.onItemClick($(this));
            });

        if (parentItem.attr('disabled'))
            item.attr('disabled', '');

        if (parentItem.attr('selected'))
            this.onItemClick(item);
    };




    /**
     * Remove item from the listbox.
     *
     * @this {Listbox}
     * @param {object} parentItem DOM element of the parent options
     */
    Listbox.prototype.removeItem = function (parentItem) {
        // @todo: implement
    };




    /**
     * Resize list to lisbox. It's a small hack since I can't
     * do it with CSS.
     *
     * @private
     */
    Listbox.prototype._resizeListToListbox = function () {
        var listHeight = this._listbox.height();

        if (this._settings.searchbar)
            listHeight -= this._searchbarWrapper.outerHeight(true);

        this._list.height(listHeight);
    };




    /**
     * Create an instance of SingleSelectListbox.
     *
     * Inherit a {Listbox} class.
     *
     * @constructor
     * @this {SingleSelectListbox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    function SingleSelectListbox(domelement, options) {
        this.super_.call(this, domelement, options);

        // select first item if none selected
        if (!this._selected)
            this.onItemClick(this._list.children().first());
    }
    inherits(SingleSelectListbox, Listbox);


    /**
     * Reset all items and select a given one.
     *
     * @this {SingleSelectListbox}
     * @param {object} item a DOM object
     */
    SingleSelectListbox.prototype.onItemClick = function (item) {
        if (item.attr('disabled')) return;

        // select a fake item
        if (this._selected)
            this._selected.removeAttr('selected');
        this._selected = item.attr('selected', '');

        // select a real item
        var itemToSelect = $(this._parent.children().get(item.index()));
        this._parent.val(itemToSelect.val());

        this._parent.trigger('change');
    };


    /**
     * Select first visible item if none selected.
     *
     * @this {SingleSelectListbox}
     */
    SingleSelectListbox.prototype.onFilterChange = function () {
        if (!this._selected || !this._selected.is(':visible'))
            this.onItemClick(this._list.children(':visible').first());
    };




    /**
     * Create an instance of MultiSelectListbox.
     *
     * Inherit a {Listbox} class.
     *
     * @constructor
     * @this {MultiSelectListbox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    function MultiSelectListbox(domelement, options) {
        this.super_.call(this, domelement, options);
    }
    inherits(MultiSelectListbox, Listbox);




    /**
     * Toggle item status.
     *
     * @this {MultiSelectListbox}
     * @param {object} item a DOM object
     */
    MultiSelectListbox.prototype.onItemClick = function (item) {
        if (item.attr('disabled')) return;

        var parentItem = $(this._parent.children().get(item.index()));
        var parentValue = this._parent.val();

        if (item.attr('selected')) {
            item.removeAttr('selected');

            var removeIndex = parentValue.indexOf(parentItem.val());
            parentValue.splice(removeIndex, 1);
        } else {
            item.attr('selected', '');

            if (!parentValue)
                parentValue = [];
            parentValue.push(parentItem.val());
        }

        this._parent.val(parentValue);
        this._parent.trigger('change');
    };




    /**
     * jQuery plugin definition. Please note, that jQuery's `each()` method
     * returns `false` to stop iteration; otherwise it should return `true`.
     *
     * @param {object} options an object with Listbox settings
     */
    $.fn.listbox = function (options) {
        return this.each(function () {
            if ($(this).attr('multiple'))
                return !!new MultiSelectListbox($(this), options);
            return !!new SingleSelectListbox($(this), options);
        });
    };
})(jQuery);
