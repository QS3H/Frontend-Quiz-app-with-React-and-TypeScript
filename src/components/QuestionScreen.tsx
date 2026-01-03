/**
 * QuestionScreen Component
 *
 * Displays individual quiz questions with multiple choice options.
 * Handles user interaction for answer selection and navigation between questions.
 *
 * Features:
 * - Progress indicator showing current question
 * - Multiple choice options with visual feedback
 * - Navigation controls (Previous/Next/Submit)
 * - Back to menu functionality
 * - Responsive design with theme support
 * - Accessibility-friendly with proper focus management
 */

import styled from "styled-components";
import { Question } from "../types";

// Asset paths
const isProduction = import.meta.env.PROD;
const basePath = isProduction ? "/Frontend-Quiz-app-with-React-and-TypeScript" : "";
const bgDesktopDark = `${basePath}/images/pattern-background-desktop-dark.svg`;
const bgDesktopLight = `${basePath}/images/pattern-background-desktop-light.svg`;
const bgTabletDark = `${basePath}/images/pattern-background-tablet-dark.svg`;
const bgTabletLight = `${basePath}/images/pattern-background-tablet-light.svg`;
const bgMobileDark = `${basePath}/images/pattern-background-mobile-dark.svg`;
const bgMobileLight = `${basePath}/images/pattern-background-mobile-light.svg`;
const iconBack = `${basePath}/images/icon-back.svg`;

/**
 * Props for the QuestionScreen component
 */
interface QuestionScreenProps {
  /** The current question object with text, options, and answer */
  question: Question;
  /** Current question number (1-based) */
  questionNumber: number;
  /** Total number of questions in the quiz */
  totalQuestions: number;
  /** Currently selected answer (null if none selected) */
  selectedAnswer: string | null;
  /** Callback when user selects an answer */
  onAnswerSelect: (answer: string) => void;
  /** Callback for next question navigation */
  onNext: () => void;
  /** Callback for previous question navigation */
  onPrevious: () => void;
  /** Current theme state */
  isDark: boolean;
  /** Whether this is the final question (changes button text) */
  isLastQuestion: boolean;
  /** Callback to return to main menu */
  onBackToMenu: () => void;
  /** Whether to show answer feedback (correct/incorrect) */
  showFeedback?: boolean;
}

/**
 * Helper function to convert option index to letter (A, B, C, D)
 * Used for labeling multiple choice options
 *
 * @param index - Zero-based index of the option (0 = A, 1 = B, etc.)
 * @returns Letter label for the option
 */
function getOptionLetter(index: number): string {
  return String.fromCharCode(65 + index); // 65 is ASCII code for 'A'
}

// Styled Components
const Container = styled.div<{ $isDark: boolean }>`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: "Rubik", sans-serif;
  background-color: ${(props) => (props.$isDark ? "#313E51" : "#F4F6FA")};
`;

const BackgroundImage = styled.img<{
  $display: "mobile" | "tablet" | "desktop";
}>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  ${(props) => {
    switch (props.$display) {
      case "mobile":
        return `
          display: block;
          @media (min-width: 768px) {
            display: none;
          }
        `;
      case "tablet":
        return `
          display: none;
          @media (min-width: 768px) {
            display: block;
          }
          @media (min-width: 1024px) {
            display: none;
          }
        `;
      case "desktop":
        return `
          display: none;
          @media (min-width: 1024px) {
            display: block;
          }
        `;
    }
  }}
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;

  @media (min-width: 768px) {
    padding: 0 64px;
  }

  @media (min-width: 1024px) {
    padding: 0;
  }
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 0;

  @media (min-width: 768px) {
    padding: 40px 0;
  }

  @media (min-width: 1024px) {
    padding-top: 83px;
    padding-bottom: 99px;
  }
`;

const BackButton = styled.button<{ $isDark: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${(props) => (props.$isDark ? "#FFFFFF" : "#313E51")};
  font-size: 18px;
  font-weight: 500;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$isDark ? "#3B4D66" : "#E5E7EB")};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a729f5, 0 0 0 4px rgba(167, 41, 245, 0.2);
  }
`;

const BackIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 32px;

  @media (min-width: 768px) {
    padding-bottom: 64px;
  }
`;

const QuestionCard = styled.div<{ $isDark: boolean }>`
  width: 100%;
  max-width: 564px;
  background-color: ${(props) => (props.$isDark ? "#3B4D66" : "#FFFFFF")};
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 16px 40px rgba(143, 160, 193, 0.14);

  @media (min-width: 768px) {
    padding: 48px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  margin-bottom: 24px;
  overflow: hidden;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(135deg, #a729f5 0%, #d97706 100%);
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease;
`;

const QuestionNumber = styled.p<{ $isDark: boolean }>`
  font-size: 14px;
  color: #abc1e1;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    font-size: 20px;
    margin-bottom: 24px;
  }
`;

const QuestionText = styled.h2<{ $isDark: boolean }>`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  color: ${(props) => (props.$isDark ? "#FFFFFF" : "#313E51")};
  margin-bottom: 24px;

  @media (min-width: 768px) {
    font-size: 36px;
    margin-bottom: 40px;
  }
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    gap: 24px;
  }
`;

const OptionButton = styled.button<{
  $isDark: boolean;
  $isSelected: boolean;
  $isCorrect?: boolean;
  $showFeedback?: boolean;
}>`
  width: 100%;
  background-color: ${(props) => {
    if (props.$showFeedback) {
      if (props.$isCorrect && props.$isSelected) return "#26D782"; // Green for correct selected
      if (!props.$isCorrect && props.$isSelected) return "#EE5454"; // Red for incorrect selected
      if (props.$isCorrect && !props.$isSelected) return "#26D782"; // Green for correct unselected (when showing feedback)
      return props.$isDark ? "#3B4D66" : "#F4F6FA"; // Default for incorrect unselected
    }
    if (props.$isSelected) return "#a729f5";
    return props.$isDark ? "#3B4D66" : "#F4F6FA";
  }};
  color: ${(props) => {
    if (props.$showFeedback && (props.$isCorrect || (props.$isSelected && !props.$isCorrect))) return "#FFFFFF";
    if (props.$isSelected) return "#FFFFFF";
    return props.$isDark ? "#FFFFFF" : "#313E51";
  }};
  border: 2px solid
    ${(props) => {
      if (props.$showFeedback) {
        if (props.$isCorrect) return "#26D782"; // Green border for correct
        if (props.$isSelected && !props.$isCorrect) return "#EE5454"; // Red border for incorrect selected
        return "transparent";
      }
      return props.$isSelected ? "#a729f5" : "transparent";
    }};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: ${(props) => (props.$showFeedback ? "default" : "pointer")};
  transition: all 0.2s ease;
  text-align: left;
  font-size: 18px;
  opacity: ${(props) => (props.$showFeedback && !props.$isCorrect && !props.$isSelected ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) => {
      if (props.$showFeedback) return;
      if (props.$isSelected) return "#a729f5";
      return props.$isDark ? "#43475A" : "#E5E7EB";
    }};
    border-color: ${(props) => {
      if (props.$showFeedback) return;
      return props.$isSelected ? "#a729f5" : "transparent";
    }};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a729f5, 0 0 0 4px rgba(167, 41, 245, 0.2);
  }

  @media (min-width: 768px) {
    font-size: 28px;
    padding: 20px 24px;
    border-radius: 24px;
  }
`;

const OptionLetter = styled.span`
  font-weight: 500;
  min-width: 24px;
  text-align: center;

  @media (min-width: 768px) {
    min-width: 40px;
  }
`;

const FeedbackIcon = styled.div<{ $isCorrect: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.$isCorrect ? "#26D782" : "#EE5454")};
  color: white;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
`;

const NavigationContainer = styled.div`
  width: 100%;
  max-width: 564px;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    margin-top: 40px;
  }
`;

const NavButton = styled.button<{ $isDark: boolean; $disabled?: boolean }>`
  background-color: ${(props) => (props.$disabled ? "#E5E7EB" : "#a729f5")};
  color: ${(props) => (props.$disabled ? "#9CA3AF" : "#FFFFFF")};
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 500;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$disabled ? "#E5E7EB" : "#8B5CF6")};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a729f5, 0 0 0 4px rgba(167, 41, 245, 0.2);
  }

  @media (min-width: 768px) {
    padding: 20px 40px;
    font-size: 28px;
    border-radius: 24px;
  }
`;

const SubmitButton = styled(NavButton)`
  background-color: #00d9b6;
  color: #ffffff;

  &:hover {
    background-color: #06b6a0;
  }
`;

/**
 * Main QuestionScreen component that renders the question interface
 *
 * @param question - Current question data
 * @param questionNumber - Current question number (1-based)
 * @param totalQuestions - Total questions in quiz
 * @param selectedAnswer - Currently selected answer or null
 * @param onAnswerSelect - Function to handle answer selection
 * @param onNext - Function to navigate to next question
 * @param onPrevious - Function to navigate to previous question
 * @param isDark - Theme state for styling
 * @param isLastQuestion - Whether this is the final question
 * @param onBackToMenu - Function to return to main menu
 */
function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  isDark,
  isLastQuestion,
  onBackToMenu,
  showFeedback = false,
}: QuestionScreenProps) {
  const progress = ((questionNumber - 1) / totalQuestions) * 100;

  return (
    <Container $isDark={isDark}>
      {/* Background Pattern - Desktop */}
      <BackgroundImage
        src={isDark ? bgDesktopDark : bgDesktopLight}
        alt=""
        $display="desktop"
      />

      {/* Background Pattern - Tablet */}
      <BackgroundImage
        src={isDark ? bgTabletDark : bgTabletLight}
        alt=""
        $display="tablet"
      />

      {/* Background Pattern - Mobile */}
      <BackgroundImage
        src={isDark ? bgMobileDark : bgMobileLight}
        alt=""
        $display="mobile"
      />

      <ContentContainer>
        <Header>
          <BackButton $isDark={isDark} onClick={onBackToMenu}>
            <BackIcon src={iconBack} alt="Back" />
            Back
          </BackButton>
        </Header>

        <Main>
          <QuestionCard $isDark={isDark}>
            <ProgressBar>
              <ProgressFill $progress={progress} />
            </ProgressBar>

            <QuestionNumber $isDark={isDark}>
              Question {questionNumber} of {totalQuestions}
            </QuestionNumber>

            <QuestionText $isDark={isDark}>{question.question}</QuestionText>

            <OptionsList>
              {question.options.map((option, index) => {
                const isCorrect = option === question.answer;
                const isSelected = selectedAnswer === option;
                return (
                  <OptionButton
                    key={option}
                    $isDark={isDark}
                    $isSelected={isSelected}
                    $isCorrect={isCorrect}
                    $showFeedback={showFeedback}
                    onClick={() => !showFeedback && onAnswerSelect(option)}
                    type="button"
                  >
                    <OptionLetter>{getOptionLetter(index)}</OptionLetter>
                    {option}
                    {showFeedback && (isSelected || isCorrect) && (
                      <FeedbackIcon $isCorrect={isCorrect}>
                        {isCorrect ? "✓" : "✗"}
                      </FeedbackIcon>
                    )}
                  </OptionButton>
                );
              })}
            </OptionsList>
          </QuestionCard>

          <NavigationContainer>
            <NavButton
              $isDark={isDark}
              $disabled={questionNumber === 1}
              onClick={onPrevious}
              disabled={questionNumber === 1}
            >
              Previous
            </NavButton>

            {isLastQuestion ? (
              <SubmitButton
                $isDark={isDark}
                onClick={onNext}
                disabled={!selectedAnswer}
              >
                Submit Quiz
              </SubmitButton>
            ) : (
              <NavButton
                $isDark={isDark}
                onClick={onNext}
                disabled={!selectedAnswer}
              >
                Next
              </NavButton>
            )}
          </NavigationContainer>
        </Main>
      </ContentContainer>
    </Container>
  );
}

export default QuestionScreen;
