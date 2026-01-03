// Quiz topic icons
const isProduction = import.meta.env.PROD;
const basePath = isProduction ? "/Frontend-Quiz-app-with-React-and-TypeScript" : "";

export const quizIcons = {
  HTML: `${basePath}/images/icon-html.svg`,
  CSS: `${basePath}/images/icon-css.svg`,
  JavaScript: `${basePath}/images/icon-js.svg`,
  Accessibility: `${basePath}/images/icon-accessibility.svg`,
} as const;

export type QuizIconKey = keyof typeof quizIcons;
