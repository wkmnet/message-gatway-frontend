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

    angular.module('BlurAdmin.pages.price.price', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('price.price', {
                url: '/price',
                templateUrl: 'app/pages/price/price/price.html',
                controller:'SmsPriceCtrl',
                title: '短信价格',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 50,
                },
            });
    }

})();
