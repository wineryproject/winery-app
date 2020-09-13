
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('i18n-default', 'helper:i18n-default', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{i18n-default inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

