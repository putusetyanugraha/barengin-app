import React from "react";

export default function Textarea({
    label,
    error,
    size = "md", // sm | md
    rounded = true,
    className = "",
    textareaClassName = "",
    wrapperClassName = "",

    leftIcon = null,
    rightIcon = null,
    rightAddon = null,

    rows = 4,

    ...props
}) {
    const textClass = "text-sm";
    const roundedClass = rounded ? "rounded-xl" : "";

    // for textarea, we use padding and a reasonable min-height
    const minHeightClass = size === "sm" ? "min-h-24" : "min-h-28";

    const hasLeftIcon = Boolean(leftIcon);
    const hasRight = Boolean(rightIcon || rightAddon);

    // icon at left-3 + icon box (w-5) -> pl-10
    const padding = [
        "px-4 py-3",
        hasLeftIcon ? "pl-10" : "",
        hasRight ? "pr-12" : "",
    ]
        .filter(Boolean)
        .join(" ");

    const baseTextarea =
        "w-full border border-neutral-400 bg-white text-neutral-700 placeholder:text-neutral-500 " +
        "focus:border-primary-700 focus:outline-none " +
        "disabled:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-70 " +
        "resize-none";

    const LeftIcon = () =>
        leftIcon ? (
            <div className="absolute left-3 top-3 text-neutral-500">
                <div className="flex h-5 w-5 items-center justify-center">
                    {leftIcon}
                </div>
            </div>
        ) : null;

    const RightIcon = () =>
        rightIcon ? (
            <div className="absolute right-3 top-3 text-neutral-500">
                <div className="flex h-5 w-5 items-center justify-center">
                    {rightIcon}
                </div>
            </div>
        ) : null;

    const RightAddon = () =>
        rightAddon ? (
            <div className="absolute right-3 top-3">{rightAddon}</div>
        ) : null;

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
                <LeftIcon />

                <textarea
                    rows={rows}
                    {...props}
                    className={[
                        baseTextarea,
                        minHeightClass,
                        textClass,
                        roundedClass,
                        padding,
                        textareaClassName,
                    ].join(" ")}
                />

                <RightIcon />
                <RightAddon />
            </div>

            {error ? (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            ) : null}
        </div>
    );
}
