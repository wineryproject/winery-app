import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('wp/desc/event-desc', 'Integration | Component | wp/desc/event desc', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{wp/desc/event-desc}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#wp/desc/event-desc}}
      template block text
    {{/wp/desc/event-desc}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
