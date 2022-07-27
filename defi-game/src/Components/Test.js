import React, { useEffect } from "react";
//import "./Test.css";

export default function Test() {
    useEffect(() => { }, []);

    return (
        <main class="page-content">
            <div class="card" style={{ backgroundImage: "url(/char_select/Artic.png)" }}>
                <div class="content">
                    <h2 class="title">Mountain View</h2>
                    <div>dsad</div>
                </div>
            </div>
            <div class="card">
                <div class="content">
                    <h2 class="title">To The Beach</h2>
                    <p class="copy">Plan your next beach trip with these fabulous destinations</p>
                    <button class="btn">View Trips</button>
                </div>
            </div>
            <div class="card">
                <div class="content">
                    <h2 class="title">Desert Destinations</h2>
                    <p class="copy">It's the desert you've always dreamed of</p>
                    <button class="btn">Book Now</button>
                </div>
            </div>
        </main>
    );
}
