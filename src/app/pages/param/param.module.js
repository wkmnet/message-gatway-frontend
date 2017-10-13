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

    angular.module('BlurAdmin.pages.param', [
        'BlurAdmin.pages.param.list',
        'BlurAdmin.pages.param.new'
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('param', {
                url: '/param',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '通道参数管理',
                sidebarMeta: {
                    icon: 'ion-ios-drag',
                    order: 50,
                },
            });
    }

})();
