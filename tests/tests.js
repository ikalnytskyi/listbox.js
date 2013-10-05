// ==================================================================
//  SingleSelectListbox TestCases
// ==================================================================

module('SingleSelectListbox');


test('construct default', function () {
  var select = $('#construct-default');

  // check for exists a fake listbox
  var listbox = select.next();
  equal(listbox.attr('class'), 'lbjs');

  // check for non exists a searchbar
  var searchbar = listbox.find('.lbjs-searchbar');
  notEqual(searchbar.attr('class'), 'lbjs-searchbar');

  // check for exists a fake list
  var list = listbox.find('.lbjs-list');
  equal(list.attr('class'), 'lbjs-list');
});


test('construct with searchbar', function () {
  var select = $('#construct-with-searchbar');

  // check for exists a searchbar
  var searchbar = select.next().find('.lbjs-searchbar');
  equal(searchbar.attr('class'), 'lbjs-searchbar');
});


test('construct with class', function () {
  var select = $('#construct-with-class');

  // check for exists a fake listbox
  var listbox = select.next();
  equal(listbox.attr('class'), 'lbjs testClass');
});
