import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/grape/grape-card-abstract', 'Integration | Component | card/grape/grape card abstract', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card/grape/grape-card-abstract}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card/grape/grape-card-abstract}}
      template block text
    {{/card/grape/grape-card-abstract}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
