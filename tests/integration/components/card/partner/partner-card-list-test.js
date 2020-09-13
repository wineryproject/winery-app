import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/partner/partner-card-list', 'Integration | Component | card/partner/partner card list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card/partner/partner-card-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card/partner/partner-card-list}}
      template block text
    {{/card/partner/partner-card-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
