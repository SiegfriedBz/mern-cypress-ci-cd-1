import React, { useEffect, useState } from 'react'
import "./Rewards.css"
import axios from "axios"

function Rewards() {

    const [rewards, setReward] = useState<{
        id: number,
        reward: string,
        month: string
    }[]>([]);

    const [filteredRewards, setFilteredRewards] = useState(rewards);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        let updatedFilterRewards = rewards.filter((reward) => {
            if(filter === "All") return true
            return reward.month === filter
        });
        setFilteredRewards(updatedFilterRewards);
    }, [filter, rewards]);

    useEffect(() => {
        fetchRewards()
    }, []);

    const fetchRewards = async () => {
        const response = await axios.get("http://localhost:4000/api/rewards");
        console.log(response.data.rewards)
        setReward(response.data.rewards)
    }

    return (
        <div className="Rewards">
            <div className="Rewards__heading-container">
                <h2 className="Rewards-header">Rewards</h2>
            </div>
            <div className="Rewards-cards-container">
                <select className="Rewards-dropdown" onChange={(e) => setFilter(e.target.value)}>
                    <option>All</option>
                    <option>January</option>
                    <option>Feburary</option>
                    <option>March</option>
                </select>
            </div>
            <ul className="Rewards-cards-container">
                {filteredRewards.map(reward => {
                    return (
                        <li key={reward.id}
                            className="Rewards-cards-list">
                            {reward.reward}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Rewards
