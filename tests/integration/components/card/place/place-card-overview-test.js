import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/place/place-card-overview', 'Integration | Component | card/place/place card overview', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card/place/place-card-overview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card/place/place-card-overview}}
      template block text
    {{/card/place/place-card-overview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
