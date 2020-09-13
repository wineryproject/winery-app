import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout/container/index-layout-container', 'Integration | Component | layout/container/index layout container', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layout/container/index-layout-container}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#layout/container/index-layout-container}}
      template block text
    {{/layout/container/index-layout-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
