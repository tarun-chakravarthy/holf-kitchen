import { useState } from "react";
import type { DerivedStockItem, StockItem } from "../types";
import { STATUS_META } from "../constants";
import { clamp0, ratioOf } from "../utils";
import { styles } from "../styles";

interface ItemRowProps {
  item: DerivedStockItem;
  onPatch: (fields: Partial<StockItem>) => void;
  onRemove: () => void;
}

export function ItemRow({ item, onPatch, onRemove }: ItemRowProps) {
  const [editingCurrent, setEditingCurrent] = useState(false);
  const [currentDraft, setCurrentDraft] = useState(String(item.current));
  const [editingRequired, setEditingRequired] = useState(false);
  const [requiredDraft, setRequiredDraft] = useState(String(item.required));
  const [justLocked, setJustLocked] = useState(false);

  const meta = STATUS_META[item.status];
  const pct = Math.round(ratioOf(item.current, item.required) * 100);

  const commitCurrent = () => {
    const val = currentDraft === "" ? 0 : Number(currentDraft);
    onPatch({ current: Number.isNaN(val) ? item.current : clamp0(val) });
    setEditingCurrent(false);
  };

  const step = (delta: number) => onPatch({ current: clamp0((Number(item.current) || 0) + delta) });

  const openParEditor = () => {
    if (!item.locked) return;
    setRequiredDraft(item.required === "" ? "" : String(item.required));
    onPatch({ locked: false });
    setEditingRequired(true);
  };

  const commitRequired = () => {
    const val: number | "" = requiredDraft === "" ? "" : Number(requiredDraft);
    onPatch({ required: typeof val === "number" && Number.isNaN(val) ? item.required : val, locked: true });
    setEditingRequired(false);
    setJustLocked(true);
    setTimeout(() => setJustLocked(false), 700);
  };

  const toggleCheck = () => onPatch({ checkedOverride: !item.checked });

  return (
    <div style={{ ...styles.row, background: meta.bg, borderColor: meta.track }}>
      <button style={styles.removeBtn} onClick={onRemove} title="Remove item" aria-label="Remove item">
        ×
      </button>

      <div style={styles.rowHeaderLine}>
        <span style={styles.rowName}>{item.name}</span>
        {item.note ? <span style={styles.rowNote}>{item.note}</span> : null}
      </div>

      <div style={styles.threeCol}>
        <div style={styles.colLeft}>
          <label style={styles.checkboxWrap}>
            <input type="checkbox" checked={item.checked} onChange={toggleCheck} style={styles.checkbox} />
          </label>
          <div style={styles.stepper}>
            <button style={styles.stepBtn} onClick={() => step(-1)} aria-label="Decrease">
              –
            </button>
            {editingCurrent ? (
              <input
                autoFocus
                type="number"
                value={currentDraft}
                onChange={(e) => setCurrentDraft(e.target.value)}
                onFocus={(e) => e.target.select()}
                onBlur={commitCurrent}
                onKeyDown={(e) => e.key === "Enter" && commitCurrent()}
                style={styles.stepInput}
              />
            ) : (
              <button
                style={styles.stepValue}
                onClick={() => {
                  setCurrentDraft(String(item.current));
                  setEditingCurrent(true);
                }}
              >
                {item.current}
              </button>
            )}
            <button style={styles.stepBtn} onClick={() => step(1)} aria-label="Increase">
              +
            </button>
          </div>
          <span style={styles.unitTag}>{item.unit}</span>
        </div>

        <div style={styles.colMiddle}>
          {editingRequired ? (
            <input
              autoFocus
              type="number"
              value={requiredDraft}
              onChange={(e) => setRequiredDraft(e.target.value)}
              onFocus={(e) => e.target.select()}
              onBlur={commitRequired}
              onKeyDown={(e) => e.key === "Enter" && commitRequired()}
              style={styles.parInputActive}
            />
          ) : (
            <button
              style={{ ...styles.parPill, ...(justLocked ? styles.parPillFlash : {}) }}
              onClick={openParEditor}
              title="Tap to change the par level"
            >
              <span style={styles.lockIcon}>🔒</span>
              {item.required === "" ? "set" : item.required}
            </button>
          )}
        </div>

        <div style={styles.colRight}>
          <div style={styles.gaugeTrack}>
            <div
              style={{
                ...styles.gaugeFill,
                height: `${item.status === "unset" ? 0 : pct}%`,
                background: meta.color,
              }}
            />
          </div>
          <span style={{ ...styles.gaugeLabel, color: meta.color }}>{meta.label}</span>
        </div>
      </div>
    </div>
  );
}
