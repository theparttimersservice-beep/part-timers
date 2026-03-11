/**
 * THE PART-TIMERS — Google Apps Script (paste this in script.google.com)
 * Deploy as Web App: Execute as Me, Anyone can access
 * 
 * SETUP:
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Paste this code
 * 3. Deploy → New Deployment → Web App
 * 4. Copy the URL → paste in data.js SHEETS_CONFIG.apiUrl
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // Replace with your Sheet ID

function doGet(e) {
  const action = e.parameter.action;
  const sheet  = e.parameter.sheet;
  if (action === 'read') return readSheet(sheet);
  return ContentService.createTextOutput(JSON.stringify({error:'Unknown action'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.action === 'write') return writeSheet(body.sheet, body.data);
  return ContentService.createTextOutput(JSON.stringify({error:'Unknown action'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function readSheet(sheetName) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return jsonResponse({error: 'Sheet not found: ' + sheetName});
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1).map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  return jsonResponse({sheet: sheetName, rows: rows, count: rows.length});
}

function writeSheet(sheetName, rowData) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(Object.keys(rowData)); // headers
  }
  rowData.timestamp = new Date().toISOString();
  sheet.appendRow(Object.values(rowData));
  return jsonResponse({success: true, sheet: sheetName, row: sheet.getLastRow()});
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * SHEET TABS TO CREATE IN GOOGLE SHEETS:
 * - users        (id, name, phone, village, type, createdAt)
 * - workers      (id, name, phone, village, category, subcat, price, unit, radius, rating, trust)
 * - vendors      (id, name, phone, village, category, desc, rating)
 * - bookings     (id, customerId, workerId, service, date, time, status, amount)
 * - products     (id, vendorId, name, price, desc, category)
 * - ratings      (id, bookingId, rating, review, createdAt)
 * - registrations (id, name, phone, village, category, type, experience, price, status)
 */
