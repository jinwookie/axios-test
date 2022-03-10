import fetch from 'cross-fetch';
import fetchStory from './fetchStory';

jest.mock('cross-fetch');

describe('fetchStory', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get story', async () => {
    (fetch as jest.Mock).mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(testObject),
    }));

    const testObject = {
      id: 'testid',
      headline: 'Test Headline',
      permalink: 'https://www.axios.com',
      blocks: {
        blocks: [{ text: 'Hello World' }],
      },
    };

    const story = await fetchStory(testObject.id);
    expect(story?.headline).toBe(testObject.headline);
    expect(story?.permalink).toBe(testObject.permalink);
  });
});