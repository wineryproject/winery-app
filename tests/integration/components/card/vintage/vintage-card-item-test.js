import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/vintage/vintage-card-item', 'Integration | Component | card/vintage/vintage card item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card/vintage/vintage-card-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card/vintage/vintage-card-item}}
      template block text
    {{/card/vintage/vintage-card-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
