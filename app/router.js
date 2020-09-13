import EmberRouter from '@ember/routing/router';
import config from './config/environment';


const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: Ember.inject.service(),

  setTitle(title) {
    this.get('headData').set('title', title);
  }
  , actions: {
      showModal: function(name, model) {
          this.render(name, {
              into: 'application',
              outlet: 'modal',
              model: model
          });
      },
      removeModal: function() {
          this.disconnectOutlet({
              outlet: 'modal',
              parentView: 'application'
          });
      }
  }
    
});

Router.map(function() {
  /*
    this.route('wineries', function() {
      this.route('show', { path: '/:webpath' }, function() {
          this.route('products', {path : '/'}, 
              function () {
                  this.route('product', { path : '/products/:product_key'});
              }
          );
      });

    }); //{{#link-to 'wineries.show.products.product' product.wineryWebPath product.product }}{{product.product}}{{/link-to}}
        // http://localhost:4200/wineries/products/abc/products/my%20wine%2011183423108 => works but not nice url
        // OK /wineries => show index.js
        // unfortunately only the last params (:product_key) is given to model(params) of route and not first (:web_path)
  */
  this.route('wineries', function() {
    this.route('index', {path : '/'});
    this.route('winery',  {path: '/:webpath' });
    this.route('products.index',   {path : '/:webpath/products'});
    this.route('products.product', {path : '/:webpath/products/:product_key'});
  }); //{{#link-to 'wineries.products.product' 'abc' product.product }}{{product.product}}{{/link-to}}
  // http://localhost:4200/wineries/products/abc/products/my%20wine%2011183423108 => works but not nice url
  //OK /wineries => show index.js
  //OK /wineries/abc => show show.js
  //OK /wineries/abc/products => show products.index.js
  //OK /wineries/abc/products/12313 => show products.product.js
  //trade-off for this explicit routing i.e. index are specified is that {{#link-to "wineries" => {{#link-to "wineries.index"

  this.route('payplans', function() {
    this.route('request', { path: '/:payplan_id' });
  });

  this.route('payplans');
  this.route('test');
  this.route('wizard', function() {
    this.route('show', { path: '/:payplan_id' });
  });
  this.route('developer');
  this.route('feedback');
  this.route('contributor');
  this.route('not-found', { path: '/*path' });

  this.route('countries', function() {
    this.route('index', {path : '/'});
    this.route('country', {path : '/:webpath'});
    this.route('regions.index',   {path : '/:webpath/regions'});
    this.route('regions.region', {path : '/:webpath/regions/:region_key'});
    this.route('regions.places.index', {path : '/:webpath/regions/:region_key/places'});
    this.route('regions.places.place', {path : '/:webpath/regions/:region_key/places/:place_key'});
  });

  this.route('appellations', function() {
    this.route('index', {path : '/'});  
    this.route('appellation', {path : '/:webpath'});
  });
  this.route('base');
  this.route('event', function() {
    this.route('event');
  });
  this.route('grapes', function() {
    this.route('grape', {path:'/:grape_key'})
  });
  this.route('description');
  this.route('login');

  this.route('accounts', function() {
    this.route('login');
    this.route('register');
    this.route('info');
  });
  this.route('cookies');

  this.route('upload', function() {
    this.route('image');
  });

  this.route('code');
  this.route('features', function() {
    this.route("index", {path : '/'});
    this.route('winery', {path : '/winery'});
    this.route('event', {path : '/event'});
  });
  this.route('legal-mentions');
  this.route('purchase', function() {
    this.route('checkout');
    this.route('overview');
  });

  this.route('events', function(){
    this.route('index', {path : '/'});
    this.route('event', {path : '/:event_webpath'});
    this.route('request');
    this.route('wineries.index', {path : '/:event_webpath/wineries'});
    this.route('wineries.winery', {path : '/:event_webpath/wineries/:winery_webpath'});
    this.route('wineries.order', {path : '/:event_webpath/wineries/:winery_webpath/order'});
    this.route('wineries.scan', {path : '/:event_webpath/wineries/:winery_webpath/scan'});
  });

  this.route('search');

  this.route('blog', function(){
    this.route('index', {path : '/'});
    this.route('blog', {path : '/:blog_webpath'});
  });

  this.route('stats', function(){
    this.route('index', {path : '/'});
    this.route('stat', {path : '/:stat_webpath'});
  });

  this.route('home');
});

export default Router;

