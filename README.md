# nypr-ads-htl

An addon to simplify connecting NYPR web clients to our Hashtag Labs account.

## Docs
https://nypublicradio.github.io/nypr-ads-htl/docs/

## Development

Development requires nodejs 6+.
```sh
brew install nvm
nvm install --lts
nvm use --lts
```

Install dependencies.
```sh
npm install
```

Build and run ember.
_Note: To use your system's global ember simply type `ember`_
```sh
./node_modules/.bin/ember build
./node_modules/.bin/ember serve
```

Run Tests.
```sh
./node_modules/.bin/ember test
```

Publish docs site
```sh
ember deploy production
```
