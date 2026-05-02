import React from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Select({
    label,
    error,
    size = "md", // sm | md
    rounded = true,
    className = "",
    selectClassName = "",
    wrapperClassName = "",
    children,
    ...props
}) {
    const heightClass = size === "sm" ? "h-11" : "h-12";
    const roundedClass = rounded ? "rounded-xl" : "";

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
                <select
                    {...props}
                    className={[
                        "w-full appearance-none border border-neutral-400 bg-white",
                        "text-sm text-neutral-700",
                        "px-4 pr-10",
                        heightClass,
                        roundedClass,
                        "focus:border-primary-700 focus:outline-none",
                        "disabled:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-70",
                        selectClassName,
                    ].join(" ")}
                >
                    {children}
                </select>

                <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-neutral-600" />
            </div>

            {error ? (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            ) : null}
        </div>
    );
}
