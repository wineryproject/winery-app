import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout/image/layout-image-overview', 'Integration | Component | layout/image/layout image overview', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layout/image/layout-image-overview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#layout/image/layout-image-overview}}
      template block text
    {{/layout/image/layout-image-overview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
