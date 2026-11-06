# Code With Thiru

A React and Vite application for learning data structures and algorithms through pattern-based practice.

## Requirements

- Node.js 22.12 or later
- npm

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local URL when the development server starts.

## Validate and build

```sh
npm test
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`. Deploy that directory with a static host. Because the app uses browser-side routing, configure the host to serve `index.html` for unknown paths so direct links and page refreshes continue to work.

## Adding questions

- Add a Markdown problem under `src/content/dsa/` with the required front matter fields: `id`, `title`, `topicId`, `patternId`, `difficulty`, and `description`.
- Or add question metadata to `src/data/questionCatalog.js`. Put worked solutions in a pattern-specific `src/data/workedContent*.js` module, register the problem ID in `src/data/workedQuestionIds.js`, and add a lazy loader in `src/data/questionContent.js`. This keeps list pages lightweight and loads solution content only on a problem detail page. Prompt-only entries stay marked as drafts.
- Topic and pattern IDs must match `src/data/dsa.js`. Catalog integrity is checked during app startup and by `npm test`.

Completed-question progress is stored in the browser's local storage and is not synchronized between devices.
