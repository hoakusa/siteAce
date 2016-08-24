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
  this.render('home', {
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
      return Websites.findOne({_id:this.params._id});
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
        console.log("Up voting website with id "+website_id);
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
        console.log("Down voting website with id "+website_id);

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
        return Websites.find({}, {sort:{vote: -1}});
    }
});


/////
// template events 
/////

Template.website_item.events(eventVote);
Template.website_item.helpers(isPlural);

Template.website_detail.events(eventVote);
Template.website_detail.helpers(isPlural);

Template.website_detail.events({
    "submit .js-save-comment-form":function(event){
        var website_id = this._id;
        var comment = event.target.comment.value.trim();
        var saveWebsite = this;

        if (Meteor.user() && comment.length > 0) {
            saveWebsite.comments.push({
                userId: Meteor.userId(),
                text: comment
            });
            Websites.update({_id: website_id}, saveWebsite);
        }
    }
})

Template.website_form.events({
    "click .js-toggle-website-form":function(event){
        $("#website_form").toggle('slow');
    }, 
    "submit .js-save-website-form":function(event){

        // here is an example of how to get the url out of the form:
        var url = event.target.url.value;
        var description = event.target.description.value;
        var title = event.target.title.value;
        console.log("The url they entered is: "+url);
        
        //  put your website saving code in here!
        if (Meteor.user()){
            Websites.insert({
                title: title, 
                url: url,
                description: description,
                vote: 0,
                createdOn:new Date(),
                comments: []
            }); 

            return false;// stop the form submit from reloading the page
        }
    }
});

Template.comment.helpers({
    user: function(event){
        var user_id = this.userId;
        var user = Meteor.users.findOne(user_id);
        return user;
    }
})