import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('payplan/request-button', 'Integration | Component | payplan/request button', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{payplan/request-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#payplan/request-button}}
      template block text
    {{/payplan/request-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
