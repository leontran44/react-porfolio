import { useState } from 'react';

function ContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let validationErrors = {};

		if (!formData.name) validationErrors.name = 'Name is required';
		if (!formData.email) {
			validationErrors.email = 'Email is required';
		} else if (!validateEmail(formData.email)) {
			validationErrors.email = 'Please enter a valid email address';
		}
		if (!formData.message) validationErrors.message = 'Message is required';

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			console.log('Form submitted successfully', formData);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="name">Name</label>
				<input
					type="text"
					className={`form-control ${
						errors.name ? 'is-invalid' : ''
					}`}
					id="name"
					name="name"
					value={formData.name}
					onChange={handleInputChange}
				/>
				{errors.name && (
					<div className="invalid-feedback">{errors.name}</div>
				)}
			</div>
			<div className="form-group">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					className={`form-control ${
						errors.email ? 'is-invalid' : ''
					}`}
					id="email"
					name="email"
					value={formData.email}
					onChange={handleInputChange}
				/>
				{errors.email && (
					<div className="invalid-feedback">{errors.email}</div>
				)}
			</div>
			<div className="form-group">
				<label htmlFor="message">Message</label>
				<textarea
					className={`form-control ${
						errors.message ? 'is-invalid' : ''
					}`}
					id="message"
					name="message"
					value={formData.message}
					onChange={handleInputChange}
				/>
				{errors.message && (
					<div className="invalid-feedback">{errors.message}</div>
				)}
			</div>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
}

export default ContactForm;
