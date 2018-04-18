/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ding', [
    'BlurAdmin.pages.ding.list',
    'BlurAdmin.pages.ding.new',
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ding', {
          url: '/ding',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: '钉钉管理',
          sidebarMeta: {
            icon: 'ion-monitor',
            order: 42,
          },
        });
  }

})();
