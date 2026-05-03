import React from "react";
import { FaLocationDot, FaStar } from "react-icons/fa6";

export default function JastipCard({ product }) {
    return (
        <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-sm bg-white">
            <div className="relative h-48 bg-neutral-100">
                <span
                    className={[
                        "absolute top-2",
                        "right-2",
                        product.tagColor,
                        "text-white font-medium text-[10px] px-2 py-1 rounded-md",
                    ].join(" ")}
                >
                    {product.tag}
                </span>

                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover h-full w-full"
                />
            </div>

            <div className="p-4 text-neutral-700 border-t border-neutral-200">
                <h4 className="font-medium text-base mb-1">{product.name}</h4>
                <p className="font-semibold text-lg mb-3">{product.price}</p>

                <div className="text-sm text-neutral-600 mb-3 flex items-center gap-1">
                    <FaLocationDot />
                    Dari {product.from} ke <span className="font-semibold">{product.to}</span>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-200 pt-3 gap-1">
                    <div className="flex items-center gap-2 min-w-0">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcepRNPYMHpVkXIrKDmVD5imvvt2XuLxrEpKXTwiDADfNWFqkUzNROcaF34ImdhJA4KR2k6j-dESkKAeUGJGUm3lGAAhVQQ6z3NRs-Wg&s=10"
                            className="w-6 h-6 rounded-full"
                            alt="User"
                        />
                        <span className="text-sm text-neutral-600 truncate">
                            Oleh {product.author}
                        </span>
                    </div>

                    <div className="text-sm font-semibold flex items-center gap-1">
                        <FaStar className="text-warning-600" />
                        {product.rating}
                    </div>
                </div>
            </div>
        </div>
    );
}
