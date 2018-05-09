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

    angular.module('BlurAdmin.pages.producer', ['BlurAdmin.pages.producer.list','BlurAdmin.pages.producer.producer']).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('producer', {
                url: '/producer',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '视频处理',
                sidebarMeta: {
                    icon: 'ion-email',
                    order: 102,
                },
            });
    }

})();
