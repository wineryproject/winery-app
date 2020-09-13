import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/appellation/appellation-card-overview', 'Integration | Component | card/appellation/appellation card overview', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card/appellation/appellation-card-overview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card/appellation/appellation-card-overview}}
      template block text
    {{/card/appellation/appellation-card-overview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
