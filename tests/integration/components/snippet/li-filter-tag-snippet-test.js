import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('snippet/li-filter-tag-snippet', 'Integration | Component | snippet/li filter tag snippet', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{snippet/li-filter-tag-snippet}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#snippet/li-filter-tag-snippet}}
      template block text
    {{/snippet/li-filter-tag-snippet}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
