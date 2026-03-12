/**
 * THE PART-TIMERS — Google Apps Script Backend
 * Deploy this as a Web App in Google Apps Script
 * Set: Execute as Me, Access: Anyone
 * 
 * HOW TO USE:
 * 1. Open Google Sheets
 * 2. Extensions → Apps Script
 * 3. Paste this code
 * 4. Deploy → New Deployment → Web App
 * 5. Copy the URL and add to Admin Panel → Integrations
 */

const SHEET_NAME = SpreadsheetApp.getActiveSpreadsheet();

// ── GET requests ──
function doGet(e) {
  const action = e.parameter.action;
  try {
    if (action === 'getWorkers')    return jsonResponse(getWorkers(e.parameter.category));
    if (action === 'getOrders')     return jsonResponse(getOrders(e.parameter.phone));
    if (action === 'getVendors')    return jsonResponse(getVendors(e.parameter.category));
    if (action === 'ping')          return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() });
    return jsonResponse({ error: 'Unknown action' });
  } catch(err) {
    return jsonResponse({ error: err.message });
  }
}

// ── POST requests ──
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;
  try {
    if (action === 'registerUser')    return jsonResponse(registerUser(data));
    if (action === 'registerWorker')  return jsonResponse(registerWorker(data));
    if (action === 'createBooking')   return jsonResponse(createBooking(data));
    if (action === 'submitRating')    return jsonResponse(submitRating(data));
    if (action === 'postAd')          return jsonResponse(postAd(data));
    if (action === 'registerWorkID')  return jsonResponse(registerWorkID(data));
    if (action === 'registerVendor')  return jsonResponse(registerVendor(data));
    return jsonResponse({ error: 'Unknown action' });
  } catch(err) {
    return jsonResponse({ error: err.message });
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Sheet helpers ──
function getOrCreateSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function appendRow(sheetName, rowData) {
  const sheet = getOrCreateSheet(sheetName);
  // Add header if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(Object.keys(rowData));
  }
  sheet.appendRow(Object.values(rowData));
  return { success: true, row: sheet.getLastRow() };
}

// ── Functions ──
function registerUser(data) {
  return appendRow('Users', {
    id: 'U' + Date.now(),
    name: data.name || '',
    phone: data.phone || '',
    village: data.village || '',
    role: data.role || 'customer',
    registeredAt: new Date().toISOString(),
  });
}

function registerWorker(data) {
  return appendRow('Workers', {
    id: 'W' + Date.now(),
    name: data.name || '',
    phone: data.phone || '',
    village: data.village || '',
    district: data.district || '',
    category: data.category || '',
    subcat: data.subcat || '',
    experience: data.experience || '',
    desc: data.desc || '',
    price: data.price || 0,
    unit: data.unit || 'day',
    radius: data.radius || 10,
    status: 'pending',
    registeredAt: new Date().toISOString(),
  });
}

function createBooking(data) {
  return appendRow('Orders', {
    orderId: data.id || 'ORD' + Date.now(),
    workerId: data.workerId || '',
    workerName: data.workerName || '',
    customerPhone: data.phone || '',
    date: data.date || '',
    time: data.time || '',
    location: data.location || '',
    notes: data.notes || '',
    durType: data.durType || 'hourly',
    qty: data.qty || 1,
    totalAmount: data.totalAmount || 0,
    status: 'confirmed',
    createdAt: data.createdAt || new Date().toISOString(),
  });
}

function submitRating(data) {
  return appendRow('Ratings', {
    id: 'R' + Date.now(),
    workerId: data.workerId || '',
    workerName: data.workerName || '',
    customerPhone: data.customerPhone || '',
    rating: data.rating || 5,
    review: data.review || '',
    date: new Date().toISOString(),
  });
}

function postAd(data) {
  return appendRow('Marketplace', {
    id: data.id || 'AD' + Date.now(),
    title: data.title || '',
    category: data.category || '',
    price: data.price || 0,
    village: data.village || '',
    desc: data.desc || '',
    phone: data.phone || '',
    postedAt: new Date().toISOString(),
  });
}

function registerWorkID(data) {
  return appendRow('WorkIDs', {
    idNum: data.idNum || '',
    name: data.name || '',
    skill: data.skill || '',
    phone: data.phone || '',
    village: data.village || '',
    generatedAt: new Date().toISOString(),
  });
}

function registerVendor(data) {
  return appendRow('Vendors', {
    id: 'V' + Date.now(),
    name: data.name || '',
    phone: data.phone || '',
    village: data.village || '',
    category: data.category || '',
    plan: data.plan || 'mini',
    status: 'pending',
    registeredAt: new Date().toISOString(),
  });
}

function getWorkers(category) {
  const sheet = getOrCreateSheet('Workers');
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return { data: [] };
  const headers = rows[0];
  const data = rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  }).filter(w => !category || w.category === category);
  return { data };
}

function getOrders(phone) {
  const sheet = getOrCreateSheet('Orders');
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return { data: [] };
  const headers = rows[0];
  const data = rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  }).filter(o => !phone || o.customerPhone === phone);
  return { data };
}

function getVendors(category) {
  const sheet = getOrCreateSheet('Vendors');
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return { data: [] };
  const headers = rows[0];
  const data = rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  }).filter(v => !category || v.category === category);
  return { data };
}
