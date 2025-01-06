import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
// POST route to create a new application
export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON body
    const body = await req.json();
    // Ensure body is not null or undefined
    if (!body) {
      return NextResponse.json({
        error: "Request body is mmissing or invalid.",
      });
    }

    const { company, jobTitle, link, jobLocation, status } = body;

    // Create a new application record in the database
    const newApplication = await prisma.application.create({
      data: {
        company,
        jobTitle,
        link,
        jobLocation,
        status: status || "Applied",
      },
    });
    console.log(newApplication);

    // Return the created record
    return NextResponse.json(newApplication);
  } catch (error) {
    return NextResponse.json({
      error: error || "An error occurred while creating the application.",
    });
  }
}

// GET route to fetch all applications
export async function GET() {
  try {
    // Fetch all applications
    const applications = await prisma.application.findMany();

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({
      error: error || "An error occurred while fetching the applications.",
    });
  }
}

// PUT route to update the status of an application by its ID
export async function PUT(req: NextRequest) {
  const { id, status } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Application ID is required." },
      { status: 400 }
    );
  }

  try {
    const updatedApplication = await prisma.application.update({
      where: { id: parseInt(id as string) },
      data: {
        status,
      },
    });

    return NextResponse.json(updatedApplication);
  } catch (error) {
    return NextResponse.json({
      error: error || "An error occurred while updating the application.",
    });
  }
}

// Delete route to delete an application by its ID
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Application ID is required." },
      { status: 400 }
    );
  }

  try {
    const deletedApplication = await prisma.application.delete({
      where: { id: parseInt(id as string) },
    });

    return NextResponse.json(deletedApplication);
  } catch (error) {
    return NextResponse.json({
      error: error || "An error occurred while deleting the application.",
    });
  }
}
