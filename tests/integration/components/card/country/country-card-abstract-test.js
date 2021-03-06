import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/country/country-card-abstract', 'Integration | Component | card/country/country card abstract', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card/country/country-card-abstract}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card/country/country-card-abstract}}
      template block text
    {{/card/country/country-card-abstract}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
