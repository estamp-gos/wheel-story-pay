/**
 * Paste this into: Google Sheet → Extensions → Apps Script
 * Then: Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * Deploy while logged into the Gmail that should send the mail
 * (recommended: rmoto7817@gmail.com).
 */
const SHEET_NAME = 'Config';
const ORDERS_SHEET = 'Orders';
const NOTIFY_EMAIL = 'rmoto7817@gmail.com';

function doGet(e) {
  const action = e.parameter.action;

  if (action === 'getConfig') {
    return getConfig();
  }

  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Unknown action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.action === 'saveConfig') {
      return saveConfig(data);
    }

    if (data.action === 'saveOrder') {
      return saveOrder(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Unknown action' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getConfig() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange('A1:B1').setValues([['Key', 'Value']]);
  }

  const data = sheet.getDataRange().getValues();
  const config = {};

  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) config[data[i][0]] = data[i][1];
  }

  return ContentService
    .createTextOutput(JSON.stringify(config))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveConfig(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange('A1:B1').setValues([['Key', 'Value']]);
  }

  const keys = ['payoneerLink', 'emailjsPublicKey', 'emailjsServiceId', 'emailjsTemplateId'];
  const existing = sheet.getDataRange().getValues();

  keys.forEach((key) => {
    if (data[key] === undefined) return;
    let found = false;
    for (let i = 1; i < existing.length; i++) {
      if (existing[i][0] === key) {
        sheet.getRange(i + 1, 2).setValue(data[key]);
        found = true;
        break;
      }
    }
    if (!found) {
      sheet.appendRow([key, data[key]]);
    }
  });

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveOrder(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ORDERS_SHEET);

  if (!sheet) {
    sheet = ss.insertSheet(ORDERS_SHEET);
    sheet.getRange('A1:F1').setValues([['Timestamp', 'Plan', 'Price', 'Vehicle Type', 'VIN', 'Email']]);
  }

  const timestamp = data.timestamp || new Date().toISOString();
  const plan = data.plan || '';
  const price = data.price || '';
  const vehicleType = data.vehicleType || '';
  const vin = data.vin || '';
  const email = data.email || '';

  sheet.appendRow([timestamp, plan, price, vehicleType, vin, email]);

  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New Vehicle Check Order — ' + (vin || 'No VIN'),
      body:
        'New order from the website:\n\n' +
        'Plan: ' + plan + '\n' +
        'Price: ' + price + '\n' +
        'Vehicle Type: ' + vehicleType + '\n' +
        'VIN: ' + vin + '\n' +
        'Customer Email: ' + email + '\n' +
        'Time: ' + timestamp + '\n',
      replyTo: email || NOTIFY_EMAIL,
    });
  } catch (mailErr) {
    Logger.log('Email failed: ' + mailErr);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
