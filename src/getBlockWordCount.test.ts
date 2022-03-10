import getBlockWordCount from "./getBlockWordCount";
import IBlock from "./models/IBlock";


describe('getBlockWordCount', () => {
  it('should return block word count', () => {
    const blocks: IBlock[] = [
      { text: 'Hello World' },
      { text: 'Sally sold seashells by the seashore' },
    ];

    const words = getBlockWordCount(blocks);
    expect(words).toBe(8);
  });
});