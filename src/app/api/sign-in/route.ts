import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { identifier, password } = await request.json();

    console.log("📩 SIGN-IN BODY:", { identifier, password });

    if (!identifier || !password) {
      console.log("❌ Missing fields:", { identifier, password });
      return Response.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    }

  
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

  
    if (!user.isVerified) {
      return Response.json(
        { success: false, message: "Please verify your email first" },
        { status: 403 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return Response.json(
      {
        success: true,
        message: "Login successful",
        token,
        user: {
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sign-In error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
