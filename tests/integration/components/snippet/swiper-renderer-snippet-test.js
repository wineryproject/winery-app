import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('snippet/swiper-renderer-snippet', 'Integration | Component | snippet/swiper renderer snippet', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{snippet/swiper-renderer-snippet}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#snippet/swiper-renderer-snippet}}
      template block text
    {{/snippet/swiper-renderer-snippet}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
