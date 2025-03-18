import React, { useState } from 'react';
import axios from 'axios';

const LeadForm = () => {
    const [source, setSource] = useState('');
    const [leadData, setLeadData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        industry: '',
        budget: '',
        timeline: '',
        requirements: '',
        propertyType: '',
        bhk: '',
        location: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeadData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/leads', {
                ...leadData,
                source
            });
            console.log('Lead submitted:', response.data);
            alert('Lead submitted successfully');
        } catch (error) {
            console.error('Error submitting lead:', error);
            alert('Failed to submit lead');
        }
    };

    return (
        <div>
            <h2>Add Lead</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={leadData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={leadData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    value={leadData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                />
                <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                >
                    <option value="">Select Source</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                    <option value="Web Form">Web Form</option>
                </select>
                <input
                    type="text"
                    name="company"
                    value={leadData.company}
                    onChange={handleChange}
                    placeholder="Company"
                />
                <input
                    type="text"
                    name="industry"
                    value={leadData.industry}
                    onChange={handleChange}
                    placeholder="Industry"
                />
                <input
                    type="number"
                    name="budget"
                    value={leadData.budget}
                    onChange={handleChange}
                    placeholder="Budget"
                />
                <input
                    type="text"
                    name="timeline"
                    value={leadData.timeline}
                    onChange={handleChange}
                    placeholder="Timeline"
                />
                <input
                    type="text"
                    name="requirements"
                    value={leadData.requirements}
                    onChange={handleChange}
                    placeholder="Requirements"
                />
                <select
                    name="propertyType"
                    value={leadData.propertyType}
                    onChange={handleChange}
                >
                    <option value="">Select Property Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Flat">Flat</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                </select>
                <input
                    type="text"
                    name="bhk"
                    value={leadData.bhk}
                    onChange={handleChange}
                    placeholder="BHK"
                />
                <input
                    type="text"
                    name="location"
                    value={leadData.location}
                    onChange={handleChange}
                    placeholder="Location"
                />
                <button type="submit">Submit Lead</button>
            </form>
        </div>
    );
};

export default LeadForm;
