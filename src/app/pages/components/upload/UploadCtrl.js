/**
 * Create with IntelliJ IDEA
 * Project name : blur-admin-1.2.0
 * Package name :
 * Author : Wukunmeng
 * User : wukm
 * Date : 17-7-20
 * Time : 上午11:31
 * ---------------------------------
 *
 */
(function(){
    'use strict'

    angular.module('BlurAdmin.pages.components.upload')
        .controller('UploadCtrl', UploadCtrl);

    /** @ngInject */
    function UploadCtrl($scope, $timeout, $http, FileUploader) {

        $scope.selectUploadFile = function () {
            var input = document.getElementById('uploadFileVideo');
            input.click();
        };

        $scope.address = {"type":"qn"};

        $scope.system = {"currentTime":"1970/01/01 13:00:45"};
        function serverTime () {
            $http.get("/api/monitor/0").success(function(response) {
                $scope.system.currentTime = response.currentTime;
                console.log(response);
                $timeout(serverTime,1000);
            });
        }
        serverTime();


        $scope.changeSelected = function (selected) {
            console.log("select:", selected);
            console.log("scope.address.type.select:", $scope.address.type);
        }

        $scope.tableName = "最新上传文件列表";

        // upload on file select or drop
        var uploader = $scope.uploader = new FileUploader({
            url: '/file/upload'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 5;
            }
        });

        $scope.currentItem = {"progress":0};
        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
            fileItem.upload();
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            item.formData.push({id:"id"});
            item.formData.push({token:"token"});
            item.formData.push({type:$scope.address.type});
            console.info('formData',item.formData);
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            $scope.currentItem.progress = progress;
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            uploader.clearQueue();
            $scope.currentItem.progress = 0;

        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };
        console.info('uploader', uploader);


        $scope.fileList = [];

        $scope.scanFileList = function () {
            $http.get("/api/upload/file").success(function(response) {
                $scope.fileList = response;
                console.log($scope.fileList);
            });
        };

        function autoScanFileList () {
            $http.get("/api/upload/file").success(function(response) {
                $scope.fileList = response;
                console.log(response);
                $timeout(autoScanFileList,5000);
            });
        };
        autoScanFileList();

        $scope.peopleTableData = [
            {
                id: 1,
                firstName: 'Mark',
                lastName: 'Otto',
                username: '@mdo',
                email: 'mdo@gmail.com',
                age: '28',
                status: 'info'
            },
            {
                id: 2,
                firstName: 'Jacob',
                lastName: 'Thornton',
                username: '@fat',
                email: 'fat@yandex.ru',
                age: '45',
                status: 'primary'
            },
            {
                id: 3,
                firstName: 'Larry',
                lastName: 'Bird',
                username: '@twitter',
                email: 'twitter@outlook.com',
                age: '18',
                status: 'success'
            },
            {
                id: 4,
                firstName: 'John',
                lastName: 'Snow',
                username: '@snow',
                email: 'snow@gmail.com',
                age: '20',
                status: 'danger'
            },
            {
                id: 5,
                firstName: 'Jack',
                lastName: 'Sparrow',
                username: '@jack',
                email: 'jack@yandex.ru',
                age: '30',
                status: 'warning'
            }
        ];
    }

})();