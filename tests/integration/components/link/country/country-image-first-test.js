import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('link/country/country-image-first', 'Integration | Component | link/country/country image first', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{link/country/country-image-first}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#link/country/country-image-first}}
      template block text
    {{/link/country/country-image-first}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
