
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('payplan-class', 'helper:payplan-class', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{payplan-class inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

