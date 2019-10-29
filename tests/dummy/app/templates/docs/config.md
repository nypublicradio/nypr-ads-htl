# Configuration

You can configure the following settings in your app's `environment.js`.

{{#docs-snippet name='config.hbs' title='config/environment.js'}}
module.exports = function(environment) {
  let ENV = {
    //...
    'nypr-ads': {
       scriptURL: "https://htlbid.com/v3/xxxxxx/htlbid.js",
       prefix: "_demo"
    },
    //...
  }
}
{{/docs-snippet}}

**Setting:** `scriptURL`<br>
**Default:** _""_

This should be set to the url of the hashtag labs script for your site.

**Setting:** `prefix`<br>
**Default:** _null_

If you set a prefix here, it will be added to dfp slot names right after the network code. 

For example, if you set a prefix of `_demo`, and pointed a `htlbid-ad` component towards `wqxr/leaderboad`, it would ask htl for the `_demo/wqxr/leaderboad` slot. You can use this to help organize your ad units by application or environment.
