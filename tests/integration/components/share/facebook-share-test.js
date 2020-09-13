import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('share/facebook-share', 'Integration | Component | share/facebook share', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{share/facebook-share}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#share/facebook-share}}
      template block text
    {{/share/facebook-share}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
