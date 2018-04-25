/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.group', [
    'BlurAdmin.pages.group.list',
    'BlurAdmin.pages.group.new',
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('group', {
          url: '/group',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: '钉钉分组管理',
          sidebarMeta: {
            icon: 'icon ion-chatboxes',
            order: 43,
          },
        });
  }

})();
