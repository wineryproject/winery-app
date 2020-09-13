import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('link/winery/winery-image-link', 'Integration | Component | link/winery/winery image link', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{link/winery/winery-image-link}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#link/winery/winery-image-link}}
      template block text
    {{/link/winery/winery-image-link}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
