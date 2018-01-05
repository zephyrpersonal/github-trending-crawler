# Github Trending Crawler

## transform github trending page to json data

### Install

```bash
npm install github-trending-crawler
```

### Usage

```js
const { fetchTrending } = require('github-trending-crawler')

const repoList = await fetchTrending({
  language: 'javascript',
  since:  'daily'
})
```
