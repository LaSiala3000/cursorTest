/**
 * Google Apps Script: Append email signups to this Google Sheet
 *
 * SETUP:
 * 1. Create or open a Google Sheet (spreadsheet.google.com)
 * 2. Go to Extensions → Apps Script
 * 3. Replace the default code with this entire file
 * 4. Save, then click Deploy → New deployment
 * 5. Choose type: Web app
 *    - Description: "Email signup"
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Deploy, copy the Web app URL
 * 7. Paste that URL into script.js as GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Email", "Date"]);
    }

    const email = (e.parameter && e.parameter.email) ? e.parameter.email.trim() : "";
    if (!email) {
      return response(400, "Missing email");
    }

    sheet.appendRow([email, new Date()]);

    return response(200, "OK");
  } catch (err) {
    return response(500, err.toString());
  }
}

function response(status, body) {
  return ContentService.createTextOutput(body)
    .setMimeType(ContentService.MimeType.TEXT);
}
