import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('snippet/flag-icon', 'Integration | Component | snippet/flag icon', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{snippet/flag-icon}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#snippet/flag-icon}}
      template block text
    {{/snippet/flag-icon}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
