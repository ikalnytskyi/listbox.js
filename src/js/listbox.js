/*
 * Copyright 2012 Igor Kalnitsky <igor@kalnitsky.org>
 *
 * This file is part of listbox.js.
 *
 * listbox.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * listbox.js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with listbox.js.  If not, see <http://www.gnu.org/licenses/>.
 */

function Listbox() {
    this._init.apply(this, arguments);
}

Listbox.prototype = {
    MAIN_CLASS:         'lbjs',
    LIST_CLASS:         'lbjs-list',
    LIST_ITEM_CLASS:    'lbjs-item',
    SEARCHBAR_CLASS:    'lbjs-searchbar',

    _init: function () {
        // extract instance arguments
        this._parent        = arguments[0]['parent']
        this._class         = arguments[0]['class']
        this._withSeachbar  = arguments[0]['withSearchbar']
        this._multiselect   = arguments[0]['multiselect']

        // create new flexible element
        this._createListbox()
        // hide parent element
        this._parent.css('display', 'none')
        // select first element by default
        this._setItem(this._list.children().first())
    },

    _createListbox: function() {
        this._listbox = $('<div>')
            .addClass(this.MAIN_CLASS)
            .insertAfter(this._parent)

        if (this._class)
            this._listbox.addClass(this._class)

        this._createSearchbar()
        this._createList()
    },

    _createSearchbar: function() {
        if (!this._withSeachbar)
            return

        // searchbar wrapper is needed for properly stretch
        // the seacrhbar over the listbox width
        var searchbar_wrapper = $('<div>')
            .addClass(this.SEARCHBAR_CLASS + '-wrapper')
            .appendTo(this._listbox)

        var searchbar = $('<input>')
            .addClass(this.SEARCHBAR_CLASS)
            .appendTo(searchbar_wrapper)

        // set filter handler
        var instance = this
        searchbar.keyup(function() {
            var searchQuery = $(this).val().toLowerCase()

            if (searchQuery !== '') {
                // hide list items which not matched search query
                instance._list.children().each(function(index) {
                    var text = $(this).text().toLowerCase()

                    if (text.search('^' + searchQuery) != -1) {
                        $(this).css('display', 'block')
                    } else {
                        $(this).css('display', 'none')

                        // remove selection from hidden elements to
                        // protect against implicitly influence
                        instance._unselectItem($(this))
                    }
                })
            } else {
                // make visible all list items
                instance._list.children().each(function() {
                    $(this).css('display', 'block')
                })
            }

            // select first visible element if none select yet
            var isItemSelect = instance._list.children('[selected]').length > 0
            if (!instance._multiselect && !isItemSelect)
                instance._setItem(instance._list.children(':visible').first())
        })
    },

    _createList: function() {
        // create container
        this._list = $('<div>')
            .addClass(this.LIST_CLASS)
            .appendTo(this._listbox)

        // create items
        var instance = this
        this._parent.children().each(function() {
            $('<div>')
                .addClass(instance.LIST_ITEM_CLASS)
                .appendTo(instance._list)
                .text($(this).val())
                .click(function() {
                    instance._multiselect
                        ? instance._toggleItem($(this))
                        : instance._setItem($(this))
                })
        })
    },

    _selectItem: function(item) {
        item.attr('selected', 'selected')

        // make changes in real list
        var selectItem = this._parent.children().get(item.index())
        $(selectItem).attr('selected', 'selected')
    },

    _unselectItem: function(item) {
        item.removeAttr('selected')

        // make changes in real list
        var selectItem = this._parent.children().get(item.index())
        $(selectItem).removeAttr('selected')
    },

    // this function used by singleselect listbox
    _setItem: function(item) {

        var options = this._parent.children('[selected]')

        this._list.children('[selected]').each(function(index) {
            $(this).removeAttr('selected')
            $(options.get(index)).removeAttr('selected')
        })

        //this._parent.children().each(function() {
        //    $(this).removeAttr('selected')
        //})

        this._selectItem(item)
    },

    // this function used by multiselect listbox
    _toggleItem: function(item) {
        item.attr('selected')
            ? this._unselectItem(item)
            : this._selectItem(item)
    }
}
