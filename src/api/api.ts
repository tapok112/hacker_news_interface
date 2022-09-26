import { create } from 'apisauce';

export const mainURL = create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/'
})

export const api = {
  news() {
    return mainURL.get('/newstories.json')
  },
  selectedNews(itemId) {
    return mainURL.get(`/item/${itemId}.json`);
  }
}