import React from "react";

/**
 * Container
 * Centralized responsive page padding + max width.
 *
 * Default classes:
 * - max-w-7xl (1280px) mx-auto
 * - py-2
 * - px-4 sm:px-6 lg:px-8
 *
 * Usage:
 * <Container>
 *   ...
 * </Container>
 *
 * Or override padding/spacing:
 * <Container className="py-6">
 *   ...
 * </Container>
 */
export default function Container({ as: Component = "div", className = "", children, ...props }) {
    return (
        <Component
            className={[
                "max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8",
                className,
            ].join(" ")}
            {...props}
        >
            {children}
        </Component>
    );
}