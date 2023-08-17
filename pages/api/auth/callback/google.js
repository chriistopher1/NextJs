import { getSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

export default async function handler(req, res) {
  try {
    // Check if there's an existing session
    // const session = await getSession({ req });

    // if (session) {
    //   // If the user is already authenticated, redirect to the desired page
      res.redirect('/');
    //   return;
    // }

    // // If there's no existing session, initiate the Google authentication flow
    // await signIn('google', { callbackUrl: '/' });

    // Note: The signIn function above will handle the Google authentication flow,
    // including exchanging the authorization code for an access token.

    // After successful authentication, the user will be redirected to the main page.
  } catch (error) {
    console.error('Error during Google Sign-In:', error);
    res.status(500).end('Internal Server Error');
  }
}
