# 📊 Smart Factory Tracker - Data Management Guide

## 🎯 Current Architecture (localStorage vs Firebase)

### **Data Storage: WHERE IS YOUR DATA?**

Your data is stored in **Browser's localStorage** - NOT on Firebase.

```
┌─────────────────────────────────────────┐
│  Your Computer / Browser                │
│  ┌──────────────────────────────────┐   │
│  │  localStorage                    │   │
│  │  ├─ maintenance_logs (Array)    │   │
│  │  └─ spare_parts (Array)         │   │
│  └──────────────────────────────────┘   │
│         ↓ Survives page refresh         │
│         ↓ No network needed             │
└─────────────────────────────────────────┘
```

---

## 💾 Data Structure

### **Maintenance Records** (`localStorage: "maintenance_logs"`)

Each record has:
```javascript
{
  id: "1699884000000",                    // Unique ID (timestamp)
  machineName: "CNC Machine A",           // Machine identifier
  date: "2025-11-13",                     // Date of maintenance
  readings: ["98.5", "45.2"],             // Equipment readings
  issue: "Minor wear on spindle",         // Problem description
  technician: "John Doe",                 // Who performed maintenance
  maintenanceInterval: "30",              // Days until next maintenance
  nextDue: "2025-12-13",                  // Next scheduled date
  timestamp: "2025-11-13T14:30:00.000Z",  // When record was created
  status: "completed",                    // (optional) "completed" or omitted
  completedDate: "2025-11-14T10:00:00Z"   // (optional) When marked complete
}
```

### **Spare Parts Records** (`localStorage: "spare_parts"`)

Each record has:
```javascript
{
  id: "1699884000001",                    // Unique ID
  partName: "Bearing Set",                // Part name
  quantity: 5,                            // Quantity used
  cost: 250.00,                           // Cost per unit
  machineUsed: "Motor B",                 // Which machine
  replacementDate: "2025-11-10",          // When replaced
  technician: "Jane Smith",               // Who replaced it
  notes: "Factory standard",              // Additional notes
  timestamp: "2025-11-13T14:30:00.000Z"   // When recorded
}
```

---

## 🔄 Complete Operations (NEW FEATURE)

### **✅ Mark as Done / Complete**

**How it works:**
1. Click **"✓ Done"** button on any maintenance record in Dashboard or Reports
2. The record gets marked with:
   - `status: "completed"`
   - `completedDate: <current_date>`
3. Record stays in the list but now shows it's completed
4. This is saved to localStorage automatically

**When to use:**
- Maintenance task is finished
- Want to track completion date
- Record serves as historical log

---

### **🗑️ Delete Records**

**How it works:**
1. Click **"🗑️ Delete"** button on any record
2. Confirmation dialog appears: "Are you sure you want to delete this record?"
3. If you click "Yes", record is PERMANENTLY removed from localStorage
4. Record is gone and cannot be recovered

**When to use:**
- Accidental/duplicate entries
- Testing records you no longer need
- Cleaning up old test data

**⚠️ WARNING: Deletion is permanent!**

---

## 🔐 Backup & Data Protection

Since data is in localStorage (local browser storage), you need backups:

### **Method 1: Export to PDF (Recommended)**
- Dashboard → See all recent records
- Reports → Filter and click **📥 Export PDF**
- Creates a printable/shareable PDF file

### **Method 2: Export to CSV**
- Reports page → Click **📊 Export CSV**
- Creates spreadsheet file (.csv)
- Can open in Excel or Google Sheets
- Can reimport later if needed

### **Method 3: Browser Backup**
- All data saved in browser storage
- If you clear browser cache → DATA LOST
- Different browsers have separate localStorage
- Different computers have separate storage

---

## ❓ DO YOU NEED FIREBASE?

### **Current Setup: NO FIREBASE**
✅ Data saved locally (fast)
✅ Works offline
✅ Simple and direct
❌ Data only on this computer
❌ No cloud backup
❌ Lost if browser cache cleared

### **WHEN TO USE FIREBASE:**

**Use Firebase IF you want:**
1. **Cloud backup** - Data accessible from any device
2. **Multi-user access** - Share data with team members
3. **Real-time sync** - Updates across devices automatically
4. **Security** - Professional backup & recovery
5. **Analytics** - Track maintenance trends across locations

**How to add Firebase (Optional):**
1. Set up Firebase Firestore rules to allow read/write
2. Update each component:
   - Remove: `localStorage.getItem()`
   - Add: `getDocs(query(...))` to read from Firestore
   - Add: `addDoc(collection(...))` to write to Firestore
3. Data appears on Firebase Console

### **For Now: localStorage is SUFFICIENT**
- Single location/machine use ✅
- Testing and development ✅
- Small team on same network ✅

---

## 📋 Quick Reference: Data Operations

| Operation | Where | How | Result |
|-----------|-------|-----|--------|
| **Add Record** | AddMaintenance page | Fill form → Click "Add" | Saved to localStorage |
| **View Records** | Dashboard | Records auto-load | Shows latest 10 records |
| **View All & Filter** | Reports page | Set filters → View | Shows all matching records |
| **Mark as Done** | Dashboard/Reports | Click "✓ Done" button | Record marked complete |
| **Delete Record** | Dashboard/Reports | Click "🗑️ Delete" → Confirm | Record permanently removed |
| **Export PDF** | Reports page | Click "📥 Export PDF" | Creates PDF file |
| **Export CSV** | Reports page | Click "📊 Export CSV" | Creates spreadsheet file |
| **View Calendar** | CalendarView page | Visual calendar display | Shows upcoming maintenance |

---

## 🚀 Workflow Example

### **Day-to-Day Usage:**

1. **Morning**: Check Dashboard for overdue/due soon maintenance ⚠️
2. **Perform Maintenance**: Use AddMaintenance page to log work
3. **During Work**: Record readings, technician name, next maintenance date
4. **After Completion**: Click "✓ Done" to mark as completed
5. **Weekly**: Export PDF/CSV report for management review
6. **Monthly**: Review Reports page with filters to analyze trends

---

## 💡 Important Notes

### **Data Persistence:**
- Data survives page refreshes ✅
- Data survives browser close/reopen ✅
- Data LOST if browser cache cleared ❌
- Data LOST if private/incognito mode used ❌
- Data LOST if browser uninstalled ❌

### **Security:**
- localhost only (not exposed online) ✅
- No login required currently ✅
- Anyone with access to computer can see data ⚠️

### **Recommendations:**
1. **Regular backups**: Export PDF/CSV weekly
2. **Keep copies**: Save exported files on cloud drive
3. **Document deletions**: Note why records were deleted
4. **Future upgrade**: Add Firebase when multi-user access needed

---

## 🔗 Next Steps

### **If Everything Works:**
- Continue using localStorage for current MVP
- Regular manual backups via PDF/CSV
- Monitor app performance

### **If You Need Advanced Features:**
- Set up Firebase Firestore
- Add user authentication
- Enable multi-location sync
- Create admin dashboard

### **Questions?**
All maintenance logic stored in:
- `src/pages/Dashboard.js` - View/manage records
- `src/pages/Reports.js` - Filter & export records
- `src/pages/AddMaintenance.js` - Add new records
- `src/pages/CalendarView.js` - Visual calendar
- `src/pages/SpareParts.js` - Track spare parts

---

**Last Updated:** November 13, 2025
**Status:** ✅ Working with localStorage
**Data Safety:** Manual backups recommended
