import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/country/country-card-overview', 'Integration | Component | card/country/country card overview', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card/country/country-card-overview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card/country/country-card-overview}}
      template block text
    {{/card/country/country-card-overview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
