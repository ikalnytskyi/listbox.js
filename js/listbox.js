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

function ListBox() {
    this._init.apply(this, arguments);
}


ListBox.prototype = {
    MAIN_CLASS:         'lbjs',
    LIST_CLASS:         'lbjs-list',
    LIST_ITEM_CLASS:    'lbjs-item',
    SEARCHBAR_CLASS:    'lbjs-searchbar',

    _init: function () {
        // extract instance arguments
        this._parent = arguments[0]['parent']
        this._class = arguments[0]['class']
        this._withSeachbar = arguments[0]['withSearchbar']
        this._multiselect = arguments[0]['multiselect']

        // create new flexible element
        this._createListbox()

        // hide parent element
        this._parent.css('display', 'none')
    },

    _createListbox: function() {
        this._listbox = $('<div>')
            .insertAfter(this._parent)
            .addClass(this.MAIN_CLASS)

        if (this._class)
            this._listbox.addClass(this._class)

        this._createSearchbar()
        this._createList()
    },

    _createSearchbar: function() {
        if (this._withSeachbar == false)
            return

        var searchbar_wrapper = $('<div>')
            .appendTo(this._listbox)
            .addClass(this.SEARCHBAR_CLASS + '-wrapper')

        var searchbar = $('<input>')
            .appendTo(searchbar_wrapper)
            .addClass(this.SEARCHBAR_CLASS)
    },

    _createList: function() {
        var instance = this

        // create container
        var list = $('<div>')
            .appendTo(this._listbox)
            .addClass(this.LIST_CLASS)

        // create items
        this._parent.children().each(function() {
            $('<div>')
                .appendTo(list)
                .text($(this).val())
                .addClass(instance.LIST_ITEM_CLASS)
        })

        // set handler
        $('.' + this.LIST_ITEM_CLASS).click(function() {
            instance._multiselect
                ? instance._toggleItem($(this))
                : instance._selectItem($(this))
        })
    },

    _selectItem: function(item) {
        $('.' + this.LIST_ITEM_CLASS + '[selected]').each(function() {
            $(this).removeAttr('selected')
        })

        item.attr('selected', 'selected')

        // make changes in real ``select`` element
        this._parent.children().each(function() {
            $(this).text() == item.text()
                ? $(this).attr('selected', 'selected')
                : $(this).removeAttr('selected')
        })
    },

    _toggleItem: function(item) {
        item.attr('selected')
            ? item.removeAttr('selected')
            : item.attr('selected', 'selected')

        // make changes in real ``select`` element
        this._parent.children().each(function() {
            if ($(this).text() == item.text()) {
                item.attr('selected')
                    ? $(this).attr('selected', 'selected')
                    : $(this).removeAttr('selected')
            }
        })
    }
}
