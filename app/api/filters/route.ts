import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status");
  const searchDate = searchParams.get("date");

  // Explicitly type the filter object
  const filter: {
    status?: string;
    appliedAt?: {
      gte?: Date;
      lte?: Date;
    };
  } = {};

  // Add filters based on status and date range
  if (status) {
    filter.status = status;
  }
  if (searchDate) {
    const startOfDay = new Date(searchDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
  
    const endOfDay = new Date(searchDate);
    endOfDay.setUTCHours(23, 59, 59, 999);
  
    filter.appliedAt = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }
  
  try {
    const applications = await prisma.application.findMany({
      where: filter,
    });

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({
      error: error || "An error occurred while fetching the applications.",
    });
  }
}
