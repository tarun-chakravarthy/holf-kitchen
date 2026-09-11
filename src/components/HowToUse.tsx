import { styles } from "../styles";

const STEPS = [
  "Tap the number to edit how much you have, or use the +/− buttons.",
  "Tap the 🔒 pill to set how much you need (the par level).",
  "Everything's checked by default — uncheck items you don't want to order.",
  'Tap "Review & export order" to copy the list or download it as CSV.',
];

interface HowToUseProps {
  onClose: () => void;
}

export function HowToUse({ onClose }: HowToUseProps) {
  return (
    <div style={styles.guideBanner}>
      <div style={styles.guideHeader}>
        <span style={styles.guideTitle}>How to use this sheet</span>
        <button style={styles.guideClose} onClick={onClose} aria-label="Close guide">
          ×
        </button>
      </div>
      <ol style={styles.guideList}>
        {STEPS.map((step, i) => (
          <li key={i} style={styles.guideStep}>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
