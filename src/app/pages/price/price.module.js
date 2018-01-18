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

    angular.module('BlurAdmin.pages.price', ['BlurAdmin.pages.price.list','BlurAdmin.pages.price.price','BlurAdmin.pages.price.new']).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('price', {
                url: '/price',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '短信价格',
                sidebarMeta: {
                    icon: 'ion-email',
                    order: 49,
                },
            });
    }

})();
