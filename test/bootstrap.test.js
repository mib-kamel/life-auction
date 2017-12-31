var sails = require('sails');

before(function (done) {
    process.env.NODE_ENV = 'test';
    process.env.PORT = 9999;

    // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(20000);

    sails.lift({
        models: {
            connection: 'testDiskDb',
            migrate: 'drop'
        }
    }, function (err, server) {
        if (err) return done(err);
        sails.log.info('***** Starting tests... *****');
        done(err, sails);
    });
});

after(function (done) {
    // here you can clear fixtures, etc.
    sails.lower(done);
});