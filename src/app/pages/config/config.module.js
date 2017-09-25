/**
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.config', [
    'BlurAdmin.pages.config.list',
    'BlurAdmin.pages.config.new',
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('config', {
          url: '/config',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: '系统配置',
          sidebarMeta: {
            icon: 'ion-wrench',
            order: 50,
          },
        });
  }

})();
