Websites = new Mongo.Collection("websites");
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
        defaultValue: new Date()
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
        defaultValue: new Date()
    }
}));