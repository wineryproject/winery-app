import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('link/product/product-reference-link', 'Integration | Component | link/product/product reference link', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{link/product/product-reference-link}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#link/product/product-reference-link}}
      template block text
    {{/link/product/product-reference-link}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
