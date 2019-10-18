# Migrating from nypr-ads

## Step 1 - Install nypr-ads-htl

```
ember install nypr-ads-htl
```

## Step 2 - Replace the dfp-ad components with htl-ad components

Here's an example:

```
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

becomes:

```
<HtlAd 
  >
  @slot={{@slot}}
  @sizes="0x0:300x250|750x0:300x600,300x250"
as |ad|>
  {{ad.tag}}
  {{#unless ad.isEmpty}}
    <NyprAAdLabel/>
  {{/unless}}
</HtlAd>
```
### Some differences to be aware of

You'll need to change the responsive size mapping format from a set of nested arrays to a special string. See the component page for more details.

htl-ads are lazy loaded by default. For certain units you'll want to disable this by setting `@isEager=true`  1x1s, pixels, interstitials, skins, out-of-page and other oddball units should generally be eager loaded to work correctly.

You don't need a `target`, a unique id will automatically be assigned to each ad.

## 3. Update the targeting functions

These should all work the same, so it's just a matter of updating your imports to pull from `nypr-ads-htl`

## 4. remove nypr-ads from your project

If your project still builds after removing nypr-ads, you probably replaced everything successfully.
