/**
 * Cytonn Technologies
 * @author Ndirangu Wilson <wndirangu@cytonn.com>
 */

//The filter makes the third character uppercase
 angular.module('countryUpper', []).filter('capitalize', function() {
   return function(input) {
     index=2;
     input = input.substr(0, index) + input.charAt(index).toUpperCase() + input.substr(index + 1);
     return input ;
   };
 });
