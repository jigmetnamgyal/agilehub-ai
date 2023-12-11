import { createClient } from "@supabase/supabase-js";

export const supabaseClient = (supabaseToken: string) => {
  const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const public_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const client = createClient(supabase_url || "", public_key || "", {
    global: { headers: { Authorization: `Bearer ${supabaseToken}` } },
  });

  const supabase = () => client;

  return supabase();
};
