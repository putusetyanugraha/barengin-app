import {Link} from "@inertiajs/react";

export default function Button({
    isButtonLink = false,
    href = "",
    type = "primary",
    onClick = () => {},
    children,
}) {
    let colorClass = "";
    if (type === "primary") {
        colorClass = "bg-primary-700 hover:bg-primary-600";
    } else if (type === "danger") {
        colorClass = "bg-danger-700 hover:bg-danger-600";
    } else if (type === "success") {
        colorClass = "bg-success-700 hover:bg-success-600";
    } else if (type === "warning") {
        colorClass = "bg-warning-700 hover:bg-warning-600";
    }

    if (isButtonLink) {
        return (
            <Link
                href={href}
                className={`inline-flex items-center px-4 py-2 ${colorClass} transition-colors duration-300 text-white cursor-pointer`}
            >
                {children}
            </Link>
        );
    }
    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center px-4 py-2 ${colorClass} transition-colors duration-300 text-white cursor-pointer`}
        >
            {children}
        </button>
    );
}
