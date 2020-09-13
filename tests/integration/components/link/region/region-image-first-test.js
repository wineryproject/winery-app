import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('link/region/region-image-first', 'Integration | Component | link/region/region image first', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{link/region/region-image-first}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#link/region/region-image-first}}
      template block text
    {{/link/region/region-image-first}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
