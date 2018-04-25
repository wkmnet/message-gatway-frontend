/**
 * Create with IntelliJ IDEA
 * Project name : message-gatway-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-11
 * Time : 上午11:29
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.d_template', [
        'BlurAdmin.pages.d_template.list',
        'BlurAdmin.pages.d_template.new'
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('d_template', {
                url: '/d_template',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '钉钉模板管理',
                sidebarMeta: {
                    icon: 'icon ion-ios-list-outline',
                    order: 44,
                },
            });
    }

})();
