import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('suggestion/home-page-suggestion', 'Integration | Component | suggestion/home page suggestion', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{suggestion/home-page-suggestion}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#suggestion/home-page-suggestion}}
      template block text
    {{/suggestion/home-page-suggestion}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
