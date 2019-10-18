# Usage

## The htl-ad Component

```hbs
  {{htl-ad
    slotClassNames="l-constrained aligncenter leaderboard"
    slot="leaderboard/gothamist_leaderboard"
    isEager="leaderboard_ad_home"
    sizes="0x0:300x50|758x0:728x90|1203x0:970x90,970x415"
    slotRenderEndedAction=(action 'handleSlotRendered')
  }}
```

Things you might want to know when using this addon:

* For an ad to display, both the full slot name and the ad size have to match something being served out of DFP

* the `slot` name above is `leaderboard/gothamist_leaderboard`

* The `sizes` parameter above says:
  * for viewport sizes greater than or equal to 0px wide and less than 758px wide, use ads from the `300 x 50` slot
  * for viewport sizes greater than or equal to 758px wide and less than 1203px wide, use ads from the `728 x 90` slot
  * for viewport sizes greater than or equal 1203px wide use `970 x 415`

* The `isEager` parameter disables lazy-loading and causes the ad to be loaded immediately. 1x1s, pixels, interstitials, skins, out-of-page and other oddball units should generally be eager loaded to work correctly.

* `slotRenderEndedAction` - optional
  * You can pass in an action to run when GPT sends the `slotRenderEnded` event for this ad slot.


## Block Usage

```hbs
  {{#htl-ad
    slotClassNames="midpage-ad"
    slot="leaderboard/gothamist_leaderboard"
    sizes=(array (array 970 250) (array 970 90))
  as |ad|}}
    {{ad.tag}}
    {{#unless ad.isEmpty}}
      <span class="disclosure">Advertisement</span>
      <span class="debug hidden">{{ad.width}}x{{ad.height}}</span>
    {{/unless}}
  {{/htl-ad}}
```

For advanced usage, when provided a block the ad component yields the following:

`tag` (component) - the actual element where the ad will be inserted
`isEmpty` (boolean) - whether or not the ad is empty
`width` (number) - width of the current ad, in pixels
`height` (number) - height of the current ad, in pixels
