// Quiz topic icons
export const quizIcons = {
  HTML: new URL("/images/icon-html.svg", import.meta.url).href,
  CSS: new URL("/images/icon-css.svg", import.meta.url).href,
  JavaScript: new URL("/images/icon-js.svg", import.meta.url).href,
  Accessibility: new URL("/images/icon-accessibility.svg", import.meta.url)
    .href,
} as const;

export type QuizIconKey = keyof typeof quizIcons;
