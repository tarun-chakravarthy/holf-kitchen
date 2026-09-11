import { useState } from "react";
import { styles } from "../styles";

interface CategoryTabProps {
  label: string;
  active: boolean;
  renamable: boolean;
  onSelect: () => void;
  onRename?: (nextLabel: string) => void;
}

export function CategoryTab({ label, active, renamable, onSelect, onRename }: CategoryTabProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(label);

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== label) onRename?.(trimmed);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onFocus={(e) => e.target.select()}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setDraft(label);
            setEditing(false);
          }
        }}
        style={styles.tabInput}
      />
    );
  }

  return (
    <button
      onClick={onSelect}
      onDoubleClick={
        renamable
          ? () => {
              setDraft(label);
              setEditing(true);
            }
          : undefined
      }
      title={renamable ? "Double-click to rename" : undefined}
      style={{ ...styles.tab, ...(active ? styles.tabActive : {}) }}
    >
      {label}
    </button>
  );
}
