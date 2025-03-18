import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeadList = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/leads');
                setLeads(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leads:', error);
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    if (loading) {
        return <div>Loading leads...</div>;
    }

    if (leads.length === 0) {
        return <div>No leads found</div>;
    }

    return (
        <div>
            <h2>Leads</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Source</th>
                        <th>Score</th>
                        <th>Budget</th>
                        <th>Location</th>
                        <th>Property Type</th>
                        <th>BHK</th>
                        <th>Timeline</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead._id}>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phone}</td>
                            <td>{lead.source}</td>
                            <td>{lead.score}</td>
                            <td>{lead.budget || '-'}</td>
                            <td>{lead.location || '-'}</td>
                            <td>{lead.propertyType || '-'}</td>
                            <td>{lead.bhk || '-'}</td>
                            <td>{lead.timeline || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeadList;
