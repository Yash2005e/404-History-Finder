async function checkArchive() {
  const input = document.getElementById("urlInput").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!input || !isValidUrl(input)) {
    resultDiv.innerHTML = "⚠️ Please enter a valid URL (e.g., https://example.com)";
    return;
  }

  const api = `https://archive.org/wayback/available?url=${encodeURIComponent(input)}`;

  try {
    const res = await fetch(api);
    const data = await res.json();

    if (data.archived_snapshots && data.archived_snapshots.closest) {
      const snap = data.archived_snapshots.closest;
      resultDiv.innerHTML = `
        ✅ Snapshot Found!<br>
        📅 Date: ${formatTimestamp(snap.timestamp)}<br>
        🌐 <a href="${snap.url}" target="_blank">View Archived Page</a>
      `;
    } else {
      resultDiv.innerHTML = "❌ No archived version found.";
    }
  } catch (error) {
    resultDiv.innerHTML = "❌ Something went wrong. Try again.";
  }
}

function formatTimestamp(ts) {
  return `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)} @ ${ts.slice(8, 10)}:${ts.slice(10, 12)}`;
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
