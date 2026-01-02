/**
 * ThemeToggle Component
 *
 * A toggle switch component for switching between dark and light themes.
 * Features sun/moon icons and a sliding toggle button with smooth animations.
 *
 * Features:
 * - Accessible with proper ARIA labels and roles
 * - Responsive sizing (mobile/tablet/desktop)
 * - Smooth animations and transitions
 * - Focus states for keyboard navigation
 * - Theme-aware icon colors
 */

import styled from "styled-components";

/**
 * Props for the ThemeToggle component
 */
interface ThemeToggleProps {
  /** Current theme state (true = dark mode, false = light mode) */
  isDark: boolean;
  /** Callback function triggered when toggle is clicked */
  onToggle: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (min-width: 768px) {
    gap: 16px;
  }
`;

const ThemeIcon = styled.img`
  width: 16px;
  height: 16px;

  @media (min-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

const ToggleButton = styled.button`
  position: relative;
  width: 32px;
  height: 20px;
  background-color: #a729f5;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #a729f5, 0 0 0 4px rgba(167, 41, 245, 0.2);
  }

  @media (min-width: 768px) {
    width: 48px;
    height: 28px;
  }
`;

const ToggleKnob = styled.div<{ $isDark: boolean }>`
  position: absolute;
  top: 4px;
  width: 12px;
  height: 12px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: transform 0.3s ease;
  transform: translateX(${(props) => (props.$isDark ? "16px" : "4px")});

  @media (min-width: 768px) {
    width: 20px;
    height: 20px;
    transform: translateX(${(props) => (props.$isDark ? "24px" : "4px")});
  }
`;

/**
 * ThemeToggle component that renders a theme switcher with icons
 *
 * @param isDark - Current theme state
 * @param onToggle - Function to call when toggle is clicked
 */
function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <Container>
      <ThemeIcon
        src={
          isDark
            ? "/Frontend-Quiz-app-with-React-and-TypeScript/images/icon-sun-light.svg"
            : "/Frontend-Quiz-app-with-React-and-TypeScript/images/icon-sun-dark.svg"
        }
        alt="Light mode"
      />

      <ToggleButton
        onClick={onToggle}
        aria-label="Toggle theme"
        role="switch"
        aria-checked={isDark}
      >
        <ToggleKnob $isDark={isDark} />
      </ToggleButton>

      <ThemeIcon
        src={
          isDark
            ? "/Frontend-Quiz-app-with-React-and-TypeScript/images/icon-moon-light.svg"
            : "/Frontend-Quiz-app-with-React-and-TypeScript/images/icon-moon-dark.svg"
        }
        alt="Dark mode"
      />
    </Container>
  );
}

export default ThemeToggle;
