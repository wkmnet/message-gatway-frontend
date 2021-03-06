/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.dashboard',
    // 'BlurAdmin.pages.ui',
    //'BlurAdmin.pages.components',
    'BlurAdmin.pages.user',
    //'BlurAdmin.pages.trade',
    //'BlurAdmin.pages.message',
    'BlurAdmin.pages.config',
    // 'BlurAdmin.pages.form',
    // 'BlurAdmin.pages.tables',
    // 'BlurAdmin.pages.charts',
    // 'BlurAdmin.pages.maps',
    'BlurAdmin.pages.profile',
    'BlurAdmin.pages.channel',
    'BlurAdmin.pages.param',
    'BlurAdmin.pages.sms',
    'BlurAdmin.pages.sign',
    'BlurAdmin.pages.template',
    'BlurAdmin.pages.platform',
    'BlurAdmin.pages.price',
    'BlurAdmin.pages.tool',
    'BlurAdmin.pages.email_template',
    'BlurAdmin.pages.email_list',
    'BlurAdmin.pages.schedule_job',
    'BlurAdmin.pages.schedule_trigger',
    'BlurAdmin.pages.ding',
    'BlurAdmin.pages.group',
    'BlurAdmin.pages.d_template',
    'BlurAdmin.pages.redis',
    // "BlurAdmin.pages.producer",
      
      
      
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    // baSidebarServiceProvider.addStaticItem({
    //   title: 'Pages',
    //   icon: 'ion-document',
    //   subMenu: [{
    //     title: 'Sign In',
    //     fixedHref: 'logout',
    //     blank: true
    //   }, {
    //     title: 'Sign Up',
    //     fixedHref: 'reg.html',
    //     blank: true
    //   }, {
    //     title: 'User Profile',
    //     stateRef: 'profile'
    //   }, {
    //     title: '404 Page',
    //     fixedHref: '404.html',
    //     blank: true
    //   }]
    // });
    // baSidebarServiceProvider.addStaticItem({
    //   title: 'Menu Level 1',
    //   icon: 'ion-ios-more',
    //   subMenu: [{
    //     title: 'Menu Level 1.1',
    //     disabled: true
    //   }, {
    //     title: 'Menu Level 1.2',
    //     subMenu: [{
    //       title: 'Menu Level 1.2.1',
    //       disabled: true
    //     }]
    //   }]
    // });
  }

})();
