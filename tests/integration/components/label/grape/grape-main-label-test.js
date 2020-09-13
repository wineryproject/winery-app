import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('label/grape/grape-main-label', 'Integration | Component | label/grape/grape main label', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{label/grape/grape-main-label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#label/grape/grape-main-label}}
      template block text
    {{/label/grape/grape-main-label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
