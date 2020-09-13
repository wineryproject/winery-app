import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('snippet/ribbon-snippet', 'Integration | Component | snippet/ribbon snippet', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{snippet/ribbon-snippet}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#snippet/ribbon-snippet}}
      template block text
    {{/snippet/ribbon-snippet}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
