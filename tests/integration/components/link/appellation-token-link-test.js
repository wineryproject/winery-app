import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('link/appellation-token-link', 'Integration | Component | link/appellation token link', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{link/appellation-token-link}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#link/appellation-token-link}}
      template block text
    {{/link/appellation-token-link}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
