/**
 * Google Apps Script Web App for the RSVP form.
 *
 * Sheet header row (row 1), in this exact order:
 *   submittedAt | side | firstName | lastName | attending | guestCount | message | language
 *
 * Deployment:
 *   1. Open the target Google Sheet.
 *   2. Extensions > Apps Script.
 *   3. Paste this file's contents into Code.gs (replace the default content).
 *   4. Deploy > New deployment > type: Web app.
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   5. Copy the Web app URL and paste it into RSVP_ENDPOINT in script.js.
 */

var SHEET_NAME = 'RSVP'; // change to match your sheet/tab name

function doPost(e) {
  try {
    var params = (e && e.parameter) || {};

    var side = String(params.side || '').trim();
    var firstName = String(params.firstName || '').trim();
    var lastName = String(params.lastName || '').trim();
    var attending = String(params.attending || '').trim();
    var message = String(params.message || '').trim();
    var language = String(params.language || '').trim();

    var guestCount = parseInt(params.guestCount, 10);
    if (isNaN(guestCount) || guestCount < 0) guestCount = 0;

    if (!side || !firstName || !lastName || (attending !== 'yes' && attending !== 'no')) {
      return jsonResponse({ success: false, message: 'Missing or invalid required fields' });
    }
    if (attending === 'no') guestCount = 0;
    if (attending === 'yes' && guestCount < 1) {
      return jsonResponse({ success: false, message: 'guestCount must be at least 1 when attending' });
    }

    var sheet = getSheet();
    var submittedAt = new Date(); // server time is authoritative, not the browser's

    sheet.appendRow([
      submittedAt,
      side,
      firstName,
      lastName,
      attending,
      guestCount,
      message,
      language
    ]);

    return jsonResponse({ success: true, message: 'RSVP recorded' });
  } catch (err) {
    return jsonResponse({ success: false, message: 'Server error: ' + err.message });
  }
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['submittedAt', 'side', 'firstName', 'lastName', 'attending', 'guestCount', 'message', 'language']);
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
