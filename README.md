# Axios Take-Home

Using `blocks` to determine word count and reading time. Word count here is usually lower than from the API, because there may be extra logic on the API to handle smaller words, for example the letter "a" may not be included in the API word count.

The higher word count will probably also affect reading time, and I'm basing the reading time off of an average 225 words/min.

# Installation
`npm install`

# Running
`npm start [pages]`

You can run `npm start`, which will default to running for 1 page. You can add an optional `[pages]` argument to run for a set number of pages. For example, `npm start 3`.

# Test
`npm run test`

Unit tests are run, and can be run offline.