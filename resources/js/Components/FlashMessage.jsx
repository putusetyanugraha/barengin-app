import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { FiX } from "react-icons/fi";

export default function FlashMessageInline({ className = "" }) {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(true);

    const message = flash?.message;
    const type = (flash?.type || "info").toLowerCase();

    useEffect(() => {
        setVisible(true);
    }, [message, type]);

    if (!message || !visible) return null;

    const tone = (() => {
        if (type === "success")
            return {
                wrap: "border-success-300 bg-success-100 text-success-700",
                divider: "bg-success-300",
                btn: "text-success-700 hover:bg-success-100",
            };

        if (type === "warning")
            return {
                wrap: "border-warning-300 bg-warning-100 text-warning-700",
                divider: "bg-warning-300",
                btn: "text-warning-700 hover:bg-warning-100",
            };

        if (type === "info")
            return {
                wrap: "border-primary-300 bg-primary-100 text-primary-700",
                divider: "bg-primary-300",
                btn: "text-primary-700 hover:bg-primary-100",
            };

        // error
        return {
            wrap: "border-danger-300 bg-danger-100 text-danger-700",
            divider: "bg-danger-300",
            btn: "text-danger-700 hover:bg-danger-100",
        };
    })();

    return (
        <div className={["w-full", className].join(" ")}>
            <div
                className={[
                    "mx-auto flex w-full items-center justify-between gap-3",
                    "rounded-xl border px-4 py-3",
                    "text-sm font-medium",
                    tone.wrap,
                ].join(" ")}
                role="alert"
                aria-live="polite"
            >
                <p className="min-w-0 flex-1 truncate sm:whitespace-normal">
                    {message}
                </p>

                <div className={["h-6 w-px", tone.divider].join(" ")} />

                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    className={[
                        "inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer",
                        tone.btn,
                    ].join(" ")}
                    aria-label="Close"
                >
                    <FiX className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}