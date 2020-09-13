import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout/container/layout-account-container', 'Integration | Component | layout/container/layout account container', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layout/container/layout-account-container}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#layout/container/layout-account-container}}
      template block text
    {{/layout/container/layout-account-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
