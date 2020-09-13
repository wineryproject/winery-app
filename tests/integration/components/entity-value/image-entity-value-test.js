import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('entity-value/image-entity-value', 'Integration | Component | entity value/image entity value', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{entity-value/image-entity-value}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#entity-value/image-entity-value}}
      template block text
    {{/entity-value/image-entity-value}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
