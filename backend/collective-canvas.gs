/**
 * Collective Canvas — shared name directory for vernacularbranding site.
 * Storage: a Google Sheet (columns: time, name, association, status).
 * Set status to "hidden" in the sheet to remove a name from the page.
 *
 * Setup: create a Google Sheet → Extensions → Apps Script → paste this file →
 * Deploy → New deployment → type "Web app" → Execute as: Me → Who has access: Anyone →
 * copy the web-app URL into assets/canvas-config.js (VB_CANVAS_ENDPOINT).
 */
var SHEET_NAME = 'Names';
var MAX_LEN = 80;

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) { sh = ss.insertSheet(SHEET_NAME); sh.appendRow(['time', 'name', 'association', 'status']); }
  return sh;
}
function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function doGet(e) {
  var rows = sheet_().getDataRange().getValues().slice(1), names = [];
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i][3]).toLowerCase() !== 'hidden') names.push({ name: String(rows[i][1]), association: String(rows[i][2]) });
  }
  return json_({ names: names });
}
function doPost(e) {
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var d = JSON.parse(e.postData.contents || '{}');
    var name = String(d.name || '').replace(/\s+/g, ' ').replace(/[<>]/g, '').trim();
    var assoc = d.association === 'author-con' ? 'author-con' : 'interactor';
    if (!name || name.length > MAX_LEN) return json_({ ok: false, error: 'Please enter a name of up to ' + MAX_LEN + ' characters.' });
    var sh = sheet_(), rows = sh.getDataRange().getValues().slice(1);
    for (var i = 0; i < rows.length; i++) {
      if (String(rows[i][1]).toLowerCase() === name.toLowerCase()) return json_({ ok: false, error: 'This name is already on the canvas.' });
    }
    sh.appendRow([new Date(), name, assoc, 'visible']);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'Could not add the name.' });
  } finally { lock.releaseLock(); }
}
