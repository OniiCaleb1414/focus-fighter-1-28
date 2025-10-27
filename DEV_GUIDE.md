

# Focus Fighter Project: Super Simple Change & Fix Guide

Welcome! This guide will help you make changes to the Focus Fighter app. It covers the frontend (what users see), backend (database and server), redirects, and more. Each section is step-by-step and beginner-friendly.

---



## 1. How to Change the Frontend (What Users See)

**What is the frontend?**
This is everything you see in your browser: text, buttons, images, pages, etc.

### Where is the frontend code?
- All frontend code is in the `src/` folder.
- Main files:
  - `src/App.tsx` — Main app layout and routes
  - `src/pages/` — Each file is a page (like Home, Login)
  - `src/components/` — Reusable UI parts (buttons, cards, etc.)
  - `src/components/ui/` — UI library components (from shadcn/ui)



### How to edit a page (step by step)
1. Open the `src/pages/` folder.
2. Double-click a file, like `Index.tsx` (home page) or `Auth.tsx` (login page).
3. Find the text you want to change (it looks like normal English inside `<div> ... </div>`).
4. Change the text or add new lines. Example:
  ```tsx
  <div>Welcome to Focus Fighter!</div>
  ```
5. Save the file (Ctrl+S). The browser should update automatically.
6. If you see an error, look for a red message in your browser or terminal. Undo your last change if needed.
7. If you get stuck, search for the error message on Google or in this guide.



### How to add a new page (even if you forgot React)
1. Go to `src/pages/`.
2. Right-click > New File > name it `About.tsx`.
3. Copy this code in:
  ```tsx
  export default function About() {
    return <div>About Page</div>;
  }
  ```
4. Open `src/App.tsx`.
5. At the top, add:
  ```tsx
  import About from './pages/About';
  ```
6. Find the part with `<Routes>` and add:
  ```tsx
  <Route path="/about" element={<About />} />
  ```
7. Save. Go to `http://localhost:8080/about` in your browser to see your new page.



### How to edit a component (buttons, cards, etc.)
1. Open `src/components/` or `src/components/ui/`.
2. Find a file like `button.tsx` or `TaskCard.tsx`.
3. Change the text, color, or layout. Example:
  ```tsx
  <button className="bg-green-500">Click me!</button>
  ```
4. Save and check your browser.
5. If you want to use a component on a page, import it at the top and add it in the JSX:
  ```tsx
  import { Button } from '@/components/ui/button';
  <Button>Save</Button>
  ```



### How to style things (make it look nice)
- Use Tailwind CSS classes in your JSX, e.g., `<div className="bg-blue-500 text-white">`.
- For global styles, edit `src/index.css`.
- To change theme colors, edit `tailwind.config.ts`.
- You can also add custom CSS classes in `index.css` and use them in your components.
- For icons, use the `lucide-react` package (already installed). Example:
  ```tsx
  import { Home } from 'lucide-react';
  <Home />
  ```
- If you want to add a picture, put it in the `public/` folder (e.g., `public/myphoto.png`) and use it like this:
  ```tsx
  <img src="/myphoto.png" alt="My Photo" />
  ```

---



## 2. How to Change the Backend (Database & API)

**What is the backend?**
This is the database and server logic. In this project, it's managed by Supabase (like a cloud database and API).

### Where is the backend?
- The backend uses Supabase (a cloud database and API).
- Config files are in the `supabase/` folder.
- Database tables and changes are managed with SQL files in `supabase/migrations/`.



### How to change the database (add tables, fix data)
1. Open the `supabase/migrations/` folder.
2. To add a new table, create a new file like `20251028_add_tasks.sql`.
3. Copy this code in:
  ```sql
  CREATE TABLE tasks (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text,
    created_at timestamp with time zone DEFAULT now()
  );
  ```
4. Save the file.
5. Open a terminal and run:
  ```sh
  supabase db push
  ```
6. To see your changes, log in to the Supabase dashboard (link in README) and check the table list.
7. To fix a typo or mistake, make a new migration file with the fix (never edit old migrations after running them).
8. To add or change data, use the Supabase dashboard's Table Editor.



### How to use the database in the app (show/fix data on site)
- All database code is in `src/integrations/supabase/`.
- To fetch or update data, edit `client.ts`.
- Example:
  ```ts
  // Get all tasks
  const { data, error } = await supabase.from('tasks').select('*');
  ```
- To add new functions, copy an existing one and change the table or query.
- Update types in `types.ts` if you add new tables or columns.
- If you see an error like "table not found", check your migration and Supabase dashboard.

---



## 3. How to Change Redirects (send users to a new page)

### What are redirects?
- Redirects send users from one URL to another.
- In Vite/React, redirects are usually handled in code (e.g., after login, send to dashboard).



### How to add a redirect (step by step)
1. In a page or component, use React Router's `useNavigate`:
  ```ts
  import { useNavigate } from 'react-router-dom';
  const navigate = useNavigate();
  // After some action:
  navigate('/dashboard');
  ```
2. For login/logout redirects, check `src/pages/Auth.tsx` or `src/hooks/useAuth.tsx`.
3. To redirect right away, use:
  ```tsx
  <Navigate to="/newpage" />
  ```
4. To send users to another website, use:
  ```js
  window.location.href = 'https://example.com';
  ```
5. If a link is broken, check the path in your routes and make sure the page exists.

---



## 4. How to Change Environment Variables (settings for your app)

- Environment variables are in the `.env` file (in the root folder).
- Example:
  ```env
  VITE_SUPABASE_URL="..."
  VITE_SUPABASE_KEY="..."
  ```
- To use in code:
  ```ts
  const url = import.meta.env.VITE_SUPABASE_URL;
  ```

- After changing `.env`, restart the dev server.
- Never commit secrets or private keys to git. Keep `.env` private.
- If your app can't connect to Supabase, check the keys in `.env` and the Supabase dashboard.

---



## 5. How to Add a New UI Component (buttons, cards, etc.)

1. Use shadcn/ui for ready-made components:
   ```sh
   npx shadcn-ui@latest add button
   ```

2. Or, create your own in `src/components/`.
3. To use a component, import it in your page or another component:
  ```tsx
  import { Button } from '@/components/ui/button';
  <Button>Click me</Button>
  ```
4. If you want to copy a button from another page, just copy the code and paste it where you want.

---



## 6. How to Run the App Locally (see your changes)

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the dev server:
   ```sh
   npm run dev
   ```
3. Open [http://localhost:8080](http://localhost:8080) in your browser.

4. If you see errors, check the terminal for messages. Fix typos or missing imports.
5. If the site doesn't load, make sure you are in the right folder and have run `npm install` first.

---



## 7. How to Deploy or Publish (put your site online)

- This project is designed to be published via Lovable or your own hosting.
- For Lovable, use the Share/Publish button in the Lovable dashboard.
- For manual deploys, build the app:
  ```sh
  npm run build
  ```
  Then upload the `dist/` folder to your host.

  For Supabase backend, make sure your database is up to date and environment variables are set on your host.
  If you move your site to a new domain, update any links or environment variables that use the old domain.

---



## 8. Other Common Tasks (fixing files, images, links)

### Add or change a picture
- Put your image in the `public/` folder (e.g., `public/logo.png`).
- Use it in your code:
  ```tsx
  <img src="/logo.png" alt="Logo" />
  ```

### Add or change a file (PDF, etc.)
- Put the file in `public/` (e.g., `public/manual.pdf`).
- Link to it:
  ```tsx
  <a href="/manual.pdf" download>Download Manual</a>
  ```

### Fix a broken link
- Check the path in your code and make sure the file exists in `public/` or the page exists in `src/pages/`.

### Move the site to a new domain
- Update all links in your code and `.env` that use the old domain.
- Update Supabase settings if you use OAuth or Auth redirects.

### Add a new npm package
```sh
npm install package-name
```

### Run the linter (check code style)
```sh
npm run lint
```


### Update database types
- If you change the database, update types in `src/integrations/supabase/types.ts`.
- You can generate types automatically with Supabase CLI or update them manually.

---



## 9. How to Test Your Changes (make sure it works)

### Frontend
- Open the app in your browser and try the feature you changed.
- Check for errors in the browser console (press F12).
- If something is broken, undo your last change and try again.

### Backend
- Use the Supabase dashboard to view data and test queries.
- Use the app to add or fetch data and see if it works as expected.


### Automated Tests (if any)
- If you add tests, put them in a `__tests__` folder or next to the file you are testing.
- Run tests with `npm test` (if set up).
- If you don't have tests, just check the site in your browser and try all the buttons and pages.

---


## 10. How to Use Git and Version Control (undo mistakes, work with others)

- Always make a new branch for big changes:
- Open a terminal and type:
  ```sh
  git checkout -b my-feature
  ```
- Commit your changes:
- Save your work:
  ```sh
  git add .
  git commit -m "Describe your change"
  git push origin my-feature
  ```
- Open a pull request if working with a team.
- If you break something, you can go back with:
- To undo all your changes and go back to the main version:
  ```sh
  git checkout main
  ```

---


## 11. How to Collaborate with Others (teamwork)

- Use clear commit messages.
- Pull the latest changes before starting work:
- Get the latest code before you start:
  ```sh
  git pull origin main
  ```
- Communicate with your team about what you are working on.
- Review each other's code before merging.

---


## 12. Where to Get Help (never get stuck)

- Check the README.md for more info.
- Visit the [Lovable Project Page](https://lovable.dev/projects/f2ce5cfa-b3bd-47ac-8e7a-f752b89e9489)
- Supabase docs: https://supabase.com/docs
- Vite docs: https://vitejs.dev/guide/
- React docs: https://react.dev/learn
- Tailwind docs: https://tailwindcss.com/docs

---

## 10. Quick Reference Table



| Task                        | Where/How                                      |
|-----------------------------|------------------------------------------------|
| Edit a page                 | `src/pages/`                                   |
| Edit a component            | `src/components/` or `src/components/ui/`      |
| Change styles               | Tailwind classes or `src/index.css`            |
| Change database             | `supabase/migrations/` (SQL)                   |
| Use database in app         | `src/integrations/supabase/client.ts`          |
| Add environment variable    | `.env`                                         |
| Add npm package             | `npm install package-name`                     |
| Run app                     | `npm run dev`                                  |
| Build app                   | `npm run build`                                |
| Lint code                   | `npm run lint`                                 |
| Add UI component            | `npx shadcn-ui@latest add [name]`              |
| Redirect user               | `useNavigate` in page/component                |
| Test changes                | Browser, console, Supabase dashboard           |
| Undo changes                | `Ctrl+Z` or `git checkout`                     |
| Collaborate                 | Git branches, pull requests                    |
| Add/change image            | `public/` folder, use `<img src="/file.png" />`|
| Add/change file             | `public/` folder, use `<a href="/file.pdf" />` |
| Move site                   | Update links, `.env`, Supabase settings        |
| Get help                    | See section 12                                 |

---



---

## 13. Glossary (simple explanations)

- **Frontend**: What users see (pages, buttons, images)
- **Backend**: The database and server (Supabase)
- **Component**: A piece of the site (like a button or card)
- **Migration**: A file that changes the database
- **Route**: A URL path (like `/about`)
- **.env**: A file with secret settings (like API keys)
- **Public folder**: Where you put images and files for download
- **Terminal**: Where you type commands (like `npm run dev`)
- **Git**: Tool to save and undo code changes

---

## 14. Troubleshooting (fixing common problems)

- **Site won't start**: Run `npm install` then `npm run dev`. Check for typos.
- **Page not found**: Make sure the file exists in `src/pages/` and the route is added in `App.tsx`.
- **Image not showing**: Make sure the image is in `public/` and the path is correct.
- **Database error**: Check your migration files and Supabase dashboard.
- **Can't log in**: Check Supabase Auth settings and `.env` keys.
- **Broken link**: Check the file or page exists and the path is correct.
- **Forgot how to code**: Copy examples from this guide, or search for similar code in the project.

---

You can always undo changes with git if something goes wrong. Happy coding!
