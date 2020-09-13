import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/region/region-card-abstract-item', 'Integration | Component | card/region/region card abstract item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card/region/region-card-abstract-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card/region/region-card-abstract-item}}
      template block text
    {{/card/region/region-card-abstract-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
