import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('label/winery/winery-pill-label', 'Integration | Component | label/winery/winery pill label', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{label/winery/winery-pill-label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#label/winery/winery-pill-label}}
      template block text
    {{/label/winery/winery-pill-label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
