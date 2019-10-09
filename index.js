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
      return '<script src="https://htlbid.com/v3/gothamist.com/htlbid.js"></script>';
    } else {
      return '';
    }
  },

};
