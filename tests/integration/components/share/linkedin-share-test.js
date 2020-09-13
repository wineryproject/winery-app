import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('share/linkedin-share', 'Integration | Component | share/linkedin share', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{share/linkedin-share}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#share/linkedin-share}}
      template block text
    {{/share/linkedin-share}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
