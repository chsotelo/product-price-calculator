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
    const groupId = crypto.randomUUID();
    const data = await request.json();

    console.log({ data });
    const { userData, salesData } = data;

    const { _id: userId } = userData;

    if (userId) {
      const userRecovered = await getUser({ userId });
      const dataForUpdate = {
        ...userRecovered,
        ...userData,
      };
      user = await updateUser({ userId, data: dataForUpdate });
    } else {
      user = await createUser({ data: userData });
    }
    console.log({ user });

    const salesPromises = salesData.map(async (sale) => {
      const newDataSale = {
        ...sale,
        userId: user._id,
        groupId,
      };
      places.push(sale.place);
      const newSale = await createSale({ sale: newDataSale });
      return newSale;
    });

    const newArrayUserPlaces = [...new Set(user.places.concat(places))];

    await updateUser({
      userId: user._id,
      data: { places: newArrayUserPlaces },
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
