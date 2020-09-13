import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modal\product-quantity-picker', 'Integration | Component | modal\product quantity picker', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modal\product-quantity-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#modal\product-quantity-picker}}
      template block text
    {{/modal\product-quantity-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
