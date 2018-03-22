/**
 * Running the below suite gave me the following cli output:
 *
 * $ mocha exercise_1.spec.js
 *
 *   remoteMathService
 *     √ should get NaN as sum
 *     √ should add 2 numbers together with naive code (2537ms)
 *     √ should add 2 numbers together with promise code (1501ms)
 *
 *   3 passing (4s)
 */


var assert = require('assert');
var code = require('./exercise_1');

describe('remoteMathService', function() {
  // Increase default mocha timeout of 2000ms
  this.timeout(5000);

  it('should get NaN as sum', function() {
    code.remoteMathServiceBroken(function(err, answer) {
      assert.strictEqual(isNaN(answer), true);
    });
  });

  it('should add 2 numbers together with naive code', function(done) {
    code.remoteMathServiceNaive(function(err, answer) {
      assert.strictEqual(answer, 3);
      done();
    });
  });

  it('should add 2 numbers together with promise code', function(done) {
    code.remoteMathServicePromise(function(err, answer) {
      assert.strictEqual(answer, 3);
      done();
    });
  });

});
