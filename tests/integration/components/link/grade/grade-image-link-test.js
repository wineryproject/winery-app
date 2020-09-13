import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('link/grade/grade-image-link', 'Integration | Component | link/grade/grade image link', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{link/grade/grade-image-link}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#link/grade/grade-image-link}}
      template block text
    {{/link/grade/grade-image-link}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
