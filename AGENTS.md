# AGENTS.md

## Project Overview

- Full-stack LinkedIn-style social networking app.
- Core features include authentication, user profiles, posts, likes, comments, connections, notifications, search, image uploads, and real-time updates.
- Frontend stack: React, Vite, React Router, Axios, Tailwind CSS, Socket.io Client.
- Backend stack: Node.js, Express, MongoDB, Mongoose, JWT cookie auth, bcryptjs, Multer, Cloudinary, Socket.io, dotenv.
- Both frontend and backend use JavaScript ES modules.

## Setup Instructions

1. Install backend dependencies:

    ```bash
    cd backend
    npm install
    ```

2. Create `backend/.env`:

    ```env
    PORT=8000
    MONGODB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

3. Run the backend:

    ```bash
    cd backend
    npm run dev
    ```

    The backend listens on `http://localhost:8000` by default.

4. Install frontend dependencies:

    ```bash
    cd frontend
    npm install
    ```

5. Run the frontend:

    ```bash
    cd frontend
    npm run dev
    ```

    Vite serves the frontend on `http://localhost:5173` by default.

6. Local API note:
    - Some frontend API and Socket.io URLs currently point to deployed Render URLs.
    - If local backend testing is required, update existing URL constants and backend CORS origins consistently.
    - Do not scatter new hardcoded URLs across unrelated files.

## Codebase Structure

- `README.md`: Project description, feature list, and high-level setup notes.
- `backend/index.js`: Express app setup, middleware, route mounting, Socket.io server, and server startup.
- `backend/config/`: MongoDB connection, JWT token helper, and Cloudinary upload helper.
- `backend/controllers/`: Request handlers and core backend business logic.
- `backend/models/`: Mongoose schemas for users, posts, connections, and notifications.
- `backend/routes/`: API route definitions grouped by domain.
- `backend/middlewares/`: Auth middleware and Multer upload configuration.
- `backend/public/`: Temporary upload destination used before Cloudinary upload.
- `frontend/src/main.jsx`: React entry point and provider wiring.
- `frontend/src/App.jsx`: Route definitions and protected route redirects.
- `frontend/src/pages/`: Page-level views.
- `frontend/src/components/`: Reusable UI and feature components.
- `frontend/src/context/`: Auth, user, and Socket.io context providers.
- `frontend/src/socket.js`: Socket.io client setup.
- `frontend/src/assets/`: Static images and logos.
- `frontend/tailwind.config.js`: Tailwind content configuration.
- `frontend/eslint.config.js`: ESLint configuration for frontend JavaScript and JSX.

## Development Guidelines

- Follow the existing code style in the file being changed.
- Use single quotes for strings where the surrounding file does.
- Keep JavaScript source readable with clear names and simple control flow.
- Use PascalCase for React components and component files.
- Use camelCase for variables, functions, hooks, context values, and controller helpers.
- Keep backend route, controller, and model changes aligned by domain.
- Keep API response shapes stable unless the task explicitly changes the contract.
- Prefer async/await for asynchronous backend and frontend API code.
- Use Tailwind utility classes for styling instead of adding unrelated CSS.
- Keep auth and user state changes inside existing context/provider patterns.
- Keep Socket.io behavior centralized through existing socket/context patterns.
- Avoid duplicating API calls, URL constants, or auth logic.
- Run frontend linting before finishing frontend changes:

    ```bash
    cd frontend
    npm run lint
    ```

## Agent Rules

- Do not modify unrelated files.
- Keep changes minimal and scoped to the requested task.
- Preserve the existing architecture, folder layout, and naming patterns.
- Write clear, readable code.
- Add comments only when they explain non-obvious behavior.
- Do not introduce new dependencies unless explicitly required.
- Ensure backward compatibility unless explicitly told otherwise.
- Do not change public API routes, request bodies, response shapes, cookie behavior, or Socket.io event names without clear task scope.
- Do not commit secrets, `.env` files, tokens, database URLs, or Cloudinary credentials.
- Do not reformat entire files unless formatting is the requested task.
- Do not replace existing working patterns with a new framework or state-management approach.
- Preserve user-facing behavior while fixing bugs unless the requested change says otherwise.

## Testing

- There is currently no dedicated test script in `backend/package.json` or `frontend/package.json`.
- For frontend changes, run:

    ```bash
    cd frontend
    npm run lint
    npm run build
    ```

- For backend changes, run the server and exercise affected endpoints manually:

    ```bash
    cd backend
    npm run dev
    ```

- When adding tests in the future, keep them near the behavior being tested or in a clearly named test folder.
- Add or update tests when changing auth, API contracts, database models, connection flows, notification behavior, post interactions, or Socket.io events.
- If tests are not available, document the manual verification performed.

## Commit Guidelines

- Keep commits small and focused.
- Use concise imperative commit messages.
- Preferred format:

    ```text
    area: short description
    ```

- Examples:

    ```text
    frontend: fix notification bell state
    backend: validate connection request status
    docs: add agent contribution guide
    ```

## Common Tasks

- Adding a new feature:
    - Identify the owning domain first: auth, users, posts, connections, notifications, or search.
    - Update backend model, controller, and route files only when API behavior is needed.
    - Update frontend context, page, and component files only where the UI consumes the feature.
    - Preserve existing auth, cookie, and Socket.io patterns.

- Fixing a bug:
    - Reproduce or trace the issue before editing.
    - Change the smallest responsible file or files.
    - Verify the affected path manually or with available scripts.
    - Avoid unrelated cleanup.

- Refactoring code:
    - Keep behavior unchanged.
    - Refactor in small steps.
    - Do not rename public APIs, route paths, model fields, or component props unless required.
    - Run lint/build or document why they could not be run.

## Constraints

- Auth uses JWT stored in an HTTP-only cookie; preserve cookie security settings unless the task is specifically about local development or auth behavior.
- MongoDB model fields and API response shapes are part of the frontend/backend contract.
- Cloudinary uploads depend on files written by Multer to `backend/public`; preserve cleanup behavior.
- Socket.io client/server origins and event flows must stay compatible.
- CORS settings affect cookie auth and must be changed carefully.
- User data, passwords, tokens, image uploads, and connection state are security-sensitive.
- Avoid logging secrets or sensitive user data.
- Avoid expensive database queries in feed, search, suggestions, and notification paths.
- Keep deployed Render URLs and local development URLs consistent when changing environment or networking behavior.
