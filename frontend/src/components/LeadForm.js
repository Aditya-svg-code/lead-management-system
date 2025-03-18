import { useState } from 'react';
import axios from 'axios';

const LeadForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        industry: '',
        budget: '',
        timeline: '',
        requirements: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/leads', formData);
            console.log('Lead submitted:', response.data);
            alert('Lead submitted successfully');
        } catch (error) {
            console.error('Error submitting lead:', error.response?.data?.message || error.message);
            alert('Failed to submit lead');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
            <input name="industry" value={formData.industry} onChange={handleChange} placeholder="Industry" />
            <input name="budget" value={formData.budget} onChange={handleChange} placeholder="Budget" />
            <input name="timeline" value={formData.timeline} onChange={handleChange} placeholder="Timeline" />
            <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Requirements"></textarea>
            <button type="submit">Submit</button>
        </form>
    );
};

export default LeadForm;
