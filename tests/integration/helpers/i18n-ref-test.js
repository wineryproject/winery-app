
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('i18n-ref', 'helper:i18n-ref', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{i18n-ref inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

