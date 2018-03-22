/**
 * The original, broken function
 * Execution continues before the timeouts can be resolved
 * By the time the return callback function is called, one and two are still undefined
 * undefined + undefine becomes NaN
 */
function remoteMathService(cb) {
  var one, two;
  callOneService(function(err, num) {
    one = num;
  });
  callTwoService(function(err, num) {
    two = num;
  });
  return cb(undefined, one + two);
}

/**
 * Naive solution, nesting the callbacks increases overall delay
 * 1000 + 1500 = 2500ms
 */
function remoteMathServiceNaive(cb) {
  var one, two;
  callOneService(function(err, num) {
    one = num;

    callTwoService(function(err, num) {
      two = num;

      return cb(undefined, one + two);
    });
  });
}

/**
 * Using promises
 * Overall time should be the longer of the two, so 1500ms
 */
function remoteMathServicePromise(cb) {
  var one, two;
  var promise1 = new Promise((resolve, reject) => {
    callOneService(function(err, num) {
      one = num;
      resolve(one);
    })
  });
  var promise2 = new Promise((resolve, reject) => {
    callTwoService(function(err, num) {
      two = num;
      resolve(two);
    })
  });
  Promise.all([promise1, promise2]).then(function(values) {
    var one = values[0];
    var two = values[1];
    return cb(undefined, one + two);
  });
}

function callOneService(cb) {
  setTimeout(function() {
    return cb(undefined, 1);
  }, 1000);
}

function callTwoService(cb) {
  setTimeout(function() {
    return cb(undefined, 2);
  }, 1500);
}

// remoteMathService(function(err, answer) {
//   if (err) console.log("error ", err);
//   if (answer !== 3) {
//     console.log("wrong answer", answer);
//   } else {
//     console.log("correct");
//   }
// });

module.exports = {
  remoteMathServiceBroken: remoteMathService,
  remoteMathServiceNaive: remoteMathServiceNaive,
  remoteMathServicePromise: remoteMathServicePromise
}
