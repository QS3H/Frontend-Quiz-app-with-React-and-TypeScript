/**
 * ResultsScreen Component
 *
 * Displays the final quiz results including score, percentage, and options to:
 * - Play the same quiz again
 * - Return to the main menu
 * - View completion statistics
 *
 * Features:
 * - Score display with visual progress indicator
 * - Percentage calculation and display
 * - Responsive design with theme support
 * - Call-to-action buttons for next steps
 */

import styled from "styled-components";
import { Quiz } from "../types";

/**
 * Props for the ResultsScreen component
 */
interface ResultsScreenProps {
  /** The completed quiz object */
  quiz: Quiz;
  /** Array of user's answers in order */
  userAnswers: string[];
  /** Callback to restart the same quiz */
  onPlayAgain: () => void;
  /** Callback to return to main menu */
  onBackToMenu: () => void;
  /** Current theme state for styling */
  isDark: boolean;
}

/**
 * Main ResultsScreen component that displays quiz completion results
 *
 * @param quiz - The completed quiz with questions and answers
 * @param userAnswers - User's submitted answers array
 * @param onPlayAgain - Function to restart the same quiz
 * @param onBackToMenu - Function to return to quiz selection
 * @param isDark - Theme state for styling
 */
function ResultsScreen({
  quiz,
  userAnswers,
  onPlayAgain,
  onBackToMenu,
  isDark,
}: ResultsScreenProps) {
  // Calculate score
  const calculateScore = () => {
    if (!quiz || userAnswers.length === 0) return 0;

    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const totalQuestions = quiz.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <Container $isDark={isDark}>
      <ContentContainer>
        <Header>
          <BackButton $isDark={isDark} onClick={onBackToMenu}>
            <BackIcon src="/assets/images/icon-back.svg" alt="Back" />
            Back
          </BackButton>
        </Header>

        <Main>
          <ResultsCard $isDark={isDark}>
            <QuizTitle $isDark={isDark}>
              Quiz completed <br />
              <strong>You scored...</strong>
            </QuizTitle>

            <ScoreDisplay>
              <ScoreCircle $isDark={isDark}>
                <ScoreNumber $isDark={isDark}>{score}</ScoreNumber>
                <ScoreTotal $isDark={isDark}>
                  out of {totalQuestions}
                </ScoreTotal>
              </ScoreCircle>
              <PercentageDisplay $isDark={isDark}>
                {percentage}%
              </PercentageDisplay>
            </ScoreDisplay>

            <ButtonsContainer>
              <PlayAgainButton onClick={onPlayAgain}>
                Play Again
              </PlayAgainButton>
              <BackToMenuButton $isDark={isDark} onClick={onBackToMenu}>
                Back to Menu
              </BackToMenuButton>
            </ButtonsContainer>
          </ResultsCard>
        </Main>
      </ContentContainer>
    </Container>
  );
}

// Styled Components
const Container = styled.div<{ $isDark: boolean }>`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: "Rubik", sans-serif;
  background-color: ${(props) => (props.$isDark ? "#313E51" : "#F4F6FA")};
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

const ResultsCard = styled.div<{ $isDark: boolean }>`
  width: 100%;
  max-width: 564px;
  background-color: ${(props) => (props.$isDark ? "#3B4D66" : "#FFFFFF")};
  border-radius: 24px;
  padding: 48px 32px;
  box-shadow: 0 16px 40px rgba(143, 160, 193, 0.14);
  text-align: center;

  @media (min-width: 768px) {
    padding: 80px 64px;
  }
`;

const QuizTitle = styled.h1<{ $isDark: boolean }>`
  font-size: 40px;
  font-weight: 500;
  line-height: 1.2;
  color: ${(props) => (props.$isDark ? "#FFFFFF" : "#313E51")};
  margin-bottom: 40px;

  @media (min-width: 768px) {
    font-size: 64px;
    margin-bottom: 56px;
  }
`;

const ScoreDisplay = styled.div`
  margin-bottom: 40px;

  @media (min-width: 768px) {
    margin-bottom: 56px;
  }
`;

const ScoreCircle = styled.div<{ $isDark: boolean }>`
  width: 140px;
  height: 140px;
  background: linear-gradient(135deg, #a729f5 0%, #d97706 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 16px;
  box-shadow: 0 16px 40px rgba(143, 160, 193, 0.14);

  @media (min-width: 768px) {
    width: 248px;
    height: 248px;
    margin-bottom: 24px;
  }
`;

const ScoreNumber = styled.div<{ $isDark: boolean }>`
  font-size: 57px;
  font-weight: 500;
  color: ${(props) => (props.$isDark ? "#FFFFFF" : "#FFFFFF")};

  @media (min-width: 768px) {
    font-size: 100px;
  }
`;

const ScoreTotal = styled.div<{ $isDark: boolean }>`
  font-size: 18px;
  color: ${(props) => (props.$isDark ? "#FFFFFF" : "#FFFFFF")};
  opacity: 0.8;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const PercentageDisplay = styled.div<{ $isDark: boolean }>`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => (props.$isDark ? "#FFFFFF" : "#313E51")};
  text-align: center;
  margin-top: 8px;

  @media (min-width: 768px) {
    font-size: 24px;
    margin-top: 16px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    gap: 24px;
  }
`;

const PlayAgainButton = styled.button`
  width: 100%;
  background-color: #a729f5;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 20px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #8b5cf6;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a729f5, 0 0 0 4px rgba(167, 41, 245, 0.2);
  }

  @media (min-width: 768px) {
    padding: 32px;
    font-size: 28px;
    border-radius: 24px;
  }
`;

const BackToMenuButton = styled.button<{ $isDark: boolean }>`
  width: 100%;
  background-color: transparent;
  color: ${(props) => (props.$isDark ? "#FFFFFF" : "#313E51")};
  border: 2px solid ${(props) => (props.$isDark ? "#FFFFFF" : "#313E51")};
  border-radius: 12px;
  padding: 20px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$isDark ? "#FFFFFF" : "#313E51")};
    color: ${(props) => (props.$isDark ? "#313E51" : "#FFFFFF")};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a729f5, 0 0 0 4px rgba(167, 41, 245, 0.2);
  }

  @media (min-width: 768px) {
    padding: 32px;
    font-size: 28px;
    border-radius: 24px;
  }
`;

export default ResultsScreen;
