import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('search/inner-search-color-filter', 'Integration | Component | search/inner search color filter', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{search/inner-search-color-filter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#search/inner-search-color-filter}}
      template block text
    {{/search/inner-search-color-filter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
