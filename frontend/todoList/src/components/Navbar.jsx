// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setThemes } from '../features/themes';
import { themeMap } from '../constants/themeMap';
import { SquareMenu, X, Circle } from 'lucide-react';

export default function Navbar() {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const themeButtons = Object.entries(themeMap).map(([name, theme]) => (
        <button
            key={name}
            onClick={() => dispatch(setThemes(theme))}
            className="mx-1"
        >
            <Circle
                size={18}
                fill={theme.primaryColor.includes('black') ? 'black' : name}
                className="inline"
            />
        </button>
    ));

    return (
        <header className={`${currentTheme.primaryColor} shadow-md`}>
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo + Theme buttons */}
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">Todo List</h1>
                    <div className="flex">{themeButtons}</div>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-6 text-sm font-medium">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/about" className="hover:underline">About</a></li>
                </ul>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                    {isMenuOpen ? <X size={28} /> : <SquareMenu size={28} />}
                </button>
            </nav>

            {/* Mobile Dropdown Menu */}
            <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'} bg-white px-4 py-2`}>
                <ul className="flex flex-col gap-3 text-sm font-medium text-black">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/about" className="hover:underline">About</a></li>
                </ul>
            </div>
        </header>
    );
}
