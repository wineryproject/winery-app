import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('snippet/description-panel-snippet', 'Integration | Component | snippet/description panel snippet', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{snippet/description-panel-snippet}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#snippet/description-panel-snippet}}
      template block text
    {{/snippet/description-panel-snippet}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
