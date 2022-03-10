import IBlock from './models/IBlock';

const getWordCount = (text: string): number => {
  return text.split(' ').length;
};


const getBlockWordCount = (blocks: IBlock[]): number => {
  return blocks.reduce((acc, block) => {
    return acc + getWordCount(block.text);
  }, 0);
};

export default getBlockWordCount;
