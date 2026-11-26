
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseSecret = process.env.SUPABASE_SECRET_KEY;

    if (!botToken || !supabaseUrl || !supabaseSecret) {
      return Response.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { initData, courseSlug } = body;

    if (
      typeof initData !== "string" ||
      typeof courseSlug !== "string"
    ) {
      return Response.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const params = new URLSearchParams(initData);
    const receivedHash = params.get("hash");

    if (!receivedHash || !/^[a-f0-9]{64}$/i.test(receivedHash)) {
      return Response.json(
        { error: "Invalid Telegram data" },
        { status: 401 }
      );
    }

    const dataCheckString = [...params.entries()]
      .filter(([key]) => key !== "hash")
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    const secretKey = crypto
      .createHmac("sha256", "WebAppData")
      .update(botToken)
      .digest();

    const calculatedHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");

    const receivedBuffer = Buffer.from(receivedHash, "hex");
    const calculatedBuffer = Buffer.from(calculatedHash, "hex");

    if (
      receivedBuffer.length !== calculatedBuffer.length ||
      !crypto.timingSafeEqual(receivedBuffer, calculatedBuffer)
    ) {
      return Response.json(
        { error: "Telegram verification failed" },
        { status: 401 }
      );
    }

    const authDate = Number(params.get("auth_date"));
    const now = Math.floor(Date.now() / 1000);

    if (
      !Number.isFinite(authDate) ||
      authDate > now + 60 ||
      now - authDate > 86400
    ) {
      return Response.json(
        { error: "Telegram data expired" },
        { status: 401 }
      );
    }

    const userData = params.get("user");

    if (!userData) {
      return Response.json(
        { error: "Telegram user not found" },
        { status: 401 }
      );
    }

    const telegramUser = JSON.parse(userData);

    if (!telegramUser.id) {
      return Response.json(
        { error: "Invalid Telegram user" },
        { status: 401 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseSecret
    );

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("telegram_id", String(telegramUser.id))
      .single();

    if (userError || !user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id, price, is_active")
      .eq("slug", courseSlug)
      .single();

    if (courseError || !course) {
      return Response.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    if (!course.is_active) {
      return Response.json(
        { error: "Course is not available" },
        { status: 400 }
      );
    }

    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .insert({
        user_id: user.id,
        course_id: course.id,
        amount: course.price,
        status: "pending"
      })
      .select("id, amount, status")
      .single();

    if (purchaseError) {
      console.error("Purchase creation error:", purchaseError);

      return Response.json(
        { error: "Could not create purchase" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      purchase
    });

  } catch (error) {
    console.error("Purchases API error:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
