'use strict';

var app = angular.module('wecoApp');
app.factory('Branch', ['BranchAPI', 'SubbranchesAPI', 'ModsAPI', '$http', '$state', 'ENV', function(BranchAPI, SubbranchesAPI, ModsAPI, $http, $state, ENV) {
  var Branch = {};
  var me = {};

  // fetch the presigned url for the specified picture for the specified branch
  // Returns the promise from $http.
  Branch.getPictureUrl = function(id, type) {
    // if type not specified, default to profile picture
    if(type != 'picture' && type != 'cover') {
      type = 'picture';
    }
    // fetch signedurl for user profile picture and attach to user object
    return $http({
      method: 'GET',
      url: ENV.apiEndpoint + 'branch/' + id + '/' + type
    });
  };

  // Get the root branches
  Branch.getSubbranches = function(branchid) {
    return new Promise(function(resolve, reject) {
      SubbranchesAPI.get({ branchid: branchid }).$promise.catch(function(response) {
        reject({
          status: response.status,
          message: response.data.message
        });
      }).then(function(branches) {
        if(branches && branches.data) {
          resolve(branches.data);
        } else {
          // successful response contains no branches object:
          // treat as 500 Internal Server Error
          reject({
            status: 500,
            message: 'Something went wrong'
          });
        }
      });
    });
  };

  Branch.getMods = function(branchid) {
    return new Promise(function(resolve, reject) {
      ModsAPI.get({ branchid: branchid }).$promise.catch(function(response) {
        reject({
          status: response.status,
          message: response.data.message
        });
      }).then(function(mods) {
        if(mods && mods.data) {
          resolve(mods.data);
        } else {
          // successful response contains no branches object:
          // treat as 500 Internal Server Error
          reject({
            status: 500,
            message: 'Something went wrong'
          });
        }
      });
    });
  };

  Branch.addMod = function(branchid, username) {
    return new Promise(function(resolve, reject) {
      ModsAPI.save({ branchid: branchid }, { username: username })
      .$promise.catch(function(response) {
        reject({
          status: response.status,
          message: response.data.message
        });
      }).then(function() {
        resolve();
      });
    });
  };

  Branch.removeMod = function(branchid, username) {
    return new Promise(function(resolve, reject) {
      ModsAPI.delete({ branchid: branchid, username: username })
      .$promise.catch(function(response) {
        reject({
          status: response.status,
          message: response.data.message
        });
      }).then(function() {
        resolve();
      });
    });
  };

  Branch.get = function(branchid) {
    return new Promise(function(resolve, reject) {
      BranchAPI.get({ branchid: branchid }).$promise.catch(function(response) {
        reject({
          status: response.status,
          message: response.data.message
        });
      }).then(function(branch) {
        if(!branch || !branch.data) { return reject(); }
        // Attach the profile picture url to the branch object if it exists
        Branch.getPictureUrl(branchid, 'picture').then(function(response) {
          if(response && response.data && response.data.data) {
            branch.data.profileUrl = response.data.data;
          }
          Branch.getPictureUrl(branchid, 'cover').then(function(response) {
            if(response && response.data && response.data.data) {
              branch.data.coverUrl = response.data.data;
            }
            resolve(branch.data);
          }, function() {
            // no cover picture to attach
            resolve(branch.data);
          });
        }, function() {
          // no profile picture to attach, try cover
          Branch.getPictureUrl(branchid, 'cover').then(function(response) {
            if(response && response.data && response.data.data) {
              branch.data.coverUrl = response.data.data;
            }
            resolve(branch.data);
          }, function() {
            // no cover picture to attach
            resolve(branch.data);
          });
        });
      });
    });
  };

  Branch.update = function(data) {
    return new Promise(function(resolve, reject) {
      BranchAPI.update({ branchid: $state.params.branchid }, data).$promise.catch(function(response) {
        console.log(response);
        reject({
          status: response.status,
          message: response.data.message
        });
      }).then(function() {
        console.log("done");
        resolve();
      });
    });
  };

  Branch.create = function(data) {
    return new Promise(function(resolve, reject) {
      BranchAPI.save(data).$promise.catch(function(response) {
        reject({
          status: response.status,
          message: response.data.message
        });
      }).then(function() {
        resolve();
      });
    });
  };

  return Branch;
}]);
