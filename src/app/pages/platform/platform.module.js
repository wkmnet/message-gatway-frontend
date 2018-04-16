/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.platform', [
    'BlurAdmin.pages.platform.list',
    'BlurAdmin.pages.platform.new',
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('platform', {
          url: '/platform',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: '平台管理',
          sidebarMeta: {
            icon: 'ion-monitor',
            order: 30,
          },
        });
  }

})();
