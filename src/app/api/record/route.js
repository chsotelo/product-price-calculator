import { NextResponse } from "next/server";
import { dbConnect } from "../../../backend/libs/db";
import { createSale } from "../../../backend/services/sale/sale.service";
import {
  createUser,
  getUser,
  updateUser,
} from "../../../backend/services/user/user.service";

export async function POST(request) {
  try {
    dbConnect();
    let user;
    let places = [];
    let sales = [];
    const data = await request.json();

    const { userData, salesData } = data;

    const { _id: userId } = userData;

    if (userId) {
      console.log("actualizando", userId);

      const userRecovered = await getUser({ userId });
      const dataForUpdate = {
        ...userRecovered,
        ...userData,
      };
      user = await updateUser({ userId, data: dataForUpdate });
    } else {
      console.log("creando");
      user = await createUser({ data: userData });
    }
    console.log("user", user);

    const salesPromises = salesData.map(async (sale) => {
      const newDataSale = {
        ...sale,
        userId: user._id,
      };
      places.push(sale.place);
      const newSale = await createSale({ sale: newDataSale });
      return newSale;
    });

    sales = await Promise.all(salesPromises);

    return NextResponse.json({
      status: 201,
      message: "User and sales created successfully",
      data: {
        user,
        sales,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
}
