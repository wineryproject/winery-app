
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-to-web-path', 'helper:format-to-web-path', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{format-to-web-path inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

