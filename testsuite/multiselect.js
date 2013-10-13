/**
 * Listbox.js, MultiSelect Listbox tests.
 *
 * @copyright   (c) 2012, Igor Kalnitsky <igor@kalnitsky.org>
 * @license     BSD
 */

module('MultiSelectListbox', {
    setup: function () {
        $('#test').attr('multiple', '');
    }
});


function _itemsToVal(items) {
    var result = '';
    for (var i = 0; i < items.length; ++i) {
      if (i != 0)
          result += ',';
      result += $(items[i]).text();
    }
    return result;
}


test('construct default', function () {
    var select = $('#test').listbox();

    var listbox = select.next();
    equal(listbox.attr('class'), 'lbjs');

    var searchbar = listbox.find('.lbjs-searchbar');
    notEqual(searchbar.attr('class'), 'lbjs-searchbar');

    var list = listbox.find('.lbjs-list');
    equal(list.attr('class'), 'lbjs-list');
});


test('construct with searchbar', function () {
    var select = $('#test').listbox({'searchbar': true});

    var listbox = select.next();
    var searchbar = listbox.find('.lbjs-searchbar');

    equal(searchbar.attr('class'), 'lbjs-searchbar');
});


test('construct with class', function () {
    var select = $('#test').listbox({'class': 'testClass'});

    var listbox = select.next();
    equal(listbox.attr('class'), 'lbjs testClass');
});


test('implicit default value', function () {
    var select = $('#test')
        .append('<option>A</option>')
        .append('<option>B</option>')
        .append('<option>C</option>')
        .listbox()
    ;

    var list = select.next().find('.lbjs-list');
    var selectedItems = list.children('[selected]');

    equal(selectedItems.length, 0);
});


test('explicit default value', function () {
    var select = $('#test')
        .append('<option         >A</option>')
        .append('<option selected>B</option>')
        .append('<option         >C</option>')
        .listbox()
    ;

    var list = select.next().find('.lbjs-list');
    var selectedItems = list.children('[selected]');

    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'B');
    equal(selectedItems.text(), select.val());
});


test('two explicit default values', function () {
    var select = $('#test')
        .append('<option         >A</option>')
        .append('<option selected>B</option>')
        .append('<option selected>C</option>')
        .listbox()
    ;

    var list = select.next().find('.lbjs-list');
    var selectedItems = list.children('[selected]');

    equal(selectedItems.length, 2);
    equal(_itemsToVal(selectedItems), 'B,C');
    equal(_itemsToVal(selectedItems), select.val());
});


test('one click', function () {
    var select = $('#test')
        .append('<option>A</option>')
        .append('<option>B</option>')
        .append('<option>C</option>')
        .listbox()
    ;

    var list = select.next().find('.lbjs-list');
    var items = list.children();

    $(items[1]).click();     // click on 'B'

    var selectedItems = list.children('[selected]');
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'B');
    equal(selectedItems.text(), select.val());
});


test('two clicks', function () {
    var select = $('#test')
        .append('<option>A</option>')
        .append('<option>B</option>')
        .append('<option>C</option>')
        .listbox()
    ;

    var list = select.next().find('.lbjs-list');
    var items = list.children();

    $(items[1]).click();     // click on 'B'
    $(items[1]).click();     // click on 'B'

    var selectedItems = list.children('[selected]');
    equal(selectedItems.length, 0);
    equal(select.val(), null);
});


test('two clicks on different items', function () {
    var select = $('#test')
        .append('<option>A</option>')
        .append('<option>B</option>')
        .append('<option>C</option>')
        .listbox()
    ;

    var list = select.next().find('.lbjs-list');
    var items = list.children();

    $(items[0]).click();     // click on 'A'
    $(items[2]).click();     // click on 'C'

    var selectedItems = list.children('[selected]');
    equal(selectedItems.length, 2);
    equal(_itemsToVal(selectedItems), 'A,C');
    equal(_itemsToVal(selectedItems), select.val());
});


test('multiple clicks', function () {
    var select = $('#test')
        .append('<option>A</option>')
        .append('<option>B</option>')
        .append('<option>C</option>')
        .listbox()
    ;

    var list = select.next().find('.lbjs-list');
    var items = list.children();

    $(items[0]).click();     // click on 'A'

    var selectedItems = list.children('[selected]');
    equal(selectedItems.length, 1);
    equal(_itemsToVal(selectedItems), 'A');
    equal(_itemsToVal(selectedItems), select.val());

    $(items[1]).click();     // click on 'B'

    var selectedItems = list.children('[selected]');
    equal(selectedItems.length, 2);
    equal(_itemsToVal(selectedItems), 'A,B');
    equal(_itemsToVal(selectedItems), select.val());

    $(items[0]).click();     // click on 'A'

    var selectedItems = list.children('[selected]');
    equal(selectedItems.length, 1);
    equal(_itemsToVal(selectedItems), 'B');
    equal(_itemsToVal(selectedItems), select.val());

    $(items[2]).click();     // click on 'C'

    var selectedItems = list.children('[selected]');
    equal(selectedItems.length, 2);
    equal(_itemsToVal(selectedItems), 'B,C');
    equal(_itemsToVal(selectedItems), select.val());

    $(items[0]).click();     // click on 'A'

    var selectedItems = list.children('[selected]');
    equal(selectedItems.length, 3);
    equal(_itemsToVal(selectedItems), 'A,B,C');
    equal(_itemsToVal(selectedItems), select.val());

    $(items[1]).click();     // click on 'B'

    var selectedItems = list.children('[selected]');
    equal(selectedItems.length, 2);
    equal(_itemsToVal(selectedItems), 'A,C');
    equal(_itemsToVal(selectedItems), select.val());

    $(items[0]).click();     // click on 'A'

    var selectedItems = list.children('[selected]');
    equal(selectedItems.length, 1);
    equal(_itemsToVal(selectedItems), 'C');
    equal(_itemsToVal(selectedItems), select.val());

    $(items[1]).click();     // click on 'B'

    var selectedItems = list.children('[selected]');
    equal(selectedItems.length, 2);
    equal(_itemsToVal(selectedItems), 'B,C');
    equal(_itemsToVal(selectedItems), select.val());

    $(items[2]).click();     // click on 'C'

    var selectedItems = list.children('[selected]');
    equal(selectedItems.length, 1);
    equal(_itemsToVal(selectedItems), 'B');
    equal(_itemsToVal(selectedItems), select.val());
});


test('change event', function () {
    var select = $('#test')
        .append('<option>A</option>')
        .append('<option>B</option>')
        .append('<option>C</option>')
        .listbox()
    ;

    var receiveCounter = 0;
    select.on('change', function() {
        receiveCounter++;
    });

    var list = select.next().find('.lbjs-list');
    var items = list.children();

    $(items[0]).click();
    equal(receiveCounter, 1);

    $(items[1]).click();
    $(items[2]).click();

    equal(receiveCounter, 3);
});
