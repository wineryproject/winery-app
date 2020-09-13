import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout/card/layout-card-overview', 'Integration | Component | layout/card/layout card overview', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layout/card/layout-card-overview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#layout/card/layout-card-overview}}
      template block text
    {{/layout/card/layout-card-overview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
