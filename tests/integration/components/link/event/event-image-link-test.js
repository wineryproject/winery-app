import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('link/event/event-image-link', 'Integration | Component | link/event/event image link', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{link/event/event-image-link}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#link/event/event-image-link}}
      template block text
    {{/link/event/event-image-link}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
