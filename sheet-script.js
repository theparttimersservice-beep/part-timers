// ═══════════════════════════════════════════════════════════════
// THE PART-TIMER'S — Google Apps Script
// Paste this ENTIRE code in Google Apps Script Editor
// Then Deploy as Web App → Anyone → Copy the URL → Paste in Admin Settings
// ═══════════════════════════════════════════════════════════════

const SHEET_NAME = "PartTimers_Data";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const action = data.action;

    if (action === 'ping') {
      return jsonResponse({ status: 'ok', message: 'Connected!' });
    }

    if (action === 'register' || action === 'updateProfile') {
      const sheet = getOrCreateSheet(ss, 'Users');
      if (action === 'register') {
        ensureHeaders(sheet, ['ID','Name','Type','Phone','Village','District','Skill','Shop','VehicleType','Plan','Rating','Jobs','Status','CreatedAt']);
        sheet.appendRow([
          data.id, data.name, data.type, data.phone,
          data.village, data.district, data.skill || '',
          data.shop || '', data.vtype || '', data.plan || 'Local Mini',
          data.rating || '4.8', data.jobs || 0, 'active',
          new Date().toISOString()
        ]);
      } else {
        // Update existing row
        const rows = sheet.getDataRange().getValues();
        for (let i = 1; i < rows.length; i++) {
          if (rows[i][0] === data.id) {
            sheet.getRange(i+1, 2).setValue(data.name);
            sheet.getRange(i+1, 5).setValue(data.village || '');
            sheet.getRange(i+1, 6).setValue(data.district || '');
            sheet.getRange(i+1, 7).setValue(data.skill || '');
            break;
          }
        }
      }
    }

    if (action === 'booking') {
      const sheet = getOrCreateSheet(ss, 'Bookings');
      ensureHeaders(sheet, ['ID','UserID','UserName','Service','Description','Price','Date','Location','Note','Status','CreatedAt']);
      sheet.appendRow([
        data.id, data.userId, data.userName, data.service,
        data.desc || '', data.price || '', data.date || '',
        data.loc || '', data.note || '', 'pending',
        new Date().toISOString()
      ]);
    }

    if (action === 'order') {
      const sheet = getOrCreateSheet(ss, 'Orders');
      ensureHeaders(sheet, ['ID','UserID','UserName','Item','Qty','Total','Address','Status','CreatedAt']);
      sheet.appendRow([
        data.id, data.userId, data.userName,
        data.item || '', data.qty || '', data.total || '',
        data.address || '', 'pending', new Date().toISOString()
      ]);
    }

    if (action === 'listing') {
      const sheet = getOrCreateSheet(ss, 'Listings');
      ensureHeaders(sheet, ['ID','VendorID','VendorName','Name','Category','Price','Type','Description','District','Status','CreatedAt']);
      sheet.appendRow([
        data.id, data.vendorId, data.vendorName,
        data.name, data.category, data.price, data.type,
        data.desc || '', data.district || '', 'pending',
        new Date().toISOString()
      ]);
    }

    if (action === 'planUpgrade') {
      const sheet = getOrCreateSheet(ss, 'Users');
      const rows = sheet.getDataRange().getValues();
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][0] === data.id) {
          sheet.getRange(i+1, 10).setValue(data.plan);
          break;
        }
      }
    }

    return jsonResponse({ status: 'success' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.toString() });
  }
}

function doGet(e) {
  return jsonResponse({ status: 'ok', message: 'The Part-Timers API is running!' });
}

function getOrCreateSheet(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
         .setBackground('#FF6B00').setFontColor('#ffffff');
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
