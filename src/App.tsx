import { useState } from "react";
import type { CategoryId, DerivedStockItem, OrderRecord, StockItem } from "./types";
import { CATEGORY_ORDER, STATUS_META, sortDrinksItems } from "./constants";
import { computeStatus, neededQty, uid, formatOrderText } from "./utils";
import { useKitchenStorage } from "./useKitchenStorage";
import { exportOrderCsv } from "./exportCsv";
import { ItemRow } from "./components/ItemRow";
import { CategoryTab } from "./components/CategoryTab";
import { HowToUse } from "./components/HowToUse";
import { styles } from "./styles";

const GUIDE_DISMISSED_KEY = "kitchen-guide-dismissed";

function loadGuideVisible(): boolean {
  try {
    return localStorage.getItem(GUIDE_DISMISSED_KEY) !== "1";
  } catch {
    return true;
  }
}

function withDerived(item: StockItem): DerivedStockItem {
  const status = computeStatus(item.current, item.required);
  const checked = item.checkedOverride === null ? true : item.checkedOverride;
  return { ...item, status, checked };
}

const SYNC_LABEL: Record<string, string> = {
  loading: "loading…",
  saving: "saving…",
  saved: "saved",
  error: "sync issue",
};

export default function App() {
  const { items, categoryLabels, updateItems, renameCategory, status } = useKitchenStorage();
  const [activeCategory, setActiveCategory] = useState<CategoryId | "All">("All");
  const [addingTo, setAddingTo] = useState<CategoryId | null>(null);
  const [newName, setNewName] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newRequired, setNewRequired] = useState("");
  const [newCurrent, setNewCurrent] = useState("");
  const [orderList, setOrderList] = useState<OrderRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(loadGuideVisible);

  const dismissGuide = () => {
    setShowGuide(false);
    try {
      localStorage.setItem(GUIDE_DISMISSED_KEY, "1");
    } catch {
      // best-effort only — losing this preference just means the guide reappears next visit
    }
  };

  const patch = (id: string, fields: Partial<StockItem>) =>
    updateItems(items.map((it) => (it.id === id ? { ...it, ...fields } : it)));

  const removeItem = (id: string) => updateItems(items.filter((it) => it.id !== id));

  const addItem = (categoryId: CategoryId) => {
    if (!newName.trim()) return;
    updateItems([
      ...items,
      {
        id: uid(),
        name: newName.trim(),
        unit: newUnit.trim() || "units",
        required: newRequired === "" ? "" : Number(newRequired),
        current: newCurrent === "" ? 0 : Number(newCurrent),
        categoryId,
        note: "",
        locked: newRequired !== "",
        checkedOverride: null,
      },
    ]);
    setNewName("");
    setNewUnit("");
    setNewRequired("");
    setNewCurrent("");
    setAddingTo(null);
  };

  const derivedItems = items.map(withDerived);

  const generateOrder = () => {
    const chosen = CATEGORY_ORDER.flatMap((cat) => {
      const rows = derivedItems.filter((it) => it.checked && neededQty(it) > 0 && it.categoryId === cat);
      return cat === "drinks" ? sortDrinksItems(rows) : rows;
    });
    const record: OrderRecord = {
      id: uid(),
      timestamp: new Date().toISOString(),
      items: chosen.map((it) => ({
        name: it.name,
        unit: it.unit,
        required: it.required,
        current: it.current,
        needed: neededQty(it),
        status: it.status,
        categoryId: it.categoryId,
      })),
    };
    setOrderList(record);
  };

  const copyOrder = async () => {
    if (!orderList) return;
    try {
      await navigator.clipboard.writeText(formatOrderText(orderList, categoryLabels));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard access denied — nothing actionable to do here
    }
  };

  const grouped = CATEGORY_ORDER.map((cat) => {
    const rows = derivedItems.filter((it) => it.categoryId === cat);
    return { category: cat, rows: cat === "drinks" ? sortDrinksItems(rows) : rows };
  });
  const visibleGroups = activeCategory === "All" ? grouped : grouped.filter((g) => g.category === activeCategory);
  const visibleItems = visibleGroups.flatMap((g) => g.rows);
  const allVisibleChecked = visibleItems.length > 0 && visibleItems.every((it) => it.checked);

  const toggleSelectAll = () => {
    const visibleIds = new Set(visibleItems.map((it) => it.id));
    updateItems(items.map((it) => (visibleIds.has(it.id) ? { ...it, checkedOverride: !allVisibleChecked } : it)));
  };

  const checkedCount = derivedItems.filter((it) => it.checked && neededQty(it) > 0).length;
  const outCount = derivedItems.filter((it) => it.status === "out").length;
  const unsetCount = derivedItems.filter((it) => it.status === "unset").length;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.kicker}>Kitchen Stock Sheet</div>
          <h1 style={styles.title}>What&apos;s left on the shelf</h1>
        </div>
        <div style={styles.headerRight}>
          {outCount > 0 && <div style={styles.urgentPill}>{outCount} out of stock</div>}
          {unsetCount > 0 && <div style={styles.unsetPill}>{unsetCount} need a par level</div>}
          <div style={styles.savePill}>{SYNC_LABEL[status]}</div>
          <button style={styles.helpBtn} onClick={() => setShowGuide(true)} title="How to use this sheet" aria-label="How to use this sheet">
            ?
          </button>
        </div>
      </header>

      {showGuide && <HowToUse onClose={dismissGuide} />}

      <nav style={styles.tabs}>
        <CategoryTab
          label="All"
          active={activeCategory === "All"}
          renamable={false}
          onSelect={() => setActiveCategory("All")}
        />
        {CATEGORY_ORDER.map((cat) => (
          <CategoryTab
            key={cat}
            label={categoryLabels[cat]}
            active={activeCategory === cat}
            renamable
            onSelect={() => setActiveCategory(cat)}
            onRename={(nextLabel) => renameCategory(cat, nextLabel)}
          />
        ))}
      </nav>

      {visibleItems.length > 0 && (
        <div style={styles.selectAllRow}>
          <button style={styles.selectAllBtn} onClick={toggleSelectAll}>
            {allVisibleChecked ? "Unselect all" : "Select all"}
          </button>
        </div>
      )}

      <div style={styles.columnHeaders}>
        <span style={styles.colHeadLeft}>Current</span>
        <span style={styles.colHeadMiddle}>Required</span>
        <span style={styles.colHeadRight}>Stock level</span>
      </div>

      <main style={styles.main}>
        {visibleGroups.map((group) => (
          <section key={group.category} style={styles.section}>
            <h2 style={styles.sectionTitle}>{categoryLabels[group.category]}</h2>
            <div style={styles.rowsWrap}>
              {group.rows.map((it) => (
                <ItemRow key={it.id} item={it} onPatch={(f) => patch(it.id, f)} onRemove={() => removeItem(it.id)} />
              ))}
            </div>

            {addingTo === group.category ? (
              <div style={styles.addForm}>
                <input
                  autoFocus
                  placeholder="Item name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={styles.addInput}
                />
                <input
                  placeholder="Unit, e.g. bags"
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  style={{ ...styles.addInput, flex: "1 1 90px" }}
                />
                <input
                  placeholder="Required"
                  type="number"
                  value={newRequired}
                  onChange={(e) => setNewRequired(e.target.value)}
                  style={{ ...styles.addInput, flex: "1 1 80px" }}
                />
                <input
                  placeholder="Current"
                  type="number"
                  value={newCurrent}
                  onChange={(e) => setNewCurrent(e.target.value)}
                  style={{ ...styles.addInput, flex: "1 1 80px" }}
                />
                <button style={styles.addSave} onClick={() => addItem(group.category)}>
                  Add item
                </button>
                <button
                  style={styles.addCancel}
                  onClick={() => {
                    setAddingTo(null);
                    setNewName("");
                    setNewUnit("");
                    setNewRequired("");
                    setNewCurrent("");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button style={styles.addTrigger} onClick={() => setAddingTo(group.category)}>
                + Add item to {categoryLabels[group.category]}
              </button>
            )}
          </section>
        ))}
      </main>

      <div style={styles.footerBar}>
        <div style={styles.footerCount}>
          {checkedCount} item{checkedCount === 1 ? "" : "s"} need{checkedCount === 1 ? "s" : ""} ordering
        </div>
        <button
          style={{ ...styles.submitBtn, opacity: checkedCount === 0 ? 0.5 : 1 }}
          disabled={checkedCount === 0}
          onClick={generateOrder}
        >
          Review &amp; export order
        </button>
      </div>

      {orderList && (
        <div style={styles.modalOverlay} onClick={() => setOrderList(null)}>
          <div style={styles.ticket} onClick={(e) => e.stopPropagation()}>
            <div style={styles.ticketHeaderWrap}>
              <div style={styles.ticketHeader}>
                <div style={styles.ticketTitle}>ORDER LIST</div>
                <div style={styles.ticketDate}>
                  {new Date(orderList.timestamp).toLocaleString([], {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div style={styles.ticketDivider} />
            </div>
            <div style={styles.ticketBody}>
              {CATEGORY_ORDER.filter((cat) => orderList.items.some((it) => it.categoryId === cat)).map((cat) => (
                <div key={cat} style={{ marginBottom: 14 }}>
                  <div style={styles.ticketCategory}>{categoryLabels[cat]}</div>
                  {orderList.items
                    .filter((it) => it.categoryId === cat)
                    .map((it, i) => (
                      <div key={i} style={styles.ticketRow}>
                        <span>{it.name}</span>
                        <span style={styles.ticketQty}>
                          <span style={{ fontWeight: 700, color: STATUS_META[it.status].color }}>
                            Order {it.needed} {it.unit}
                          </span>
                          <span style={styles.ticketQtySub}>
                            {it.current === 0 ? "(out of stock)" : `(only ${it.current} left in stock)`}
                          </span>
                        </span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
            <div style={styles.ticketFooter}>
              <div style={styles.ticketDivider} />
              <div style={styles.ticketActions}>
                <button style={styles.ticketCopy} onClick={copyOrder}>
                  {copied ? "Copied ✓" : "Copy list"}
                </button>
                <button style={styles.ticketExport} onClick={() => exportOrderCsv(orderList, categoryLabels)}>
                  Export CSV
                </button>
              </div>
              <button style={styles.ticketClose} onClick={() => setOrderList(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
