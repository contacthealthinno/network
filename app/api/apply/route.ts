import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Google Sheets configuration
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getGoogleSheetsClient() {
  const credentials = {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: "v4", auth });
  
  return { sheets, auth };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const companyName = formData.get("companyName") as string;
    const headquarters = formData.get("headquarters") as string;
    const website = formData.get("website") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const technologyDescription = formData.get("technologyDescription") as string;
    const referredBy = formData.get("referredBy") as string;
    const healthTechCategories = formData.get("healthTechCategories") as string;
    const operationTime = formData.get("operationTime") as string;
    const fundraise = formData.get("fundraise") as string;
    const pilotReady = formData.get("pilotReady") as string;
    const regulatoryStatus = formData.get("regulatoryStatus") as string;
    const additionalInfo = formData.get("additionalInfo") as string;
    const deckUrl = formData.get("deckUrl") as string;

    // Check for required environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 
        !process.env.GOOGLE_PRIVATE_KEY || 
        !process.env.GOOGLE_SHEET_ID) {
      console.error("[v0] Missing Google Workspace environment variables");
      return NextResponse.json(
        { error: "Server configuration error. Google Workspace credentials not set up." },
        { status: 500 }
      );
    }

    const { sheets } = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Prepare row data for Google Sheets
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      companyName,
      headquarters,
      website,
      firstName,
      lastName,
      email,
      phone,
      technologyDescription,
      referredBy,
      healthTechCategories,
      operationTime,
      fundraise,
      pilotReady,
      regulatoryStatus,
      additionalInfo,
      deckUrl,
    ];

    // Append data to Google Sheet
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Sheet1!A:Q", // Uses default sheet tab name
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [rowData],
        },
      });
    } catch (sheetError) {
      console.error("[v0] Error appending to sheet:", sheetError);
      const message = sheetError instanceof Error ? sheetError.message : "Unknown error";
      return NextResponse.json(
        { error: `Failed to save to spreadsheet: ${message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[v0] Error processing application:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to process application: ${errorMessage}` },
      { status: 500 }
    );
  }
}
