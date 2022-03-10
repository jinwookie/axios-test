import fetchStream from './fetchStream';
import { BASE_URL } from './constants';

const run = async (pages: number = 1) => {
  const stories = await fetchStream(`${BASE_URL}/render/stream/content`, pages);
  const reduced = stories.filter(Boolean).reduce((acc, {
    id,
    ...rest
  }) => {
    return {
      ...acc,
      [id]: rest, 
    }
  }, {});
  console.log(reduced);
};

const args = process.argv.slice(2);
let pages = 1;
if (args?.length > 0) {
  pages = Number(args[0]);
}

run(pages);
