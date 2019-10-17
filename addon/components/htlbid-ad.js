import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import htlbid from 'htlbid';
import layout from '../templates/components/htlbid-ad';

/**
  Adds a HTLBID ad slot to a page.

  Usage:
  ```hbs
    {{htlbid-ad
      slotClassNames="l-constrained aligncenter leaderboard"
      slot="leaderboard/wqxr_leaderboard_demo"
      sizes="0x0:300x250,320x50|750x0:300x600,728x90,300x250"
      slotRenderEndedAction=(action 'handleSlotRendered')
      eager=true
    /}}
  ```

  @class DfpAd
*/
export default Component.extend({
  layout,
  /**
    The DFP ad slot name without the network code.

    @argument slot
    @type {String}
  */
  slot: null,
  /**
    A string representing responsive breakpoints and valid ad sizes

    `{breakpoint1}x0:{width1}x{height1}|{breakpoint2}x0:{width2a}x{height2a},{width2b}x{height2b}`

    `0x0:300x50|758x0:728x90,728x200`

    @argument sizes
    @type String
  */
  sizes: null,
  /**
    Space separated list of CSS class names.

    @argument slotClassNames
    @type {String}
    @optional
  */
  slotClassNames: null,
  /**
    Callback function called when the
    `slotRenderEnded` event is recieved from GPT.

    @argument slotRenderEndedAction
    @type {Action}
    @optional
  */
  slotRenderEndedAction: () => {},
  /**
    By default, HTLBID lazy-loads everything outside the initial viewport.
    Adding the "data-eager" attribute notifies HTLBID that a specific unit
    should be loaded immediately. 1x1s, pixels, interstitials, skins,
    out-of-page and other oddball units should generally be eager loaded
    to work correctly.

    @argument eager
    @type {Boolean}
    @default [false]
    @optional
  */
  eager: false,

  _setStatus(isEmpty, width, height) {
    this.set('isEmpty', isEmpty);
    this.set('width', width);
    this.set('height', height);
  },

  init() {
    this._super(...arguments);
    this._setStatus(true, 0, 0);
    let ref = this.ref || `ad_${guidFor(this)}`
    this.set('ref', ref);
  },

  didInsertElement() {
    this._super(...arguments);

    htlbid.on('slotRenderEnded', (slot) => {
      if (slot.ref === this.ref) {
        if (slot.isEmpty) {
          this._setStatus(true, 0, 0);
        } else {
          this._setStatus(false, slot.getRenderedWidth(), slot.getRenderedHeight());
        }
        this.slotRenderEndedAction(event);
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    //cleanup
  }
});
