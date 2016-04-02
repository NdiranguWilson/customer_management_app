/**
 * Cytonn Technologies
 * @author Ndirangu Wilson <wndirangu@cytonn.com>
 */

 (function(){
 function authInterceptor(API, auth,$window) {
   return {
     // automatically attach Authorization header
     request: function(config) {
       var token = auth.getToken();
  if(config.url.indexOf(API) === 0 && token) {
    config.headers.Authorization = 'Bearer ' ;
  }
       return config;
     },

 // If a token was sent back, save it and navigate to the customers page
   response: function(res) {
     if(res.config.url.indexOf(API) === 0 && res.data.token) {
    auth.saveToken(res.data.token);
    //$window.location.href= "https://www.cytonn.com"
  }
  return res;
},
  responseError: function(res) {
    if(res.status === 401) {
      $window.location.href= "https://www.cytonn.com"
    }
    return res;
  }

 }
}

function authService($window) {
 var self = this;

 //parse JWT
 self.parseJwt = function(token) {
   var base64Url = token.split('.')[1];
   var base64 = base64Url.replace('-', '+').replace('_', '/');
   return JSON.parse($window.atob(base64));
 }
 //save token
 self.saveToken = function(token) {
   $window.localStorage['jwtToken'] = token;
 }
 //persist
 self.getToken = function() {
   return $window.localStorage['jwtToken'];
 }
 //check authentication
 self.isAuthed = function() {
   var token = self.getToken();
   if(token) {
     var params = self.parseJwt(token);
     return Math.round(new Date().getTime() / 1000) <= params.exp;
   } else {
     return false;
   }

 }
 console.log("am I Authed" + self.isAuthed());
 //logout
 self.logout = function() {
   $window.localStorage.removeItem('jwtToken');
 }
}

function userService($http, API, auth) {
 var self = this;
 self.getQuote = function() {
   return $http.get(API + '/auth/quote');
 };

 // add authentication methods here
 // register function
 self.register = function(username, password) {
  return $http.post(API + '/auth/register', {
      username: username,
      password: password
    });
};
// login function
self.login = function(username, password) {
  return $http.post(API + '/auth/login', {
      username: username,
      password: password
    }).then(function(res){
      auth.saveToken(res.data.token)
      return res;
    })
};


}

// We won't touch anything in here
function MainCtrl(user, auth) {
 var self = this;

 function handleRequest(res) {
   var token = res.data ? res.data.token : null;
   if(token) { console.log('JWT:', token); }
   self.message = res.data.message;
 }

 self.login = function() {
   user.login(self.username, self.password)
     .then(handleRequest, handleRequest)
 }
 self.register = function() {
   user.register(self.username, self.password)
     .then(handleRequest, handleRequest)
 }
 self.getQuote = function() {
   user.getQuote()
     .then(handleRequest, handleRequest)
 }
 self.logout = function() {
   auth.logout && auth.logout()
 }
 self.isAuthed = function() {
   return auth.isAuthed ? auth.isAuthed() : false
 }


}

angular.module('cmaApp', [])
.factory('authInterceptor', authInterceptor)
.service('user', userService)
.service('auth', authService)
.constant('API', 'http://test-routes.herokuapp.com')
.config(function($httpProvider) {
 $httpProvider.interceptors.push('authInterceptor');
})
.controller('cmaCtrl', MainCtrl)
})();
