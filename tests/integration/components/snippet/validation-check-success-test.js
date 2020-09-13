import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('snippet/validation-check-success', 'Integration | Component | snippet/validation check success', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{snippet/validation-check-success}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#snippet/validation-check-success}}
      template block text
    {{/snippet/validation-check-success}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
