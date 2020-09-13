import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table/conservation/appellation-conservation-table', 'Integration | Component | table/conservation/appellation conservation table', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{table/conservation/appellation-conservation-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#table/conservation/appellation-conservation-table}}
      template block text
    {{/table/conservation/appellation-conservation-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
