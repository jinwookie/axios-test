import fetch from 'cross-fetch';
import IStory from './models/IStory';
import fetchStory from './fetchStory';

const fetchStream = async (url: string, pages = 1): Promise<IStory[]> => {
  const response = await fetch(url, {
    headers: {
      'Accept-Content': 'application/json'
    },
  });

  let stories: IStory[] = [];

  if (response.ok) {
    const json = await response.json();
    stories = await Promise.all(json.results.map(fetchStory));
    if (pages > 1 && json.next) {
      const nextStories = await fetchStream(json.next, pages - 1);
      stories = [
        ...stories,
        ...nextStories,
      ];
    }
  }

  return stories;
};

export default fetchStream;
