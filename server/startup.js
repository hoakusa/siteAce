Meteor.startup(function () {
    Meteor.users.remove({});
    Websites.remove({});

    // SEED

    if (!Meteor.users.findOne()) {
        Accounts.createUser({
            username: 'test',
            email: 'test@test.com',
            password: 'password'
        });
    }

    if (!Websites.findOne() && Meteor.users.findOne()){

        console.log("No websites yet. Creating starter data.");
        Meteor.call('addWebsite', 'http://www.gold.ac.uk/computing/');
        Meteor.call('addWebsite', 'http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route');
        Meteor.call('addWebsite', 'http://www.coursera.org');
        Meteor.call('addWebsite', 'http://www.google.com');
    }    
});