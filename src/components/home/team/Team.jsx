import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { fetchAgentsStart, fetchAgentsSuccess, fetchAgentsFailure } from "../../../redux/slice/agentsSlice";
import Heading from "../../common/Heading";
import {BASE_URL} from "../../../constants/const";

const Team = () => {
    const dispatch = useDispatch();
    const { agents, error, loading } = useSelector((state) => state.agents);

    useEffect(() => {
        fetchAgents();
    }, []);


    const fetchAgents = async () => {
        dispatch(fetchAgentsStart());
        try {
            const response = await axios.get(`${BASE_URL}/KPI/top-ten-agents`);
            dispatch(fetchAgentsSuccess(response.data));
        } catch (error) {
            console.error("Fetch Agents Error:", error);
            dispatch(fetchAgentsFailure(error.response?.data?.message || "Failed to fetch agents"));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className="team bg-gray-200 py-12">
            <Heading title="Our Featured Agents" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." />
            <div className="container mx-auto px-4 overflow-x-auto">
                <div className="flex flex-nowrap mt-6">
                    {agents.map((agent, index) => (
                        <div key={index} className="bg-white rounded shadow p-6 mr-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold">{agent.name}</h4>
                                    <p className="text-gray-600">{agent.email}</p>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
                                    <i className="far fa-envelope mr-2"></i>
                                    Message
                                </button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
                                    <i className="fas fa-phone-alt mr-2"></i>
                                    Call
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Team;
