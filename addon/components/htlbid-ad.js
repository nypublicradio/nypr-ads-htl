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
      mapping=(array
        (array 0
          (array
            (array 300 250)
            (array 320 50)
          )
        )
        (array 750
          (array
            (array 300 600)
            (array 728 90)
            (array 300 250)
          )
        )
      )
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
    A mapping of breakpoints to ad sizes for responsive ad display.

    `[[min-size-breakpoint1,[width1,height1]],[min-size-breakpoint2,[width2,height2]]]`

    @argument mapping
    @type {Array}
  */
  mapping: null,
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

    if (this.mapping) {
      let sizes = this.mapping.map(([breakpoint, sizes]) => {
        let sizeString = sizes.map(([w,h])=>`${w}x${h}`).join(",");
        return `${breakpoint}x0:${sizeString}`
      }).join("|")
      this.set('sizes', sizes);
    }
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
