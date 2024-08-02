import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { fetchAgentsStart, fetchAgentsSuccess, fetchAgentsFailure } from "../../../redux/slice/agentsSlice";
import Heading from "../../common/Heading";
import { BASE_IMAGE_URL, BASE_URL } from "../../../constants/const";

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
            <Heading title="Our Featured Agents" subtitle="This is the top 10 agents" />
            <div className="container mx-auto px-4 overflow-x-auto">
                <div className="flex flex-wrap justify-center mt-6">
                    {agents.map((agent, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 m-4 flex flex-col items-center w-full sm:w-64">
                            <img
                                src={`${BASE_IMAGE_URL}/${agent.profile_picture}`}
                                alt={agent.name}
                                className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 mb-4"
                            />
                            <div className="text-center">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">{agent.name}</h4>
                                <p className="text-gray-600 mb-4 text-xs">{agent.email}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <a href={`mailto:${agent.email}`}
                                   className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600 transition duration-300">
                                    <i className="far fa-envelope"></i>
                                    <span>Mail</span>
                                </a>
                                <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-green-600 transition duration-300">
                                    <i className="fas fa-phone-alt"></i>
                                    <span>Call</span>
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
