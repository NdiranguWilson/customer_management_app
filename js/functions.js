/**
 * Cytonn Technologies
 * @author Ndirangu Wilson <wndirangu@cytonn.com>
 */
var myapp = angular.module('clientRouting', ["ui.router", "nameFilter","Directive"]);
myapp.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, send to world
  $urlRouterProvider.otherwise("login");

  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "./views/login.html"
    })
    .state('customers', {
      url: "/customers",
      templateUrl: "./views/customers.html"

    })
    .state('orders', {
      url: "/orders",
      templateUrl: "./views/orders.html"
    })




});
