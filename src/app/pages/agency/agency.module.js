/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.agency', [
    'BlurAdmin.pages.agency.list',
    'BlurAdmin.pages.agency.new',
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('agency', {
          url: '/agency',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: '平台管理',
          sidebarMeta: {
            icon: 'ion-monitor',
            order: 50,
          },
        });
  }

})();
