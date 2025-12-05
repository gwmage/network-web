import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

// Basic validation functions (could be moved to a shared util)
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
const isNotEmpty = (value) => value.trim() !== '';

export const useSignupForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        contact: '',
    });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateField = useCallback((name, value) => {
        let error = '';
        switch (name) {
            case 'email':
                if (!isNotEmpty(value)) error = 'Email is required';
                else if (!validateEmail(value)) error = 'Invalid email format';
                break;
            case 'password':
                if (!isNotEmpty(value)) error = 'Password is required';
                else if (!validatePassword(value)) error = 'Password must be 8+ characters and include a letter, number, and special character.';
                break;
            case 'name':
                if (!isNotEmpty(value)) error = 'Name is required';
                break;
            case 'contact':
                if (!isNotEmpty(value)) error = 'Contact number is required';
                // A simple phone regex, can be improved
                else if (!/^\+?[1-9]\d{1,14}$/.test(value)) error = 'Invalid contact number format';
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [name]: error }));
    }, []);

    useEffect(() => {
        const formHasNoErrors = Object.values(errors).every(err => !err);
        const allFieldsFilled = Object.values(formData).every(val => isNotEmpty(val));
        setIsFormValid(formHasNoErrors && allFieldsFilled);
    }, [errors, formData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Final validation check
        Object.keys(formData).forEach(name => validateField(name, formData[name]));
        
        if (!isFormValid) {
            setErrors(prev => ({ ...prev, form: 'Please fix the errors before submitting.' }));
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.status === 201) {
                router.push('/login');
            } else {
                const errorData = await response.json();
                setErrors({ form: errorData.message || 'An unexpected error occurred.' });
            }
        } catch (error) {
            console.error('Signup error:', error);
            setErrors({ form: 'Could not connect to the server. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        isFormValid,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};