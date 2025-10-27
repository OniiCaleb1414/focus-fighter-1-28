

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


## 14. Troubleshooting & How to Fix Errors

### 1. Site won't start or shows a blank page
- Open a terminal in your project folder.
- Run:
  ```sh
  npm install
  npm run dev
  ```
- Read any error messages in the terminal. If it says a file is missing, check the file path.
- If you see a blank page, open the browser console (press F12) and look for red error messages.
- Fix typos or missing imports as shown in the error.

### 2. "Page not found" or 404 error
- Make sure the file exists in `src/pages/`.
- Check that the route is added in `App.tsx`.
- Make sure the path in the browser matches the route (e.g., `/about`).

### 3. Image or file not showing
- Make sure the image or file is in the `public/` folder.
- Check the file name and extension (e.g., `.png`, `.jpg`, `.pdf`).
- Use the correct path in your code, like `/logo.png`.

### 4. Database errors (Supabase)
- Read the error message in the browser or terminal.
- Check your migration files in `supabase/migrations/` for typos.
- Open the Supabase dashboard and check if the table/column exists.
- Make sure your `.env` keys are correct and match the Supabase project.

### 5. Can't log in or auth errors
- Check Supabase Auth settings in the dashboard.
- Make sure the redirect URLs are correct (especially if you moved the site).
- Check `.env` for correct Supabase keys.

### 6. Broken link or button does nothing
- Check the path in your code and make sure the file or page exists.
- Make sure you are using the correct component or HTML tag (e.g., `<a href=...>` for links).

### 7. "Module not found" or import error
- Check the import path in your code. It should match the file location and name.
- If you renamed or moved a file, update all imports that use it.

### 8. "TypeError" or "undefined" error
- Check if you are trying to use something that doesn't exist (like a missing variable or function).
- Make sure you spelled everything correctly and imported what you need.

### 9. "Permission denied" or can't update database
- Check your Supabase table permissions in the dashboard (RLS policies).
- Make sure your user is logged in and has the right role.

### 10. Still stuck?
- Copy the error message and search it on Google or StackOverflow.
- Check the official docs (see section 12 for links).
- Ask for help with the error message and what you tried.

---

You can always undo changes with git if something goes wrong. 

## 15. Making Your App Better (Enhancement Guide)

### A. Performance Improvements

#### 1. Code Splitting
```tsx
// Instead of importing everything at once:
import { BigComponent } from './BigComponent';

// Use lazy loading:
import { lazy } from 'react';
const BigComponent = lazy(() => import('./BigComponent'));

// Wrap with Suspense:
import { Suspense } from 'react';
<Suspense fallback={<div>Loading...</div>}>
  <BigComponent />
</Suspense>
```

#### 2. Image Optimization
```tsx
// Bad:
<img src="/big-image.jpg" />

// Better:
<img 
  src="/big-image.jpg"
  width={800}
  height={600}
  loading="lazy"
  alt="Description"
/>
```

#### 3. Memoization for Heavy Components
```tsx
import { memo } from 'react';

const HeavyComponent = memo(function HeavyComponent(props) {
  return <div>Heavy content</div>;
});
```

#### 4. State Management Optimization
```tsx
// Instead of updating all items:
setItems([...items]);

// Update specific item:
setItems(prev => prev.map(item => 
  item.id === targetId ? { ...item, updated: true } : item
));
```

### B. User Experience Improvements

#### 1. Loading States
```tsx
function LoadingButton({ isLoading, children }) {
  return (
    <Button disabled={isLoading}>
      {isLoading ? (
        <>
          <Spinner className="mr-2" />
          Loading...
        </>
      ) : children}
    </Button>
  );
}
```

#### 2. Error Handling
```tsx
function ErrorBoundary({ children }) {
  return (
    <div role="alert">
      <p>Something went wrong. Please try again.</p>
      <Button onClick={() => window.location.reload()}>
        Refresh Page
      </Button>
    </div>
  );
}
```

#### 3. Form Validation
```tsx
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function validateForm(data) {
  try {
    formSchema.parse(data);
    return { success: true };
  } catch (error) {
    return { success: false, errors: error.flatten() };
  }
}
```

#### 4. Responsive Design
```tsx
// In your components:
<div className="
  grid
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4
  p-4
  md:p-6
  lg:p-8
">
  {/* Content */}
</div>
```

### C. Security Enhancements

#### 1. Input Sanitization
```tsx
function sanitizeInput(input: string) {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .trim();              // Remove extra whitespace
}

// Use in forms:
<input 
  onChange={e => setValue(sanitizeInput(e.target.value))}
/>
```

#### 2. Authentication Enhancement
```tsx
// Add remember me functionality
function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  
  async function handleLogin(email, password) {
    const { data, error } = await supabase.auth.signIn(
      { email, password },
      { rememberMe }
    );
  }
}
```

#### 3. Role-Based Access
```sql
-- In Supabase migrations:
CREATE TYPE user_role AS ENUM ('admin', 'user', 'guest');
ALTER TABLE users ADD COLUMN role user_role DEFAULT 'user';

-- Then in your component:
function AdminPanel() {
  const { user } = useAuth();
  if (user?.role !== 'admin') return <AccessDenied />;
  return <div>Admin content</div>;
}
```

### D. Advanced Features

#### 1. Real-time Updates
```tsx
function LiveChat() {
  useEffect(() => {
    const subscription = supabase
      .from('messages')
      .on('INSERT', payload => {
        // Handle new message
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);
}
```

#### 2. Offline Support
```tsx
// In your service worker:
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Enable in your app:
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

#### 3. Analytics Integration
```tsx
function trackEvent(eventName, properties = {}) {
  // Send to your analytics service
  console.log(`Event: ${eventName}`, properties);
}

function Button({ onClick, children }) {
  const handleClick = () => {
    trackEvent('button_clicked', { buttonText: children });
    onClick?.();
  };

  return <button onClick={handleClick}>{children}</button>;
}
```

### E. Testing & Quality

#### 1. Unit Testing
```tsx
// In __tests__/Button.test.tsx
import { render, fireEvent } from '@testing-library/react';

test('Button clicks work', () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <Button onClick={onClick}>Click Me</Button>
  );
  
  fireEvent.click(getByText('Click Me'));
  expect(onClick).toHaveBeenCalled();
});
```

#### 2. E2E Testing
```tsx
// In cypress/e2e/login.cy.ts
describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

### F. SEO & Accessibility

#### 1. SEO Optimization
```tsx
function PageHead({ title, description }) {
  return (
    <head>
      <title>{title} | Focus Fighter</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* Add more meta tags as needed */}
    </head>
  );
}
```

#### 2. Accessibility Improvements
```tsx
function AccessibleButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      role="button"
      tabIndex={0}
      onKeyPress={e => {
        if (e.key === 'Enter') onClick();
      }}
    >
      {label}
    </button>
  );
}
```

### G. API & Database Optimization

#### 1. Query Optimization
```sql
-- Add indexes for frequently searched columns
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);

-- Use efficient queries
SELECT t.* 
FROM tasks t 
WHERE t.user_id = $1 
  AND t.status = 'active'
LIMIT 10;
```

#### 2. Caching
```tsx
const cache = new Map();

async function getCachedData(key) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const data = await fetchData(key);
  cache.set(key, data);
  return data;
}
```

### H. Mobile Optimization

#### 1. Touch Events
```tsx
function TouchableCard({ onPress, children }) {
  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={onPress}
      onTouchStart={e => e.target.style.opacity = '0.7'}
      onTouchEnd={e => e.target.style.opacity = '1'}
    >
      {children}
    </div>
  );
}
```

#### 2. Responsive Images
```tsx
function ResponsiveImage({ src, alt }) {
  return (
    <picture>
      <source 
        media="(min-width: 1024px)" 
        srcSet={`${src}-large.jpg`} 
      />
      <source 
        media="(min-width: 640px)" 
        srcSet={`${src}-medium.jpg`} 
      />
      <img 
        src={`${src}-small.jpg`} 
        alt={alt} 
        loading="lazy" 
      />
    </picture>
  );
}
```

### I. Development Workflow Improvements

#### 1. Git Hooks
```json
// In package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

#### 2. VS Code Settings
```json
// In .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### J. Documentation

#### 1. Component Documentation
```tsx
/**
 * Button component that follows design system
 * @param {string} variant - 'primary' | 'secondary' | 'ghost'
 * @param {function} onClick - Click handler
 * @param {ReactNode} children - Button content
 */
export function Button({ variant, onClick, children }) {
  return (
    <button 
      className={`btn btn-${variant}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

#### 2. API Documentation
```tsx
/**
 * Fetches user tasks
 * @param {string} userId - User ID
 * @param {object} options - Query options
 * @param {string} options.status - Task status filter
 * @param {number} options.limit - Max number of tasks
 * @returns {Promise<Task[]>} Array of tasks
 */
async function getTasks(userId, options = {}) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .eq('status', options.status)
    .limit(options.limit);

  if (error) throw error;
  return data;
}
```

### K. Feature Ideas

1. Task Management
   - Due dates with reminders
   - Priority levels
   - Categories/tags
   - Recurring tasks

2. Social Features
   - Share progress
   - Team challenges
   - Friend system
   - Activity feed

3. Gamification
   - Experience points
   - Achievements
   - Daily streaks
   - Level system

4. Analytics
   - Progress tracking
   - Habit statistics
   - Goal completion rates
   - Time tracking

5. Integration Ideas
   - Calendar sync
   - Mobile app
   - Browser extension
   - Email notifications

### L. Next Steps

1. Start with Performance
   - Implement code splitting
   - Optimize images
   - Add loading states

2. Improve User Experience
   - Add form validation
   - Enhance error handling
   - Implement responsive design

3. Add Security
   - Input sanitization
   - Role-based access
   - Enhanced authentication

4. Implement Advanced Features
   - Real-time updates
   - Offline support
   - Analytics

5. Quality Assurance
   - Add tests
   - Improve accessibility
   - Optimize SEO

Remember to:
- Test thoroughly before deploying
- Document your changes
- Keep security in mind
- Consider user feedback
- Monitor performance

Happy improving! 🚀
