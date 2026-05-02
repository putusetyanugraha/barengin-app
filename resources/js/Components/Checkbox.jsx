import React from "react";

export default function Checkbox({
    id,
    name,
    checked = false,
    onChange = () => {},
    label, // optional
    disabled = false,
    size = "md", // sm | md
    className = "",
    labelClassName = "",
    error,
    help,
    ...props
}) {
    const boxSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

    // If no label, render just the checkbox (no extra spacing)
    if (!label) {
        return (
            <div className={className}>
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.checked, e)}
                    className={[
                        boxSize,
                        "rounded border-neutral-300 text-primary-700",
                        "focus:ring-primary-700",
                        disabled
                            ? "cursor-not-allowed opacity-70"
                            : "cursor-pointer",
                    ].join(" ")}
                    {...props}
                />

                {help ? (
                    <p className="mt-1 text-xs text-neutral-500">{help}</p>
                ) : null}

                {error ? (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                ) : null}
            </div>
        );
    }

    // With label (default)
    return (
        <div className={className}>
            <label
                htmlFor={id}
                className={[
                    "flex items-center gap-2 text-sm text-neutral-700",
                    disabled
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer",
                    labelClassName,
                ].join(" ")}
            >
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.checked, e)}
                    className={[
                        boxSize,
                        "rounded border-neutral-300 text-primary-700",
                        "focus:ring-primary-700",
                        disabled ? "cursor-not-allowed" : "cursor-pointer",
                    ].join(" ")}
                    {...props}
                />
                <span>{label}</span>
            </label>

            {help ? (
                <p className="mt-1 text-xs text-neutral-500">{help}</p>
            ) : null}
            {error ? (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            ) : null}
        </div>
    );
}
