import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('payplan/payplan-price', 'Integration | Component | payplan/payplan price', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{payplan/payplan-price}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#payplan/payplan-price}}
      template block text
    {{/payplan/payplan-price}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
