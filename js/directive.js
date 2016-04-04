/**
 * Cytonn Technologies
 * @author Ndirangu Wilson <wndirangu@cytonn.com>
 */

//The directive adds the world information to the index page

angular.module('Directive', [])
.controller('displayControl', ['$scope', function($scope) {

}])
.directive('ordersInfo', function() {
  return {
    template: '<p> Information about orders<p>'
  };
});
