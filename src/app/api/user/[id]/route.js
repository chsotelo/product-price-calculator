// export const dynamic = "force-dynamic";
import { dbConnect } from "../../../../backend/libs/db";
import {
  getUser,
  getUserByIdentification,
  updateUser,
} from "../../../../backend/services/user/user.service";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    let response;
    dbConnect();

    if (id.lenght === 8) {
      response = await getUserByIdentification({ identification: id });
    }

    response = await getUser({ userId: id });

    return NextResponse.json({
      status: 200,
      data: response,
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

export async function POST(request, { params }) {
  try {
    const data = await request.json();
    dbConnect();
    const { id } = params;
    const response = await updateUser({ userId: id, data });

    return NextResponse.json({
      status: 200,
      message: "Users updated successfully",
      data: response,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
}
