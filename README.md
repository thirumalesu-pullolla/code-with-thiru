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

## Connect to the backend

Start the Spring Boot backend separately on port `8080` (from its project folder, run `.\mvnw.cmd spring-boot:run`). The Vite development server forwards `/api` requests to `http://localhost:8080`, so the frontend can use the proxy by default. Keep browser credentials enabled for auth requests; the app already does this and fetches a CSRF token before each `POST`.

If you set `VITE_API_URL`, put the `.env.local` file in the project root (next to `package.json`), not in `src`. Leave it blank to use the Vite proxy, or set it to the backend origin when connecting directly. Direct browser-to-backend requests require the backend to allow the frontend's origin and credentials.

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
