import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/conservation/conservation-processing-card-list', 'Integration | Component | card/conservation/conservation processing card list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card/conservation/conservation-processing-card-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card/conservation/conservation-processing-card-list}}
      template block text
    {{/card/conservation/conservation-processing-card-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
