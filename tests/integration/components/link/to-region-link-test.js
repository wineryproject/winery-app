import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('link/to-region-link', 'Integration | Component | link/to region link', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{link/to-region-link}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#link/to-region-link}}
      template block text
    {{/link/to-region-link}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
