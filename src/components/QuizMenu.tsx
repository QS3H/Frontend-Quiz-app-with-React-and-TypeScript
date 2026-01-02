/**
 * QuizMenu Component
 *
 * Main menu screen that displays available quiz topics and allows users to:
 * - View all available quizzes (HTML, CSS, JavaScript, Accessibility)
 * - Select a quiz to begin taking it
 * - Toggle between dark and light themes
 * - See responsive background patterns
 *
 * Features:
 * - Responsive design (mobile, tablet, desktop)
 * - Theme-aware styling with dark/light mode support
 * - Accessibility-friendly with proper ARIA labels
 * - Smooth hover effects and animations
 */

import styled from "styled-components";
import { Quiz } from "../types";
import ThemeToggle from "./ThemeToggle";

/**
 * Props for the QuizMenu component
 */
interface QuizMenuProps {
  /** Array of available quizzes to display */
  quizzes: Quiz[];
  /** Callback function when a quiz is selected */
  onSelectQuiz: (quiz: Quiz) => void;
  /** Current theme state (dark/light mode) */
  isDark: boolean;
  /** Callback function to toggle theme */
  onToggleTheme: () => void;
}

/**
 * Helper function to get themed background color for quiz icons
 * Each quiz topic has a unique, brand-consistent color
 *
 * @param title - The quiz title (HTML, CSS, JavaScript, Accessibility)
 * @returns Hex color code for the icon background
 */
function getIconBgColor(title: string): string {
  const colors: Record<string, string> = {
    HTML: "#FFF1E9", // Warm orange background
    CSS: "#E0FDEF", // Mint green background
    JavaScript: "#EBF0FF", // Light blue background
    Accessibility: "#F6E7FF", // Light purple background
  };
  // Fallback to neutral gray if title doesn't match
  return colors[title] || "#E5E7EB";
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
  align-items: center;
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
  justify-content: flex-end;
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

const Main = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 32px;

  @media (min-width: 768px) {
    padding-bottom: 64px;
  }

  @media (min-width: 1024px) {
    align-items: center;
    padding-bottom: 0;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: flex-start;

  @media (min-width: 768px) {
    gap: 64px;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 9em;
    align-items: center;
    justify-content: space-between;
  }
`;

const WelcomeSection = styled.div`
  text-align: left;

  @media (min-width: 1024px) {
    flex: 1;
  }
`;

const Title = styled.h1<{ $isDark: boolean }>`
  font-size: 40px;
  line-height: 100%;
  color: ${(props) => (props.$isDark ? "#FFFFFF" : "#313E51")};

  @media (min-width: 768px) {
    font-size: 64px;
  }
`;

const TitleLight = styled.span`
  font-weight: 300;
`;

const TitleBold = styled.span`
  font-weight: 500;
`;

const Subtitle = styled.p`
  font-size: 14px;
  font-style: italic;
  color: #abc1e1;
  margin-top: 16px;

  @media (min-width: 768px) {
    font-size: 20px;
    margin-top: 48px;
  }
`;

const QuizList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  @media (min-width: 768px) {
    gap: 24px;
  }

  @media (min-width: 1024px) {
    width: 564px;
    flex-shrink: 0;
  }
`;

const QuizButton = styled.button<{ $isDark: boolean }>`
  width: 100%;
  background-color: ${(props) => (props.$isDark ? "#3B4D66" : "#FFFFFF")};
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 16px 40px rgba(143, 160, 193, 0.14);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 16px 40px rgba(143, 160, 193, 0.24);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a729f5, 0 0 0 4px rgba(167, 41, 245, 0.2);
  }

  @media (min-width: 768px) {
    border-radius: 24px;
    padding: 20px;
    gap: 32px;
  }
`;

const IconContainer = styled.div<{ $bgColor: string }>`
  background-color: ${(props) => props.$bgColor};
  border-radius: 6px;
  padding: 5px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    border-radius: 12px;
    padding: 8px;
  }
`;

const Icon = styled.img`
  width: 28px;
  height: 28px;

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const QuizTitle = styled.span<{ $isDark: boolean }>`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => (props.$isDark ? "#FFFFFF" : "#313E51")};

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

/**
 * Main QuizMenu component that renders the quiz selection interface
 *
 * @param quizzes - Array of available quizzes to display
 * @param onSelectQuiz - Function called when user selects a quiz
 * @param isDark - Current theme state for styling
 * @param onToggleTheme - Function to toggle between themes
 */
function QuizMenu({
  quizzes,
  onSelectQuiz,
  isDark,
  onToggleTheme,
}: QuizMenuProps) {
  return (
    <Container $isDark={isDark}>
      {/* Background Pattern - Desktop */}
      <BackgroundImage
        src={
          isDark
            ? "/assets/images/pattern-background-desktop-dark.svg"
            : "/assets/images/pattern-background-desktop-light.svg"
        }
        alt=""
        $display="desktop"
      />

      {/* Background Pattern - Tablet */}
      <BackgroundImage
        src={
          isDark
            ? "/assets/images/pattern-background-tablet-dark.svg"
            : "/assets/images/pattern-background-tablet-light.svg"
        }
        alt=""
        $display="tablet"
      />

      {/* Background Pattern - Mobile */}
      <BackgroundImage
        src={
          isDark
            ? "/assets/images/pattern-background-mobile-dark.svg"
            : "/assets/images/pattern-background-mobile-light.svg"
        }
        alt=""
        $display="mobile"
      />

      <ContentContainer>
        <Header>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </Header>

        <Main>
          <ContentWrapper>
            <WelcomeSection>
              <Title $isDark={isDark}>
                <TitleLight>Welcome to the</TitleLight>
                <br />
                <TitleBold>Frontend Quiz!</TitleBold>
              </Title>
              <Subtitle>Pick a subject to get started.</Subtitle>
            </WelcomeSection>

            <QuizList>
              {quizzes.map((quiz, index) => (
                <QuizButton
                  key={`quiz-${index}-${quiz.title}`}
                  type="button"
                  onClick={() => onSelectQuiz(quiz)}
                  aria-label={`Start ${quiz.title} quiz`}
                  $isDark={isDark}
                >
                  <IconContainer $bgColor={getIconBgColor(quiz.title)}>
                    <Icon src={quiz.icon} alt={`${quiz.title} icon`} />
                  </IconContainer>
                  <QuizTitle $isDark={isDark}>{quiz.title}</QuizTitle>
                </QuizButton>
              ))}
            </QuizList>
          </ContentWrapper>
        </Main>
      </ContentContainer>
    </Container>
  );
}

export default QuizMenu;
