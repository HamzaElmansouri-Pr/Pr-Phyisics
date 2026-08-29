'use server';

import { createClient } from '@/lib/supabase/server';

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string;
  const adminEmail = process.env.ADMIN_EMAIL;

  // Artificial delay to mitigate timing attacks (makes it harder to guess 
  // if the email was valid based on response time)
  const delay = Math.floor(Math.random() * 500) + 500; // 500ms to 1s delay
  await new Promise(resolve => setTimeout(resolve, delay));

  if (!email || !adminEmail || email.toLowerCase() !== adminEmail.toLowerCase()) {
    // If email doesn't match the admin email, we do nothing but return success
    // This prevents email enumeration.
    return { success: true };
  }

  // If we reach here, the email is the valid admin email
  const supabase = await createClient();
  
  // Note: we need a callback URL that points back to our app to exchange the code
  // We use localhost:3000 by default for dev, but in prod it should be the real URL.
  // We can construct it from the request headers or use NEXT_PUBLIC_SITE_URL if available.
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/admin/login/update-password`,
  });

  if (error) {
    console.error('Error requesting password reset:', error.message);
    // We still return success to the user to prevent enumeration, but log the error
    return { success: true };
  }

  return { success: true };
}
