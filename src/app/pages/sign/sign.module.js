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

    angular.module('BlurAdmin.pages.sign', [
        'BlurAdmin.pages.sign.list',
        'BlurAdmin.pages.sign.new'
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('sign', {
                url: '/sign',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '短信签名管理',
                sidebarMeta: {
                    icon: 'ion-ios-drag',
                    order: 25,
                },
            });
    }

})();
