// export const dynamic = "force-dynamic";
import { dbConnect } from "../../../backend/libs/db";
import { NextResponse } from "next/server";
import {
  createSale,
  findAllSales,
} from "../../../backend/services/sale/sale.service";

export async function GET() {
  try {
    dbConnect();
    let response = await findAllSales();

    if (!response) {
      return NextResponse.json({
        status: 404,
        message: "No users found",
        data: null,
      });
    }

    return NextResponse.json({
      status: 200,
      data: "responsido",
      message: "Places fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
}

export async function POST(request) {
  try {
    dbConnect();
    const data = await request.json();
    const response = await createSale({ sale: data });

    if (!response) {
      return NextResponse.json({
        status: 404,
        message: "No users found",
        data: null,
      });
    }

    return NextResponse.json({
      status: 201,
      message: "Place created successfully",
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
