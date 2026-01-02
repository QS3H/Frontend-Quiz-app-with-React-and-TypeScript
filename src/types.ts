/**
 * Application Type Definitions
 *
 * This file contains all TypeScript interfaces and types used throughout
 * the Frontend Quiz App for type safety and better developer experience.
 */

/**
 * Represents a single quiz question with multiple choice options
 */
export interface Question {
  /** The question text displayed to the user */
  question: string;
  /** Array of possible answer choices (typically 4 options) */
  options: string[];
  /** The correct answer text (must match one of the options) */
  answer: string;
}

/**
 * Represents a complete quiz with metadata and questions
 */
export interface Quiz {
  /** The display name of the quiz topic (e.g., "HTML", "CSS", "JavaScript") */
  title: string;
  /** Path to the quiz topic icon SVG file */
  icon: string;
  /** Array of questions that make up this quiz */
  questions: Question[];
}

/**
 * Top-level data structure for the quiz application
 * Contains all available quizzes loaded from data.json
 */
export interface QuizData {
  /** Array of all available quizzes in the application */
  quizzes: Quiz[];
}

/**
 * Union type representing the possible states/screens of the application
 * Used for conditional rendering and state management
 */
export type QuizState =
  | 'menu'      // Main menu screen showing quiz selection
  | 'question'  // Individual question screen during quiz
  | 'result'    // Results screen showing final score
  | 'completed'; // Reserved for future use (currently unused)
