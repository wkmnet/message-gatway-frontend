/**
 * Create with IntelliJ IDEA
 * Project name : message-gatway-frontend
 * Package name :
 * Author : Wukunmeng
 * User : qxy
 * Date : 17-10-11
 * Time : 下午1:14
 * ---------------------------------
 *
 */

(function () {
    'use strict';

    angular.module("BlurAdmin.pages.channel.new",[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('channel.new', {
                url: '/new',
                template: '<ui-view></ui-view>',
                controller: "NewChannelCtrl",
                title: '新建通道',
                sidebarMeta: {
                    icon: 'ion-ios-pulse',
                    order: 100,
                },
            }).state('channel.new.create', {
            url: '/create',
            templateUrl: 'app/pages/channel/new/channel.html',
            title: '新建通道',
            controller: "NewChannelCtrl",
            controllerAs: "newChannelCtrl"
        }).state('channel.new.edit', {
            url: '/edit/:channel',
            templateUrl: 'app/pages/channel/new/edit/channel.html',
            title: '编辑通道',
            controller: "EditChannelCtrl",
            controllerAs: "editChannelCtrl"
        });
        $urlRouterProvider.when('/channel/new','/channel/new/create');
    }
})();