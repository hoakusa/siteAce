Meteor.startup(function () {
    // Meteor.users.remove({});
    Websites.remove({});
    Comments.remove({});
    // code to run on server at startup
    if (!Websites.findOne()){
        console.log("No websites yet. Creating starter data.");
        Meteor.call('addWebsite', 'http://www.gold.ac.uk/computing/');
        Meteor.call('addWebsite', 'http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route');
        Meteor.call('addWebsite', 'http://www.coursera.org');
        Meteor.call('addWebsite', 'http://www.google.com');
    }
});