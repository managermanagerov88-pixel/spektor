import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  return Response.json({
    success: true,
    message: "Purchases API is working"
  });
}