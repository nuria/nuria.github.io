define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function ($, ko, router) {

  // Components can be packaged as AMD modules, such as the following:
  ko.components.register('nav-bar', {
    require: 'components/nav-bar/nav-bar'
  });
  ko.components.register('home-page', {
    require: 'components/home-page/home'
  });
  ko.components.register('game-page', {
    require: 'components/game-page/game'
  });


  // ... or for template-only components, you can just point to a .html file directly:
  ko.components.register('about-page', {
    template: {
      require: 'text!components/about-page/about.html'
    }
  });


  ko.components.register('autocomplete', {
    require: 'components/autocomplete/autocomplete'
  });

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

  // Start the application
  ko.applyBindings({
    route: router.currentRoute
  });
});