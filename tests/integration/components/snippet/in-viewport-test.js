import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('snippet/in-viewport', 'Integration | Component | snippet/in viewport', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{snippet/in-viewport}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#snippet/in-viewport}}
      template block text
    {{/snippet/in-viewport}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
