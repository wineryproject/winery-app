import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('link/image-author-link-autonomous', 'Integration | Component | link/image author link autonomous', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{link/image-author-link-autonomous}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#link/image-author-link-autonomous}}
      template block text
    {{/link/image-author-link-autonomous}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
