import React from "react";
import styles from "./Chips.module.css";

export default function Chips({ title, onClick, disabled }: { title: string; onClick?: () => void, disabled: boolean }) {
    return (
        <div className={styles.chips}>
            <span
                className={disabled ? `${styles.chip} ${styles.disabledChip}` : styles.chip}
                onClick={onClick}
            >
                {title}
            </span>
        </div>

    );
}