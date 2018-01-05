const fetch = require('node-fetch')
const cheerio = require('cheerio')
const url = require('url')

const GITHUB_HOST = 'https://github.com'

const parseReposList = htmlContent => {
  const $ = cheerio.load(htmlContent)
  const $repoNodes = $('li', '.explore-content ol.repo-list')
  return $repoNodes.map(parseRepoInfo($)).get()
}

const parseRepoInfo = $ => (index, repoNode) => {
  const $repoNode = $(repoNode)
  return {
    name: $repoNode
      .find('h3 a')
      .text()
      .trim(),
    description: $repoNode
      .find('.py-1 p')
      .text()
      .trim(),
    star: $repoNode
      .find('a svg.octicon-star')
      .parent()
      .text()
      .replace('Star', '')
      .trim(),
    fork: $repoNode
      .find('a svg.octicon-repo-forked')
      .parent()
      .text()
      .trim(),
    url: `${GITHUB_HOST}${$repoNode.find('h3 a').attr('href')}`
  }
}

exports.fetchTrending = async ({ language = '', since = 'daily' }) => {
  const trendingUrl = `${GITHUB_HOST}/trending/${language}?since=${since}`
  fetch(trendingUrl)
    .then(res => res.text())
    .then(parseReposList)
}
