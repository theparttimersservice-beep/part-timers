/**
 * THE PART-TIMERS — Google Apps Script Backend v4
 * Supports: Workers, Orders, Users, Vendors, Ratings, WorkIDs,
 *           Marketplace, Haata, Farming, Fish, Poultry, Learning,
 *           Technicians, Contractors, Vehicle, Food, Equipment
 *
 * SETUP:
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Paste this entire file
 * 3. Deploy → New Deployment → Web App
 *    Execute as: Me | Access: Anyone
 * 4. Copy the URL → Admin Panel → Integrations → Google Sheets URL
 */

// ── GET handler ──
function doGet(e) {
  var action = e.parameter.action;
  try {
    if (action === 'ping')          return json({ status:'ok', timestamp:new Date().toISOString() });
    if (action === 'getWorkers')    return json(getWorkersByCategory(e.parameter.category));
    if (action === 'getOrders')     return json(getOrdersByPhone(e.parameter.phone));
    if (action === 'getVendors')    return json(getSheetData('Vendors', e.parameter.category, 'category'));
    if (action === 'getHaata')      return json(getSheetData('Haata', e.parameter.category, 'category'));
    if (action === 'getMarketplace')return json(getSheetData('Marketplace', e.parameter.category, 'category'));
    return json({ error:'Unknown action' });
  } catch(err) { return json({ error:err.message }); }
}

// ── POST handler ──
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var action = data.action;
  try {
    if (action === 'registerUser')    return json(saveToSheet('Users',    buildUser(data)));
    if (action === 'registerWorker')  return json(saveToSheet('Workers',  buildWorker(data)));
    if (action === 'createBooking')   return json(saveToSheet('Orders',   buildBooking(data)));
    if (action === 'submitRating')    return json(saveToSheet('Ratings',  buildRating(data)));
    if (action === 'registerWorkID')  return json(saveToSheet('WorkIDs',  buildWorkID(data)));
    if (action === 'registerVendor')  return json(saveToSheet('Vendors',  buildVendor(data)));
    if (action === 'postAd')          return json(saveToSheet('Marketplace', buildAd(data)));
    if (action === 'postHaataItem')   return json(saveToSheet('Haata',    buildHaataItem(data)));
    if (action === 'updateProfile')   return json(updateUserProfile(data));
    // Category-specific worker saves
    if (action === 'saveFarmingWorker')    return json(saveToSheet('Farming_Workers',   buildWorker(data)));
    if (action === 'saveFishWorker')       return json(saveToSheet('Fish_Workers',      buildWorker(data)));
    if (action === 'savePoultryWorker')    return json(saveToSheet('Poultry_Workers',   buildWorker(data)));
    if (action === 'saveLearningWorker')   return json(saveToSheet('Learning_Workers',  buildWorker(data)));
    if (action === 'saveTechWorker')       return json(saveToSheet('Tech_Workers',      buildWorker(data)));
    if (action === 'saveContractorWorker') return json(saveToSheet('Contractor_Workers',buildWorker(data)));
    if (action === 'saveVehicleWorker')    return json(saveToSheet('Vehicle_Workers',   buildWorker(data)));
    return json({ error:'Unknown action' });
  } catch(err) { return json({ error:err.message }); }
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// ── Sheet helpers ──
function getSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

function saveToSheet(sheetName, rowData) {
  var sheet = getSheet(sheetName);
  var keys = Object.keys(rowData);
  if (sheet.getLastRow() === 0) sheet.appendRow(keys);
  sheet.appendRow(keys.map(function(k){ return rowData[k]; }));
  return { success:true, sheet:sheetName, row:sheet.getLastRow() };
}

function getSheetData(sheetName, filterVal, filterKey) {
  var sheet = getSheet(sheetName);
  var rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return { data:[] };
  var headers = rows[0];
  var data = rows.slice(1).map(function(row){
    var obj = {}; headers.forEach(function(h,i){ obj[h]=row[i]; }); return obj;
  });
  if (filterVal && filterKey) data = data.filter(function(d){ return d[filterKey]===filterVal; });
  return { data:data };
}

function getWorkersByCategory(category) {
  var all = getSheetData('Workers').data;
  if (category) all = all.filter(function(w){ return w.category===category; });
  return { data:all };
}

function getOrdersByPhone(phone) {
  var all = getSheetData('Orders').data;
  if (phone) all = all.filter(function(o){ return o.customerPhone===phone; });
  return { data:all };
}

function updateUserProfile(data) {
  var sheet = getSheet('Users');
  var rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return { success:false };
  var headers = rows[0];
  var phoneIdx = headers.indexOf('phone');
  for (var i=1; i<rows.length; i++) {
    if (rows[i][phoneIdx]===data.phone||rows[i][0]===data.userId) {
      if (data.name)    sheet.getRange(i+1, headers.indexOf('name')+1).setValue(data.name);
      if (data.village) sheet.getRange(i+1, headers.indexOf('village')+1).setValue(data.village);
      return { success:true, updated:true };
    }
  }
  return { success:false, msg:'User not found' };
}

// ── Data builders ──
function now() { return new Date().toISOString(); }
function uid(prefix) { return (prefix||'ID')+Date.now(); }

function buildUser(d) {
  return { id:uid('U'), name:d.name||'', phone:d.phone||'', village:d.village||'', district:d.district||'', role:d.role||'customer', roles:(d.roles||[d.role||'customer']).join(','), registeredAt:now() };
}
function buildWorker(d) {
  return { id:uid('W'), name:d.name||'', phone:d.phone||'', village:d.village||'', district:d.district||'', category:d.category||'', subcat:d.subcat||'', experience:d.experience||'', desc:d.desc||'', price:d.price||0, unit:d.unit||'day', radius:d.radius||10, status:'pending', registeredAt:now() };
}
function buildBooking(d) {
  return { orderId:d.id||uid('ORD'), workerId:d.workerId||'', workerName:d.workerName||'', workerCategory:d.category||'', customerPhone:d.phone||'', date:d.date||'', time:d.time||'', location:d.location||'', notes:d.notes||'', durType:d.durType||'hourly', qty:d.qty||1, unit:d.unit||'hr', totalAmount:d.totalAmount||0, totalUpper:d.totalUpper||'', status:'confirmed', createdAt:now() };
}
function buildRating(d) {
  return { id:uid('R'), workerId:d.workerId||'', workerName:d.workerName||'', ratingBy:d.ratingBy||'customer', customerPhone:d.customerPhone||'', rating:d.rating||5, tags:(d.tags||[]).join(','), review:d.text||'', createdAt:now() };
}
function buildWorkID(d) {
  return { idNum:d.idNum||uid('PT'), name:d.name||'', skill:d.skill||'', phone:d.phone||'', village:d.village||'', district:d.district||'', generatedAt:now() };
}
function buildVendor(d) {
  return { id:uid('V'), name:d.name||'', phone:d.phone||'', village:d.village||'', district:d.district||'', category:d.category||'', plan:d.plan||'mini', status:'pending', registeredAt:now() };
}
function buildAd(d) {
  return { id:uid('AD'), title:d.title||'', category:d.category||'', price:d.price||0, village:d.village||'', desc:d.desc||'', phone:d.phone||'', emoji:d.emoji||'🛒', postedAt:now() };
}
function buildHaataItem(d) {
  return { id:uid('H'), name:d.name||'', price:d.price||0, unit:d.unit||'kg', vendor:d.vendor||'', village:d.village||'', qty:d.qty||0, category:d.category||'', emoji:d.emoji||'🛒', postedAt:now() };
}

function updateUser(data) {
  // Update existing user row by phone, or append
  const sheet = getOrCreateSheet('Users');
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][2] === data.phone) { // phone is col index 2
      // Update name, village, district
      if (data.name)     sheet.getRange(i+1, 2).setValue(data.name);
      if (data.village)  sheet.getRange(i+1, 4).setValue(data.village);
      if (data.district) sheet.getRange(i+1, 5).setValue(data.district);
      if (data.role)     sheet.getRange(i+1, 6).setValue(data.role);
      sheet.getRange(i+1, 8).setValue(new Date().toISOString()); // updatedAt
      return { success: true, updated: true };
    }
  }
  return registerUser(data); // new user
}

function updateWorker(data) {
  const sheet = getOrCreateSheet('Workers');
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][2] === data.phone) {
      if (data.price)   sheet.getRange(i+1, 10).setValue(data.price);
      if (data.desc)    sheet.getRange(i+1, 9).setValue(data.desc);
      if (data.subcat)  sheet.getRange(i+1, 7).setValue(data.subcat);
      sheet.getRange(i+1, 14).setValue(new Date().toISOString()); // updatedAt
      return { success: true, updated: true };
    }
  }
  return registerWorker(data);
}
