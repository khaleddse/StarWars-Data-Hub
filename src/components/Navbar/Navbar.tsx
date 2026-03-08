import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { navLinks } from "./navLinks";
import SearchInput from "../ui/SearchInput";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/star-wars.svg";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <header className={styles.navbar}>
            <div className={styles.container}>

                {/* Logo */}
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="Star Wars" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className={`${styles.nav} ${isOpen ? styles.active : ""}`}>
                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.path} className={styles.link}>
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Search */}
                <div className={styles.search}>
                    <SearchInput />
                </div>

                {/* Mobile Menu Button */}
                <button className={styles.menuButton} onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

            </div>
        </header>
    );
};

export default Navbar; 