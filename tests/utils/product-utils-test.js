import { filterProduct } from 'awesome2/utils/product-utils';
import { module, test } from 'qunit';

/*
module('Unit | Utils | product utils', function(hooks) {
  test('simpleFilter with product color', function(assert) {
      let products = [{productId : 1, colorName : 'WHITE'}];
      let result = simpleFilter(products,{color : 'RED'});
      console.log("filtered products = ");
      console.log(result);
      assert.deepEqual(result, []);
  });
});
*/

module('Unit | Utils | product utils filterProduct', function(hooks) {
  test('filterProduct with product color', function(assert) {
      let products = [{productId : 1, colorName : 'WHITE'}];
      let result = filterProduct(products,{color : 'RED'});
      assert.deepEqual(result, []);
  });
  test('filterProduct with product year', function(assert) {
      let products = [{years : 2001},{years : 2002},{years : 2002},{years : 2003}];
      let result = filterProduct(products,{year : 2002});
      assert.deepEqual(result, [{years : 2002},{years : 2002}]);
  });
  test('filterProduct with product year and year filter', function(assert) {
      let products = [{years : 2001},{years : 2002},{years : 2003}];
      let result = filterProduct(products,{year : 2020});
      assert.deepEqual(result, []);
  });
});

