  // Customer create new User
Accounts.onCreateUser(function(options, user) {
    var profile_url = "avatar.png";
    var profile = {
        createdAt: new Date(),
        profile_url: profile_url
    }

    user.profile = profile;

    // Don't forget to return the new user object at the end!
    return user;
});