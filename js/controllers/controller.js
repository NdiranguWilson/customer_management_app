/**
 * Cytonn Technologies
 * @author Ndirangu Wilson <wndirangu@cytonn.com>
 */



[ '$scope', function($scope) {

  $scope.rows = ['Row 1', 'Row 2'];

  $scope.counter = 3;

  $scope.addRow = function() {

    $scope.rows.push('Row ' + $scope.counter);
    $scope.counter++;
  }
}]
