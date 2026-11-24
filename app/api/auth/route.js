
import crypto from "crypto";

export async function POST(request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      return Response.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const initData = body.initData;

    if (!initData || typeof initData !== "string") {
      return Response.json(
        { error: "Missing Telegram data" },
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

    if (
      !Number.isFinite(authDate) ||
      authDate > Math.floor(Date.now() / 1000) + 60 ||
      Math.floor(Date.now() / 1000) - authDate > 86400
    ) {
      return Response.json(
        { error: "Telegram data expired" },
        { status: 401 }
      );
    }

    const userData = params.get("user");

    if (!userData) {
      return Response.json(
        { error: "User data not found" },
        { status: 401 }
      );
    }

    const user = JSON.parse(userData);

    return Response.json({
      success: true,
      user: {
        id: user.id,
        first_name: user.first_name,
        username: user.username || null
      }
    });

  } catch {
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
