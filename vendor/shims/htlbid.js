(function() {
  function vendorModule() {
    'use strict';

    var htlbid = self['htlbid'] = self['htlbid'] || {};
    htlbid.cmd = htlbid.cmd || [];
    htlbid.on = htlbid.on || function() {};
    htlbid.removeSlot = htlbid.removeSlot || function() {};

    return {
      'default': self['htlbid'],
      __esModule: true,
    };
  }

  define('htlbid', [], vendorModule);
})();
