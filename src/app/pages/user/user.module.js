/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user', [
    'BlurAdmin.pages.user.list',
    'BlurAdmin.pages.user.new',
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('user', {
          url: '/user',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: '用户管理',
          sidebarMeta: {
            icon: 'ion-person-stalker',
            order: 100,
          },
        });
  }

})();
