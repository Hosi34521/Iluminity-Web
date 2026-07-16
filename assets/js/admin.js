(function () {
  let catalog = structuredClone(window.ILUMINITY_CATALOG);
  const list = document.getElementById("admin-list");
  const status = document.getElementById("admin-status");
  const endpoint = document.getElementById("sheet-endpoint");
  const secret = document.getElementById("sheet-secret");
  endpoint.value = localStorage.getItem("iluminity_sheet_endpoint") || "";

  function message(text, type = "") {
    status.textContent = text;
    status.dataset.type = type;
  }

  function render() {
    document.getElementById("admin-count").textContent = `${catalog.length} industries · ${catalog.length * 3} demos`;
    list.innerHTML = catalog.map((item, index) => `
      <article class="glass-card admin-item">
        <img src="${item.image}" alt="">
        <div class="admin-fields">
          <label>English name<input data-index="${index}" data-key="name" value="${item.name}"></label>
          <label>Spanish name<input data-index="${index}" data-key="es" value="${item.es}"></label>
          <label>Portuguese name<input data-index="${index}" data-key="pt" value="${item.pt || ""}"></label>
          <label class="wide">Description<input data-index="${index}" data-key="description" value="${item.description.replaceAll('"', "&quot;")}"></label>
          <label class="wide">Image URL<input data-index="${index}" data-key="image" value="${item.image}"></label>
          ${item.models.map((model, modelIndex) => `<label>Demo ${modelIndex + 1}<input data-index="${index}" data-model="${modelIndex}" value="${model}"></label>`).join("")}
        </div>
        <a class="admin-preview" href="${item.slug}/" target="_blank">Preview ↗</a>
      </article>`).join("");
  }

  list.addEventListener("input", (event) => {
    const input = event.target.closest("input");
    if (!input) return;
    const item = catalog[Number(input.dataset.index)];
    if (input.dataset.model != null) item.models[Number(input.dataset.model)] = input.value;
    else item[input.dataset.key] = input.value;
    message("Unsaved changes.");
  });

  document.getElementById("save-local").addEventListener("click", () => {
    localStorage.setItem("iluminity_catalog_draft", JSON.stringify(catalog));
    message("Local draft saved. Refresh the website to preview it.", "success");
  });

  document.getElementById("reset-local").addEventListener("click", () => {
    localStorage.removeItem("iluminity_catalog_draft");
    message("Local draft removed. Reload this page to restore the published catalog.", "success");
  });

  document.getElementById("export-json").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(catalog, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `iluminity-catalog-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    message("JSON backup exported.", "success");
  });

  document.getElementById("pull-sheet").addEventListener("click", async () => {
    if (!endpoint.value) return message("Paste the Apps Script URL first.", "error");
    try {
      message("Loading catalog…");
      const response = await fetch(`${endpoint.value}?action=catalog`);
      const result = await response.json();
      if (!result.ok || !Array.isArray(result.data)) throw new Error(result.error || "Invalid response");
      catalog = result.data;
      localStorage.setItem("iluminity_sheet_endpoint", endpoint.value);
      localStorage.setItem("iluminity_catalog_draft", JSON.stringify(catalog));
      render();
      message("Catalog loaded from Google Sheets and saved locally.", "success");
    } catch (error) {
      message(`Could not load: ${error.message}`, "error");
    }
  });

  document.getElementById("push-sheet").addEventListener("click", async () => {
    if (!endpoint.value || !secret.value) return message("The endpoint and session write key are required.", "error");
    try {
      message("Synchronizing…");
      const response = await fetch(endpoint.value, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "replaceCatalog", secret: secret.value, data: catalog })
      });
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || "Sync failed");
      localStorage.setItem("iluminity_sheet_endpoint", endpoint.value);
      message("Google Sheet synchronized successfully.", "success");
      secret.value = "";
    } catch (error) {
      message(`Could not synchronize: ${error.message}`, "error");
    }
  });

  render();
})();
