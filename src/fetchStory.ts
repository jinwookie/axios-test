import fetch from 'cross-fetch';
import { BASE_URL } from './constants';
import getBlockWordCount from './getBlockWordCount';
import getReadingTime from './getReadingTime';
import IStory from './models/IStory';
import IBlock from './models/IBlock';

const fetchStory = async (id: string): Promise<IStory | undefined> => {
  const response = await fetch(`${BASE_URL}/render/content/${id}/`, {
    headers: {
      'Accept-Content': 'application/json',
    },
  });

  if (response.ok) {
    const {
      id,
      headline,
      permalink,
      blocks: { blocks },
    } = await response.json();

    const words = getBlockWordCount(blocks as IBlock[]);
    const time = getReadingTime(words);

    return {
      id,
      word_count: words,
      reading_time: time.toString(),
      headline,
      permalink,
    };
  }

  return undefined;
};

export default fetchStory;
