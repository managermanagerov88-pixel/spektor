import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );

    const { data, error } = await supabase
      .from("courses")
      .select("id, slug, title, description, price, is_active")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase courses error:", error);

      return Response.json(
        { error: "Database error" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      courses: data
    });

  } catch (error) {
    console.error("Courses API error:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}