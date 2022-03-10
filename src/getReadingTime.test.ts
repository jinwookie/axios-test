import getReadingTime from "./getReadingTime";

describe('getReadingTime', () => {
  it('should get reading time', () => {
    expect(getReadingTime(550)).toBe('2');
  });

  it('should get reading time < 1', () => {
    expect(getReadingTime(200)).toBe('<1');
  });
});