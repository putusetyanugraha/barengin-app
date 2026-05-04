import React from "react";
import HeroTabs from "./HeroTabs";
import HeroTripForm from "@/Components/TripSearchForm";
import HeroPergiForm from "@/Components/PergiBarengSearchForm";
import HeroJastipForm from "@/Components/JastipSearchForm";

export default function HeroSearchCard({ activeTab, setActiveTab }) {
    return (
        <div className="w-full bg-white rounded-2xl shadow-lg p-6">
            <HeroTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "trip" ? <HeroTripForm naked={false}/> : null}
            {activeTab === "pergi" ? <HeroPergiForm naked={false}/> : null}
            {activeTab === "jastip" ? <HeroJastipForm naked={false}/> : null}
        </div>
    );
}
