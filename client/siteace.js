/// routing 

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
    this.render('navbar', {
        to:"navbar"
    });
    this.render('home', {
        to:"main"
    });
});

Router.route('/websites', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('website_list', {
    to:"main"
  });
});

Router.route('/websites/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('website_detail', {
    to:"main", 
    data:function(){
        var web = Websites.findOne({_id: this.params._id});
        if (web) {
            web.date = moment(web.createdOn).format("MMMM Do YYYY");
            return web;
        }        
    }
  });
});

Router.route('/(.*)', function(){
    this.render('pageNotFound', {
        to: "main"
    });
});

/////
// meteor account config
/////

Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});

/////
// events function
/////

var eventVote = {
    "click .js-upvote":function(event){
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        // put the code in here to add a vote to a website!
        Websites.update({_id: website_id}, {
            $inc: {vote: 1},
        });

        return false;// prevent the button from reloading the page
    }, 
    "click .js-downvote":function(event){

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;

        // put the code in here to remove a vote from a website!
        if (this.vote > 0) {
           Websites.update({_id: website_id}, {
                $inc: {vote: -1},
            }); 
        }
        

        return false;// prevent the button from reloading the page
    }
}

var isPlural = {
    isPlural: function(number){
        return number > 1;
    }
}

/////
// template helpers 
/////

// helper function that returns all available websites
Template.website_list.helpers({
    websites:function(){
        //return Websites.find({}, {sort:{vote: -1}});
        var webs = Websites.find({}, {sort:{vote: -1}}).fetch();
        webs.forEach(function(web){
            web.date = moment(web.createdOn).format("MMMM Do YYYY");
        });
        return webs;
    }
});


/////
// template events 
/////

Template.home.onRendered(function() {
    $('.search-box').find('input:text').addClass("form-control");
    $('.search-box').find('input:text').attr('placeholder', 'Search what are you looking for?');
});

Template.searchBox.helpers({
    webIndex: () => WebIndex
});

Template.website_item.events(eventVote);
Template.website_item.helpers(isPlural);

Template.website_detail.events(eventVote);
Template.website_detail.helpers(isPlural);

Template.website_detail.events({
    "submit .js-save-comment-form":function(event){
        var website_id = this._id;
        var comment = event.target.comment.value.trim();

        // Add comment
        if (Meteor.user() && comment.length > 0) {
            Meteor.call('addComment', website_id, comment);
            event.target.comment.value = "";
            return false;
        }
    }
});

Template.website_detail.helpers({
    comments: function(event) {
        var comments = Comments.find({websiteId: this._id}).fetch();
        comments.forEach(function(comment) {
            comment.createdOn = moment(comment.createdOn).fromNow();
        });
        return comments;
    }
});

Template.website_form.events({
    "click .js-toggle-website-form":function(event){
        $("#website_form").toggle('slow');
    }, 
    "submit .js-save-website-form":function(event){

        // here is an example of how to get the url out of the form:
        var url = event.target.url.value.trim();
        
        //  put your website saving code in here!
        if (Meteor.user() && url.length > 0){
            Meteor.call('addWebsite', url);
            return false;// stop the form submit from reloading the page
        }
    }
});

Template.comment.helpers({
    user: function(event){
        var user_id = this.createdBy;
        var user = Meteor.users.findOne(user_id);
        return user;
    }
})