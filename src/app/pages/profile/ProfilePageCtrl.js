/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile')
    .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($scope, $http, fileReader, $filter, $uibModal, FileUploader) {
    $scope.picture = $filter('profilePicture')('Nasta');

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };

    $scope.socialProfiles = [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/akveo/',
        icon: 'socicon-facebook'
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/akveo_inc',
        icon: 'socicon-twitter'
      },
      {
        name: 'Google',
        icon: 'socicon-google'
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/akveo',
        icon: 'socicon-linkedin'
      },
      {
        name: 'GitHub',
        href: 'https://github.com/akveo',
        icon: 'socicon-github'
      },
      {
        name: 'StackOverflow',
        icon: 'socicon-stackoverflow'
      },
      {
        name: 'Dribbble',
        icon: 'socicon-dribble'
      },
      {
        name: 'Behance',
        icon: 'socicon-behace'
      }
    ];

    $scope.unconnect = function (item) {
      item.href = undefined;
    };

    $scope.showModal = function (item) {
      $uibModal.open({
        animation: false,
        controller: 'ProfileModalCtrl',
        templateUrl: 'app/pages/profile/profileModal.html'
      }).result.then(function (link) {
          item.href = link;
        });
    };

    $scope.onFileSelected = function ($files) {
       console.log("onFileSelected : ",$files);
       $scope.file = $files;
    };

    $scope.getFile = function (uploadFile) {
      console.log("getFile...");
      console.log("scope.file :",uploadFile);
      // var fileInput = document.getElementById('uploadFile');
      // console.log("file ...", fileInput.value);
      var fd = new FormData();
        // fd.append("id","12335");
        // fd.append("token","abc-def");
        fd.append("file",uploadFile);
      $http.post("/file/upload", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
      }).success(function (data) {
        console.log("success data : ", data);
      })
      .error(function (data, status) {
          console.log("error data : ", data,status);
      });



      var uploader = $scope.uploader = new FileUploader({
          url: 'upload.php'
      });
      // FILTERS
      uploader.filters.push({
          name: 'customFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
              return this.queue.length < 10;
          }
      });

      // CALLBACKS
      uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
          console.info('onWhenAddingFileFailed', item, filter, options);
      };
      uploader.onAfterAddingFile = function(fileItem) {
          console.info('onAfterAddingFile', fileItem);
      };
      uploader.onAfterAddingAll = function(addedFileItems) {
          console.info('onAfterAddingAll', addedFileItems);
      };
      uploader.onBeforeUploadItem = function(item) {
          console.info('onBeforeUploadItem', item);
      };
      uploader.onProgressItem = function(fileItem, progress) {
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
      };
      uploader.onCompleteAll = function() {
          console.info('onCompleteAll');
      };

      console.log("uploader ...", uploader);
      // fileReader.readAsDataUrl($scope.file, $scope)
      //     .then(function (result) {
      //       $scope.picture = result;
      //     });
    };

    $scope.switches = [true, true, false, true, true, false];
  }

})();
