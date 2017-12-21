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

    angular.module('BlurAdmin.pages.template', [
        'BlurAdmin.pages.template.list',
        'BlurAdmin.pages.template.new'
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('template', {
                url: '/template',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '短信模板管理',
                sidebarMeta: {
                    icon: 'icon ion-compose',
                    order: 26,
                },
            });
    }

})();
