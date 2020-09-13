import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('label/wine/wine-characteristics-label', 'Integration | Component | label/wine/wine characteristics label', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{label/wine/wine-characteristics-label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#label/wine/wine-characteristics-label}}
      template block text
    {{/label/wine/wine-characteristics-label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
