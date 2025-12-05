import React from 'react';
import { useSignupForm } from '../hooks/useSignupForm';
import styles from '../styles/SignupForm.module.css';

export default function SignupForm() {
    const {
        formData,
        errors,
        isLoading,
        isFormValid,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useSignupForm();

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <h1>Create Account</h1>

                <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} required className={`${styles.input} ${errors.name ? styles.inputError : ''}`} />
                    {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required className={`${styles.input} ${errors.email ? styles.inputError : ''}`} />
                    {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} required className={`${styles.input} ${errors.password ? styles.inputError : ''}`} />
                    {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="contact" className={styles.label}>Contact Number</label>
                    <input type="tel" id="contact" name="contact" value={formData.contact} onChange={handleChange} onBlur={handleBlur} required className={`${styles.input} ${errors.contact ? styles.inputError : ''}`} />
                    {errors.contact && <p className={styles.errorMessage}>{errors.contact}</p>}
                </div>
                
                {errors.form && <p className={styles.errorMessage}>{errors.form}</p>}

                <button type="submit" className={styles.submitButton} disabled={!isFormValid || isLoading}>
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <div className={styles.socialButtons}>
                    <a href="/api/auth/google" className={`${styles.socialButton} ${styles.googleButton}`}>
                        Sign up with Google
                    </a>
                    <a href="/api/auth/kakao" className={`${styles.socialButton} ${styles.kakaoButton}`}>
                        Sign up with Kakao
                    </a>
                </div>
            </form>
        </div>
    );
}