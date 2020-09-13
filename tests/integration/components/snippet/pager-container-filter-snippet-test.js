import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('snippet/pager-container-filter-snippet', 'Integration | Component | snippet/pager container filter snippet', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{snippet/pager-container-filter-snippet}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#snippet/pager-container-filter-snippet}}
      template block text
    {{/snippet/pager-container-filter-snippet}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
