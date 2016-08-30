Websites = new Mongo.Collection("websites"),
    WebIndex = new EasySearch.Index({
        collection: Websites,
        limit: 10,
        fields: ['url', 'title', 'description'],
        engine: new EasySearch.Minimongo()
    });
Comments = new Mongo.Collection("comments");
Websites.attachSchema(new SimpleSchema({
    url: {
        type: String
    },
    title: {
        type: String,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    vote: {
        type: SimpleSchema.Integer,
        defaultValue: 0
    },
    createdBy: {
        type: String,
        optional: true
    },
    createdOn: {
        type: Date,
        autoValue: function() {
            return new Date;
        }
    }
}));
Comments.attachSchema(new SimpleSchema({
    websiteId: {
        type: String
    },
    text: {
        type: String,
        max: 1000
    },
    createdBy: {
        type: String
    },
    createdOn: {
        type: Date,
        autoValue: function() {
            return new Date;
        }
    }
}));