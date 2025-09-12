import { useState } from 'react';
import styles from '../styles.module.css';



export default function Login() {


  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <h1>Login</h1>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}