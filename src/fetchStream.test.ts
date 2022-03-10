import fetch from 'cross-fetch';
import fetchStream from './fetchStream';
import fetchStory from './fetchStory';

jest.mock('cross-fetch');
jest.mock('./fetchStory');

(fetchStory as jest.Mock).mockImplementation((id) => Promise.resolve({
  headline: 'Test Headline',
  permalink: 'https://www.axios.com',
  id,
  blocks: { blocks: [{ text: 'Hello World' }] },
}));

describe('fetchStream', () => {
  afterAll(() => jest.resetAllMocks());
  beforeEach(() => jest.restoreAllMocks());

  it('should get stream for 1 page', async () => {
    const testObject = {
      results: [
        'testid1',
        'testid2',
        'testid3',
      ],
    };

    (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(testObject),
    }));

    const results = await fetchStream('some url');
    expect(results).toHaveLength(3);
  });

  it('should get stream for 3 pages', async () => {
    const testObject = {
      next: 'https://axios.com?next=1',
      results: [
        'testid1',
        'testid2',
        'testid3',
        'testid4',
        'testid5',
        'testid6',
        'testid7',
        'testid8',
        'testid9',
        'testid10',
      ],
    };

    (fetch as jest.Mock).mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(testObject),
    }));

    const results = await fetchStream('some url', 3);
    expect(results).toHaveLength(30);
  });

  it('should get stream hitting last page', async () => {
    const testObject = {
      next: 'https://axios.com?next=1',
      results: [
        'testid1',
        'testid2',
        'testid3',
        'testid4',
        'testid5',
        'testid6',
        'testid7',
        'testid8',
        'testid9',
        'testid10',
      ],
    };

    const lastObject = {
      results: [
        'testid1',
        'testid2',
        'testid3',
        'testid4',
        'testid5',
        'testid6',
        'testid7',
        'testid8',
        'testid9',
        'testid10',
      ],
    };

    (fetch as jest.Mock).mockImplementation(url => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(url === testObject.next ? lastObject : testObject),
    }));

    const results = await fetchStream('some url', 3);
    expect(results).toHaveLength(20);
  });
});