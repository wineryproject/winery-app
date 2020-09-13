import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('share/pdf-share', 'Integration | Component | share/pdf share', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{share/pdf-share}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#share/pdf-share}}
      template block text
    {{/share/pdf-share}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
