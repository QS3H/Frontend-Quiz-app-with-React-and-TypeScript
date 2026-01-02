# Frontend Mentor - Frontend quiz app solution

This is my solution to the [Frontend quiz app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/frontend-quiz-app-BE7xkzXQnU).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

This is a fully functional quiz application built with React, TypeScript, and Styled Components. Users can test their knowledge across four different topics: HTML, CSS, JavaScript, and Accessibility.

### Features

✅ **Core Functionality:**

- Select a quiz subject from four available topics
- Answer multiple-choice questions (4 options each)
- Navigate between questions with Previous/Next buttons
- View final score and percentage upon completion
- Play again or choose a different subject

✅ **User Experience:**

- Fully responsive design (mobile, tablet, desktop)
- Dark/Light theme toggle
- Smooth animations and hover effects
- Keyboard navigation support
- Progress indicator showing current question
- Clean, modern UI matching the design specifications

✅ **Technical Implementation:**

- Built with React 19 and TypeScript for type safety
- Component-based architecture with reusable UI components
- Styled Components for maintainable CSS-in-JS
- State management with React hooks
- Mobile-first responsive design

### Screenshot

![](./preview.jpg)

Screenshot of the quiz app showing the main menu with quiz topic selection.

### Links

- Solution URL: [Frontend Mentor](https://www.frontendmentor.io/solutions/frontend-quiz-app-with-react-and-typescript-40M7CZEUO5)
- Live Site URL: [View Live Demo](https://QS3H.github.io/Frontend-Quiz-app-with-React-and-TypeScript/)

## My process

### Built with

- [React](https://reactjs.org/) - JS library with hooks for state management
- [TypeScript](https://www.typescriptlang.org/) - For type safety and better developer experience
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Styled Components](https://styled-components.com/) - For component-scoped CSS-in-JS styling
- Semantic HTML5 markup
- CSS custom properties
- Flexbox and CSS Grid
- Mobile-first responsive design
- Custom fonts (Rubik)

### What I learned

Building this quiz app was an excellent opportunity to practice React fundamentals and modern development patterns:

**React State Management:**

- Using `useState` for managing multiple pieces of state (current screen, selected quiz, answers, etc.)
- Lifting state up to parent components for cross-component communication
- Proper state updates using functional updates when new state depends on previous state

**Component Architecture:**

- Breaking down the UI into reusable components (QuizMenu, QuestionScreen, ResultsScreen)
- Passing props effectively between parent and child components
- Creating clean component interfaces with TypeScript

**Styled Components:**

- Writing responsive CSS-in-JS with theme-aware styling
- Using props to conditionally apply styles based on component state
- Creating reusable styled components with consistent design patterns

**TypeScript Integration:**

- Defining proper interfaces for component props and data structures
- Using union types for state management (QuizState: 'menu' | 'question' | 'result')
- Type-safe event handling and state updates

**Key Code Patterns:**

```tsx
// State management with multiple related values
const [currentState, setCurrentState] = useState<QuizState>("menu");
const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
const [userAnswers, setUserAnswers] = useState<string[]>([]);

// Conditional rendering based on app state
{
  currentState === "menu" && <QuizMenu />;
}
{
  currentState === "question" && <QuestionScreen />;
}
{
  currentState === "result" && <ResultsScreen />;
}
```

This project reinforced the importance of planning component hierarchy and state flow before starting to code.

### Continued development

Areas I want to focus on in future projects:

**Advanced State Management:**

- Learning Redux Toolkit or Zustand for more complex applications
- Implementing proper error boundaries and loading states
- Adding persistence with localStorage or a backend

**Testing:**

- Writing unit tests with Jest and React Testing Library
- Integration testing for complete user flows
- End-to-end testing with Cypress or Playwright

**Performance Optimization:**

- Code splitting and lazy loading
- Memoization with useMemo and useCallback
- Optimizing re-renders in complex component trees

**Accessibility:**

- More comprehensive ARIA implementation
- Keyboard navigation testing
- Screen reader compatibility verification

### Deployment to GitHub Pages

This project is fully configured for GitHub Pages deployment with two options:

#### Option 1: Manual Deployment (Quick & Easy)

1. **Update Configuration (Automated):**

   ```bash
   npm run setup-pages yourusername
   ```

   This automatically updates both `package.json` and `vite.config.ts` with your GitHub username.

   _Or manually:_

   - In `package.json`, replace `yourusername` in the `homepage` field with your actual GitHub username
   - In `vite.config.ts`, the base path is already configured for GitHub Pages deployment

2. **Deploy:**

   ```bash
   npm install
   npm run deploy
   ```

3. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch and "/ (root)" folder
   - Save changes

#### Option 2: Automatic Deployment (GitHub Actions)

For automatic deployment on every push to main branch:

1. **Push your code to GitHub** (the workflow file is already included)
2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as the source
3. **Done!** Your app deploys automatically on every push

#### Local Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages (manual)
npm run deploy
```

## Author

- Frontend Mentor - [@QS3H](https://www.frontendmentor.io/profile/QS3H)
