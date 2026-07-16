/**
 * Iluminity lightweight Google Sheets CMS.
 *
 * SETUP
 * 1. Create a Google Sheet and copy its ID from the URL.
 * 2. Open Extensions > Apps Script and paste this complete file.
 * 3. Replace SHEET_ID and WRITE_SECRET below.
 * 4. Run setupCatalogSheet once and authorize it.
 * 5. Deploy > New deployment > Web app.
 * 6. Execute as: Me. Who has access: Anyone.
 * 7. Copy the /exec URL into admin.html.
 *
 * The public GET endpoint exposes catalog content only.
 * POST writes require the secret entered manually in the admin session.
 */
const SHEET_ID = "PASTE_GOOGLE_SHEET_ID";
const WRITE_SECRET = "CHANGE_TO_A_LONG_RANDOM_SECRET";
const TAB_NAME = "Catalog";

function doGet(e) {
  try {
    if ((e.parameter.action || "catalog") !== "catalog") return json_({ ok: false, error: "Unknown action" });
    return json_({ ok: true, data: readCatalog_() });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    if (body.secret !== WRITE_SECRET) return json_({ ok: false, error: "Unauthorized" });
    if (body.action !== "replaceCatalog" || !Array.isArray(body.data)) return json_({ ok: false, error: "Invalid request" });
    writeCatalog_(body.data);
    return json_({ ok: true, updated: body.data.length, timestamp: new Date().toISOString() });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function setupCatalogSheet() {
  const sheet = getSheet_();
  sheet.clear();
  sheet.appendRow(["slug", "name", "name_es", "name_pt", "aliases", "image", "description", "accent", "available", "model_1", "model_2", "model_3"]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#7c6fff").setFontColor("#ffffff");
  sheet.autoResizeColumns(1, 12);
}

function readCatalog_() {
  const values = getSheet_().getDataRange().getValues();
  if (values.length < 2) return [];
  return values.slice(1).filter(row => row[0]).map(row => ({
    slug: String(row[0]),
    name: String(row[1]),
    es: String(row[2]),
    pt: String(row[3]),
    aliases: String(row[4]).split(",").map(value => value.trim()).filter(Boolean),
    image: String(row[5]),
    description: String(row[6]),
    accent: String(row[7]),
    available: row[8] !== false && String(row[8]).toLowerCase() !== "false",
    models: [String(row[9]), String(row[10]), String(row[11])]
  }));
}

function writeCatalog_(catalog) {
  const sheet = getSheet_();
  const rows = catalog.map(item => [
    item.slug, item.name, item.es, item.pt || "", (item.aliases || []).join(", "), item.image,
    item.description, item.accent, item.available !== false, item.models[0], item.models[1], item.models[2]
  ]);
  if (sheet.getLastRow() > 1) sheet.getRange(2, 1, sheet.getLastRow() - 1, 12).clearContent();
  if (rows.length) sheet.getRange(2, 1, rows.length, 12).setValues(rows);
}

function getSheet_() {
  const book = SpreadsheetApp.openById(SHEET_ID);
  return book.getSheetByName(TAB_NAME) || book.insertSheet(TAB_NAME);
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
