const AVG_WORDS_PER_MIN = 225;

const getReadingTime = (wordCount: number): string => {
  const time = Math.floor(wordCount / AVG_WORDS_PER_MIN);
  if (time === 0) {
    return '<1';
  }

  return time.toString();
};

export default getReadingTime;
