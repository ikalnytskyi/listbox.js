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
        this._listbox = $('<div class="lbjs" />').insertAfter(this._parent)

        if (this._class)
            this._listbox.addClass(this._class)

        this._createSearchbar()
        this._createList()
    },

    _createSearchbar: function() {
        if (this._withSeachbar == false)
            return
    },

    _createList: function() {
        // create container and items
        var list = $('<div class="lbjs-list" />').appendTo(this._listbox)
        this._parent.children().each(function() {
            $('<div class="lbjs-item" />')
                .appendTo(list)
                .text($(this).val())
        })

        // set handler
        var instance = this
        $('.lbjs-item').click(function() {
            instance._multiselect
                ? instance._toggleItem($(this))
                : instance._selectItem($(this))
        })
    },

    _selectItem: function(item) {
        $('.lbjs-item[selected]').each(function() {
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
