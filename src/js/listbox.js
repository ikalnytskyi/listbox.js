/**
 * Listbox.js is a simple jQuery plugin that provides a more powerful
 * alternative to the standard `<select>` tag.
 *
 * The main problem of <select> tag is that last one isn't flexible for
 * customization with CSS. Listbox.js solves this problem. This component
 * runs on top of <select> tag and creates an alternative to the last one
 * based on <div> tags. It opens up great possibilities for customization.
 *
 * @copyright   (c) 2012, Igor Kalnitsky.
 * @license     BSD, 3-clause
 */

(function ($) {

    /**
     * Creates an instance of Listbox.
     *
     * @constructor
     * @this {Listbox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    function Listbox(domelement, options) {
        // CSS classes used by plugin
        this.MAIN_CLASS      = 'lbjs';
        this.LIST_CLASS      = 'lbjs-list';
        this.LIST_ITEM_CLASS = 'lbjs-item';
        this.SEARCHBAR_CLASS = 'lbjs-searchbar';

        // internal state members
        /** @private */ this._parent   = domelement;
        /** @private */ this._settings = options;

        // initialize object
        this._init.call(this);
    }


    /**
     * Initialize the Listbox object. Hide a parent DOM element
     * and creates the Listbox alternative.
     *
     * @private
     * @this {Listbox}
     */
    Listbox.prototype._init = function () {
        this._createListbox();                  // create new flexible element
        this._parent.css('display', 'none');    // hide parent element
    }


    /**
     * Creates a `div`-based listbox.
     *
     * @private
     * @this {Listbox}
     */
    Listbox.prototype._createListbox = function () {
        this._listbox = $('<div>')
            .addClass(this.MAIN_CLASS)
            .insertAfter(this._parent);

        if (this._settings['class'])
            this._listbox.addClass(this._settings['class']);

        if (this._settings['searchbar'])
            this._createSearchbar();

        this._createList();
    }

    /**
     * Creates a Listbox's searchbar.
     *
     * @private
     * @this {Listbox}
     */
    Listbox.prototype._createSearchbar = function () {
        // searchbar wrapper is needed for properly stretch
        // the seacrhbar over the listbox width
        var searchbarWrapper = $('<div>')
            .addClass(this.SEARCHBAR_CLASS + '-wrapper')
            .appendTo(this._listbox);

        var searchbar = $('<input>')
            .addClass(this.SEARCHBAR_CLASS)
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

                        // remove selection from hidden elements to
                        // protect against implicitly influence
                        self._unselectItem($(this));
                    }
                });
            } else {
                // make visible all list items
                self._list.children().each(function () {
                    $(this).css('display', 'block')
                });
            }
        });

        // save for using in _resizeListToListbox()
        this._searchbarWrapper = searchbarWrapper;
    }


    /**
     * Creates a list. The List is an element with list items.
     *
     * @private
     */
    Listbox.prototype._createList = function () {
        // create container
        this._list = $('<div>')
            .addClass(this.LIST_CLASS)
            .appendTo(this._listbox);

        this._resizeListToListbox();

        // create items
        var self = this;
        this._parent.children().each(function () {
            var item = $('<div>')
                .addClass(self.LIST_ITEM_CLASS)
                .appendTo(self._list)
                .text($(this).text())
                .click(function () {
                    self._onItemClick($(this))
                });

            if ($(this).attr('disabled'))
                item.attr('disabled', '');

            if ($(this).attr('selected')) {
                self._onItemClick(item);
            }
                //item.attr('selected', '');
        });
    }


    /**
     * Select a given item in a fake and real lists.
     *
     * @private
     * @param {object} item an item to be selected
     */
    Listbox.prototype._selectItem = function (item) {
        item.attr('selected', 'selected');

        // make changes in real list
        var selectItem = this._parent.children().get(item.index());
        $(selectItem).attr('selected', '');
    }


    /**
     * Unselect a given item in a fake and real lists.
     *
     * @private
     * @param {object} item an item to be unselected
     */
    Listbox.prototype._unselectItem = function (item) {
        item.removeAttr('selected');

        // make changes in real list
        var selectItem = this._parent.children().get(item.index());
        $(selectItem).removeAttr('selected');
    }


    /**
     * Resize list to lisbox. It's a small hack since I can't
     * do it with CSS.
     *
     * @private
     */
    Listbox.prototype._resizeListToListbox = function () {
        var listHeight = this._listbox.height();

        if (this._settings['searchbar'])
            listHeight -= this._searchbarWrapper.outerHeight(true);

        this._list.height(listHeight);
    }




    /**
     * Creates an instance of SingleSelectListbox.
     *
     * @constructor
     * @this {SingleSelectListbox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    function SingleSelectListbox(domelement, options) {
        // inherit parent class
        $.extend(SingleSelectListbox.prototype, Listbox.prototype);

        // define this class related attributes
        this._selected = null;

        // call parent constructor
        Listbox.call(this, domelement, options);

        // select first item if none selected
        if (!this._selected)
            this._onItemClick(this._list.children().first());
    }


    /**
     * Reset all items and select a given one.
     *
     * @param {object} item a DOM object
     * @private
     */
    SingleSelectListbox.prototype._onItemClick = function (item) {
        if (item.attr('disabled'))
            return;

        if (this._selected)
            this._unselectItem(this._selected);

        this._selectItem(item);
        this._selected = item;
    }




    /**
     * Creates an instance of MultiSelectListbox.
     *
     * @constructor
     * @this {SingleSelectListbox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    function MultiSelectListbox(domelement, options) {
        $.extend(MultiSelectListbox.prototype, Listbox.prototype);
        Listbox.call(this, domelement, options);
    }


    /**
     * Toggle item status.
     *
     * @param {object} item a DOM object
     * @private
     */
    MultiSelectListbox.prototype._onItemClick = function (item) {
        item.attr('selected')
            ? this._unselectItem(item)
            : this._selectItem(item)
        ;
    }




    /**
     * jQuery plugin definition.
     *
     * @param {object} options an object with Listbox settings
     */
    $.fn.listbox = function (options) {
        var settings = $.extend({
            'class':        null,
            'searchbar':    true
        }, options);

        return this.each(function () {
            $(this).attr('multiple')
                ? new MultiSelectListbox($(this), settings)
                : new SingleSelectListbox($(this), settings)
            ;
        });
    }
})(jQuery);
