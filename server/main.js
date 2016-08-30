Meteor.methods({
    addWebsite: function(url) {
        if (!url.match(/(http|https):\/\//)) {
            url = 'http://' + url;
        }

        HTTP.get(url, {}, function(err, res) {
            if (err) return console.log(err);

            var website = {};
            var title;
            var description;
            website.url = url;
                    console.log("The url they entered is: "+url);
            // if match <title> tag
            if (res.content.match(/<title>([^<>]*?)<\/title>/)) {
                title = res.content.match(/<title>([^<>]*?)<\/title>/);
                website.title = title[1];
            }

            if (res.content.match(/(?:<meta[^<>]*?property="og:title".*?content=")(.*?)(?:"[^<>]*?>)/)) {
                title = res.content.match(/(?:<meta[^<>]*?property="og:title".*?content=")(.*?)(?:"[^<>]*?>)/);
                website.title = title[1];
            }

            if (res.content.match(/(?:<meta[^<>]*?content=")(.*?)(?:"[^<>]*?property="og:title"[^<>]*?>)/)) {
                title = res.content.match(/(?:<meta[^<>]*?content=")(.*?)(?:"[^<>]*?property="og:title"[^<>]*?>)/);
                website.title = title[1];
            }

            // var regexDes = /<meta.*?property="og:description".*?content="(.*?)".*?>/;

            // if match <description>
            if (res.content.match(/(?:<meta[^<>]*?name="description".*?content=")(.*?)(?:"[^<>]*?>)/)) {
                description = res.content.match(/(?:<meta[^<>]*?name="description".*?content=")(.*?)(?:"[^<>]*?>)/);
                website.description = description[1];
            }

            if (res.content.match(/(?:<meta[^<>]*?property="og:description".*?content=")(.*?)(?:"[^<>]*?>)/)) {
                description = res.content.match(/(?:<meta[^<>]*?property="og:description".*?content=")(.*?)(?:"[^<>]*?>)/);
                website.description = description[1];
            }

            if (res.content.match(/(?:<meta[^<>]*?content=")(.*?)(?:"[^<>]*?property="og:description"[^<>]*?>)/)) {
                description = res.content.match(/(?:<meta[^<>]*?content=")(.*?)(?:"[^<>]*?property="og:description"[^<>]*?>)/);
                website.description = description[1];
            }               

            return Websites.insert(website);

        });
    },
    addComment: function(website, text) {
        var comment = {};
        comment.websiteId = website;
        comment.createdBy = this.userId;
        comment.text = text;
        return Comments.insert(comment);
    }
})