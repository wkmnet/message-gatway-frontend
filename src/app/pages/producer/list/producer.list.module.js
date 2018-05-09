/**
 * Create with IntelliJ IDEA
 * Project name : message-gatway-frontend
 * Package name :
 * Author : qinxiangyu
 * User : qxy
 * Date : 17-10-11
 * Time : 下午1:13
 * ---------------------------------
 *
 */


(function () {
    'use strict';

    angular.module("BlurAdmin.pages.producer.list",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('producer.list', {
                url: '/list',
                templateUrl: 'app/pages/producer/list/list.html',
                controller: "ProducerListCtrl",
                title: '视频处理列表',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 0,
                },
            });
    }
})();

