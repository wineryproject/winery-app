import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/winery/winery-card-overview', 'Integration | Component | card/winery/winery card overview', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card/winery/winery-card-overview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card/winery/winery-card-overview}}
      template block text
    {{/card/winery/winery-card-overview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
