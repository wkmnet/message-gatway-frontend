/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components', [
    // 'BlurAdmin.pages.components.mail',
    // 'BlurAdmin.pages.components.timeline',
    // 'BlurAdmin.pages.components.tree',
    // 'BlurAdmin.pages.components.upload',
      'BlurAdmin.pages.components.keys',
    'BlurAdmin.pages.components.new_merchant',
    'BlurAdmin.pages.components.merchant',
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('components', {
          url: '/components',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: '支付管理',
          sidebarMeta: {
              /**ion-gear-a**/
            icon: 'ion-social-euro',
            order: 100,
          },
        });
  }

})();
