if (Meteor.isClient) {

  Meteor.call('getTweets', function (error, result) {
    if (error) {
      console.log("error", error);
    };

    console.log(result);

    Session.set("tweets", result);
  });

  Template.tweets.helpers({
    rant: function () {
      return Session.get("tweets");
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var cheerio = Meteor.npmRequire('cheerio');

    Meteor.methods({
      getTweets: function () {
        result = Meteor.http.get("https://twitter.com/Royal_Arse/status/538330380273979393");
        $ = cheerio.load(result.content);
        // var open = $('div.permalink-inner.permalink-tweet-container > div > div > p').text();
        var body = $('#stream-items-id > li:nth-child(n) > div > div > p').text();
        return body;
      },

    })

  });
}
