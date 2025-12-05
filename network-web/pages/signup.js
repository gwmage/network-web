import SignupForm from '../src/components/SignupForm';
import Head from 'next/head';

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Create a new account." />
      </Head>
      <SignupForm />
    </>
  );
}
---[END_OF_FILES]---