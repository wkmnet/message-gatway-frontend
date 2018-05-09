/**
 * Create with IntelliJ IDEA
 * Project name : admin-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-24
 * Time : 下午2:44
 * ---------------------------------
 *
 */
(function () {
    'use strict';

    angular.module("BlurAdmin.pages.producer.producer",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('producer.producer', {
                url: '/producer',
                templateUrl: 'app/pages/producer/producer/producer.html',
                controller: "ProducerCtrl",
                title: '视频转换',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                },
            });
    }
})();