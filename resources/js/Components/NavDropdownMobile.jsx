import { FaChevronDown } from "react-icons/fa";

/**
 * Mobile accordion dropdown for the navbar.
 *
 * Usage:
 * <NavDropdownMobile
 *   label="Jalan Bareng"
 *   isOpen={isOpen}
 *   onToggle={() => setIsOpen(v => !v)}
 * >
 *   ...children (links)
 * </NavDropdownMobile>
 */
export default function NavDropdownMobile({
    label,
    isOpen = false,
    onToggle = () => {},
    children,
    className = "",
    buttonClassName = "",
    contentClassName = "",
    chevronClassName = "",
    ariaLabel,
}) {
    return (
        <div className={className}>
            <button
                type="button"
                onClick={onToggle}
                className={[
                    "w-full flex justify-between items-center rounded-md text-base font-medium",
                    "text-neutral-700 hover:text-primary-700 focus:outline-none transition-colors cursor-pointer",
                    "px-3 py-2",
                    buttonClassName,
                ].join(" ")}
                aria-expanded={isOpen}
                aria-label={ariaLabel || label}
            >
                <span>{label}</span>
                <FaChevronDown
                    className={[
                        "text-neutral-600 transition-transform duration-200",
                        isOpen ? "rotate-180" : "",
                        chevronClassName,
                    ].join(" ")}
                />
            </button>

            {isOpen && (
                <div
                    className={["mt-2 pl-2 space-y-1", contentClassName].join(
                        " ",
                    )}
                >
                    {children}
                </div>
            )}
        </div>
    );
}
