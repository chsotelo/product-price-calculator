// export const dynamic = "force-dynamic";
import { dbConnect } from "../../../backend/libs/db";
import {
  createUser,
  getAllUsers,
  getUser,
  getUserByIdentification,
} from "../../../backend/services/user/user.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    dbConnect();
    let response = await getAllUsers();

    if (!response) {
      return NextResponse.json({
        status: 404,
        message: "No users found",
      });
    }

    return NextResponse.json({
      status: 200,
      data: "responsido",
      message: "Users fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
}

export async function POST(request) {
  try {
    dbConnect();
    const data = await request.json();
    const response = await createUser({ data });

    return NextResponse.json({
      status: 201,
      message: "User created successfully",
      data: response,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
}
