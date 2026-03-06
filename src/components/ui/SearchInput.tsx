import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import styles from "./SearchInput.module.css";

export default function SearchInput() {
  const [value, setValue] = useState<string>("");

  const clearInput = () => setValue("");

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Suche..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.input}
        onKeyDown={(e) => {
          if (e.key === "Escape") clearInput();
        }}
      />

      {value && (
        <button
          onClick={clearInput}
          className={styles.clearButton}
          aria-label="clear search"
        >
          <FaTimes />
        </button>
      )}

      <span className={styles.searchIcon}>
        <FaSearch />
      </span>
    </div>
  );
}