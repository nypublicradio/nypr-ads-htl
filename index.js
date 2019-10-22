'use strict';

module.exports = {
  name: require('./package').name,

  included: function(app) {
    this._super.included.apply(this, arguments);

    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    app.import('vendor/shims/htlbid.js');
  },

  contentFor: function(type, config) {
    if (type === 'head' && config.environment !== 'test') {
      var scriptURL = config['nypr-ads-htl'] && config['nypr-ads-htl'].scriptURL;
      return '<script src="' + scriptURL + '"></script>';
    } else {
      return '';
    }
  },

};
