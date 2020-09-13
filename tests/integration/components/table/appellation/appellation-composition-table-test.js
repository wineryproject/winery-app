import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table/appellation/appellation-composition-table', 'Integration | Component | table/appellation/appellation composition table', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{table/appellation/appellation-composition-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#table/appellation/appellation-composition-table}}
      template block text
    {{/table/appellation/appellation-composition-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
