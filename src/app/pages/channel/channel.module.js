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

    angular.module('BlurAdmin.pages.channel', [
        'BlurAdmin.pages.channel.list',
        'BlurAdmin.pages.channel.new'
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('channel', {
                url: '/channel',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '通道管理',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 50,
                },
            });
    }

})();
