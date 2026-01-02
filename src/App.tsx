/**
 * Main App Component
 *
 * This is the root component of the Frontend Quiz App.
 * Manages the overall application state and routing between different screens:
 * - Menu screen for quiz selection
 * - Question screen for taking quizzes
 * - Results screen for viewing scores
 *
 * Features:
 * - Theme persistence (dark/light mode)
 * - Quiz progress persistence across page refreshes
 * - State management for quiz flow
 */

import QuizMenu from "./components/QuizMenu";
import QuestionScreen from "./components/QuestionScreen";
import ResultsScreen from "./components/ResultsScreen";
import quizData from "../data.json";
import { Quiz, QuizState } from "./types";
import useLocalStorage from "./hooks/useLocalStorage";

/**
 * Main application component that orchestrates the quiz experience
 */
function App() {
  const [currentState, setCurrentState] = useLocalStorage<QuizState>(
    "quiz-current-state",
    "menu"
  );
  const [selectedQuiz, setSelectedQuiz] = useLocalStorage<Quiz | null>(
    "quiz-selected-quiz",
    null
  );
  const [isDark, setIsDark] = useLocalStorage<boolean>("quiz-theme", true); // Persist theme preference

  // Quiz progress state (persisted)
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useLocalStorage<number>("quiz-current-question", 0);
  const [selectedAnswers, setSelectedAnswers] = useLocalStorage<string[]>(
    "quiz-selected-answers",
    []
  );
  const [userAnswers, setUserAnswers] = useLocalStorage<string[]>(
    "quiz-user-answers",
    []
  );

  /**
   * Handles quiz selection from the menu
   * Initializes quiz state and transitions to question screen
   * @param quiz - The selected quiz object
   */
  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(quiz.questions.length).fill(""));
    setUserAnswers([]);
    setCurrentState("question");
  };

  /**
   * Handles answer selection for the current question
   * Updates the selected answers array at the current question index
   * @param answer - The selected answer text
   */
  const handleAnswerSelect = (answer: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  /**
   * Handles navigation to next question or completion
   * If on last question, submits quiz and shows results
   * Otherwise, moves to next question
   */
  const handleNext = () => {
    if (currentQuestionIndex < (selectedQuiz?.questions.length || 0) - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed - save final answers and show results
      setUserAnswers([...selectedAnswers]);
      setCurrentState("result");
    }
  };

  /**
   * Handles navigation to previous question
   * Only works if not on first question
   */
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  /**
   * Returns to main menu and resets quiz state
   * Clears all quiz progress and selections
   */
  const handleBackToMenu = () => {
    setCurrentState("menu");
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setUserAnswers([]);
  };

  /**
   * Toggles between dark and light themes
   * Theme preference is automatically persisted via useLocalStorage
   */
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Render different screens based on current application state
  return (
    <div className="app">
      {/* Quiz Selection Menu */}
      {currentState === "menu" && (
        <QuizMenu
          quizzes={quizData.quizzes}
          onSelectQuiz={handleQuizSelect}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* Individual Question Screen */}
      {currentState === "question" && selectedQuiz && (
        <QuestionScreen
          question={selectedQuiz.questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={selectedQuiz.questions.length}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onBackToMenu={handleBackToMenu}
          isDark={isDark}
          isLastQuestion={
            currentQuestionIndex === selectedQuiz.questions.length - 1
          }
        />
      )}

      {/* Quiz Results Screen */}
      {currentState === "result" && selectedQuiz && (
        <ResultsScreen
          quiz={selectedQuiz}
          userAnswers={userAnswers}
          onPlayAgain={() => handleQuizSelect(selectedQuiz)}
          onBackToMenu={handleBackToMenu}
          isDark={isDark}
        />
      )}
    </div>
  );
}

export default App;
