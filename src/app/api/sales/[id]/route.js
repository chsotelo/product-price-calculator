// export const dynamic = "force-dynamic";
import { dbConnect } from "../../../../backend/libs/db";
import {
  findSale,
  findSalesByUserId,
  updateSale,
} from "../../../../backend/services/sale/sale.service";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const [_id, condition] = id.split("?");
    let response;
    dbConnect();
    if (condition === "userId") {
      response = await findSalesByUserId({ userId: _id });
    }
    response = await findSale({ saleId: _id });

    if (!response) {
      return NextResponse.json({
        status: 404,
        message: "Place not found",
        data: null,
      });
    }

    return NextResponse.json({
      status: 200,
      data: response,
      message: "Place fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Place not found",
      data: null,
    });
  }
}

export async function POST(request, { params }) {
  try {
    const data = await request.json();
    dbConnect();
    const { id } = params;
    const response = await updateSale({ saleId: id, data });

    return NextResponse.json({
      status: 200,
      message: "Place updated successfully",
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
