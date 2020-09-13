import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('info/mission-statement', 'Integration | Component | info/mission statement', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{info/mission-statement}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#info/mission-statement}}
      template block text
    {{/info/mission-statement}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
