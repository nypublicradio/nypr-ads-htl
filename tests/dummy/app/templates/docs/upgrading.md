# Migrating from nypr-ads

## Step 1 - Install the nypr-ads-htl addon

```
ember install nypr-ads-htl
```

## Step 2 - Configure the addon

You'll need to point the addon to the HTL script location. You may also want to set up a conditional prefix for a demo environment.

See the {{docs-link "configuration page" "docs.config"}} for details.

## Step 3 - Replace the dfp-ad components with htlbid-ad components

Before:

```html
<DfpAd
  @slot={{@slot}}
  @target={{@target}}
  @mapping={{array
    (array 0
      (array
        (array 300 250)
      )
    )
    (array 750
      (array
        (array 300 600)
        (array 300 250)
      )
    )
  }}
  @sizes={{array
    (array 300 250)
    (array 300 600)
  }}
as |ad|>
  {{ad.tag}}
  {{#unless ad.isEmpty}}
    <NyprAAdLabel/>
  {{/unless}}
</DfpAd>
```

After:

```html
<HtlbidAd 
  >
  @slot={{@slot}}
  @sizes="0x0:300x250|750x0:300x600,300x250"
as |ad|>
  {{ad.tag}}
  {{#unless ad.isEmpty}}
    <NyprAAdLabel/>
  {{/unless}}
</HtlbidAd>
```
### Some differences to be aware of

You'll need to change the responsive size mapping format from a set of nested arrays to a special string. See the {{docs-link "component page" "docs.api.item" "components/htlbid-ad"}} for more details.

htl-ads are lazy loaded by default. For certain units you'll want to disable this by setting `@isEager=true`  1x1s, pixels, interstitials, skins, out-of-page and other oddball units should generally be eager loaded to work correctly.

You don't need a `target`, a unique id will automatically be assigned to each ad.

## Step 4 -  Update the targeting functions

These should all be named and work the same, so you should only need to update your imports to pull from `nypr-ads-htl`

Before:

```js
import { doTargeting, clearTargeting } from 'nypr-ads';
```

After:

```js
import { doTargeting, clearTargeting } from 'nypr-ads-htl';
```


## Step 5 - Don't forget to update your tests

If you want to stub out the `htlbid` global in your tests, here's some methods you'll want to account for:

```javascript
const HTL_STUB = () => ({
  cmd: {
    push: fn => fn(), // force function queue to run
  },
  clearTargeting() {},
  setTargeting() {},
  on() {},
})
```

## Step 6. remove `nypr-ads` from your project

If your project doesn't break after removing `nypr-ads`, that's a good sign that you've probably replaced everything successfully.
