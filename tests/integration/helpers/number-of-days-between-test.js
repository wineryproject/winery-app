
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('number-of-days-between', 'helper:number-of-days-between', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{number-of-days-between inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

