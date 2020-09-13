import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/wine/wine-card-overview', 'Integration | Component | card/wine/wine card overview', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card/wine/wine-card-overview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card/wine/wine-card-overview}}
      template block text
    {{/card/wine/wine-card-overview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
