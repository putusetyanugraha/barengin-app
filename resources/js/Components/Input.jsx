import React from "react";

/**
 * Reusable Input component (text, email, password, number, date, etc)
 *
 * Props:
 * - id, name, type, value, onChange, placeholder, autoComplete, disabled, required, etc.
 * - label: string (optional)
 * - error: string (optional)
 * - size: "sm" | "md" (padding only)
 * - rounded: boolean (default true) -> rounded-xl when true
 * - leftIcon / rightIcon: ReactNode (optional)
 * - rightAddon: ReactNode (optional) (e.g. eye toggle button)
 */
export default function Input({
    label,
    error,
    size = "md",
    rounded = true,
    className = "",
    inputClassName = "",
    leftIcon = null,
    rightIcon = null,
    rightAddon = null,
    wrapperClassName = "",
    ...props
}) {
    const sizeClass = size === "sm" ? "h-11 px-4 text-sm" : "h-12 px-4 text-sm";
    const roundedClass = rounded ? "rounded-lg" : "";

    const hasLeft = Boolean(leftIcon);
    const hasRight = Boolean(rightIcon || rightAddon);

    const inputPadding = [hasLeft ? "pl-11" : "", hasRight ? "pr-12" : ""]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={wrapperClassName}>
            {label ? (
                <label
                    htmlFor={props.id}
                    className="mb-2 block text-sm text-neutral-700"
                >
                    {label}
                </label>
            ) : null}

            <div className={["relative", className].join(" ")}>
                {leftIcon ? (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                        {leftIcon}
                    </div>
                ) : null}

                <input
                    {...props}
                    className={[
                        "w-full border border-neutral-400 bg-white text-neutral-700 placeholder:text-neutral-500",
                        "focus:border-primary-700 focus:outline-none",
                        "disabled:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-70",
                        roundedClass,
                        sizeClass,
                        inputPadding,
                        inputClassName,
                    ].join(" ")}
                />

                {rightIcon ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
                        {rightIcon}
                    </div>
                ) : null}

                {rightAddon ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {rightAddon}
                    </div>
                ) : null}
            </div>

            {error ? (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            ) : null}
        </div>
    );
}
