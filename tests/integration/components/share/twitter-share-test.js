import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('share/twitter-share', 'Integration | Component | share/twitter share', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{share/twitter-share}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#share/twitter-share}}
      template block text
    {{/share/twitter-share}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
