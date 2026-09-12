DPSCUP v17 — DPSPN White/Blue Premium

Files:
- index.html public live score
- admin.html admin score control + issue reports + tournament summary editor + PDF
- summary.html separate public tournament summary page
- dpspn-logo.png DPSPN logo

Firebase paths:
- dpscup-2-scores (existing)
- dpscup-2-reports
- dpscup-2-summary

Recommended Realtime Database Rules:
{
  "rules": {
    "dpscup-2-scores": { ".read": true, ".write": "auth != null" },
    "dpscup-2-reports": { ".read": "auth != null", ".write": true },
    "dpscup-2-summary": { ".read": true, ".write": "auth != null" }
  }
}
