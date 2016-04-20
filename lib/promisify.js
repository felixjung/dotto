function promisify(fun) {
  return function() {
    const args = Array.from(arguments);

    const promise = new Promise((resolve, reject) => {
      const callback = function(err, data) {
        if (err) {
          reject(err);
        }

        resolve(data);
      };

      fun.apply(fun, args.concat(callback));
    });

    return promise;
  };
}

module.exports = promisify;
