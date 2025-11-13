# 🎨 VISUAL ARCHITECTURE & DATA FLOW

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Smart Factory Tracker App                        │
│                        React Application                            │
└─────────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
         ┌──────────▼──────────┐  ┌────▼────────────────┐
         │   React Pages       │  │  UI Components      │
         │                     │  │                     │
         │ • Dashboard         │  │ • Navbar            │
         │ • AddMaintenance    │  │ • Sidebar           │
         │ • Reports           │  │ • MachineCard       │
         │ • CalendarView      │  │ • Charts            │
         │ • SpareParts        │  │ • Buttons           │
         │ • Login             │  │ • Forms             │
         └──────────┬──────────┘  └────┬────────────────┘
                    │                  │
                    └──────────────────┘
                           │
                ┌──────────▼──────────┐
                │   localStorage      │
                │   (Browser Memory)  │
                │                     │
                │ maintenance_logs    │ ← Maintenance records
                │ spare_parts         │ ← Spare parts records
                │                     │
                └─────────────────────┘
                
         ❌ NO Firebase (Not used)
         ✅ Data only on THIS computer
         ✅ Data persists after page refresh
```

---

## 🔄 **DATA FLOW DIAGRAM**

### **When Adding a Record**

```
User fills form
     │
     ▼
┌─────────────────────┐
│ AddMaintenance.js   │
│                     │
│ handleSubmit()      │
└──────────┬──────────┘
           │
           ▼
     Create Object
  {id, machineName, ...}
           │
           ▼
┌──────────────────────────────┐
│ localStorage.setItem()       │
│ Key: "maintenance_logs"      │
└──────────┬───────────────────┘
           │
           ▼
    Save to Browser
    (survives refresh)
           │
           ▼
┌──────────────────────────────┐
│ Success Message              │
│ "✅ Record added!"           │
└──────────────────────────────┘
           │
           ▼
Dashboard/Reports
auto-update to show
new record
```

---

### **When Viewing Records**

```
Dashboard or Reports page loads
           │
           ▼
┌──────────────────────────────┐
│ useEffect Hook (load data)   │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ localStorage.getItem()       │
│ Key: "maintenance_logs"      │
└──────────┬───────────────────┘
           │
           ▼
    Fetch Array of Records
    from Browser Storage
           │
           ▼
┌──────────────────────────────┐
│ JSON.parse()                 │
│ Convert string to objects    │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ Sort by timestamp            │
│ Latest first                 │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ setState(logs)               │
│ Store in React state         │
└──────────┬───────────────────┘
           │
           ▼
Display Records in
Table/Cards on Page
```

---

### **When Completing a Record**

```
User clicks "✓ Done" button
           │
           ▼
┌──────────────────────────────┐
│ completeRecord(id)           │
│ Function called              │
└──────────┬───────────────────┘
           │
           ▼
Find record with matching ID
           │
           ▼
Add to record:
• status: "completed"
• completedDate: timestamp
           │
           ▼
┌──────────────────────────────┐
│ localStorage.setItem()       │
│ Update "maintenance_logs"    │
└──────────┬───────────────────┘
           │
           ▼
Update React state
           │
           ▼
Page re-renders
Record shows as completed
```

---

### **When Deleting a Record**

```
User clicks "🗑️ Delete" button
           │
           ▼
┌──────────────────────────────┐
│ Confirmation Dialog          │
│ "Are you sure?"              │
└──────────┬───────────────────┘
           │
       ┌───┴───┐
       │       │
      YES     NO
       │       │
       │      Return
       │       │
       ▼      ▼
┌──────────────────────────────┐
│ deleteRecord(id)             │
│ Filter out record by ID      │
└──────────┬───────────────────┘
           │
           ▼
    Array without deleted record
           │
           ▼
┌──────────────────────────────┐
│ localStorage.setItem()       │
│ Save updated array           │
└──────────┬───────────────────┘
           │
           ▼
Update React state
           │
           ▼
Success Message:
"✅ Record deleted!"
           │
           ▼
Page re-renders
Record gone
```

---

## 📱 **PAGE NAVIGATION**

```
                    ┌────────────────┐
                    │  Smart Factory │
                    │  Tracker App   │
                    └────────┬───────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
      ┌─────▼────┐    ┌─────▼────┐    ┌─────▼────┐
      │Dashboard  │    │  Calendar│    │ Spare    │
      │           │    │          │    │  Parts   │
      │ • View    │    │ • Visual │    │          │
      │   records │    │   calendar    │ • Track  │
      │ • Status  │    │ • Scheduled   │   parts  │
      │   charts  │    │   dates       │ • History│
      │ • Delete  │    │                │ • Export │
      │ • Complete│    │                └──────────┘
      └─────┬────┘    └──────────┘
            │
      ┌─────┴────┐         ┌──────────────┐
      │Reports   │         │Add Maintenance
      │          │         │               │
      │ • Filter │         │ • Add new    │
      │ • Search │         │   record     │
      │ • Export │         │ • Set dates  │
      │ • Delete │         │ • Save data  │
      │ • Complete          └──────────────┘
      └────┬────┘
           │
      ┌────▼─────┐
      │  Login   │
      │          │
      │ • User   │
      │   auth   │
      └──────────┘
```

---

## 💾 **localStorage STRUCTURE**

```
Browser Storage (localStorage)
│
├── Key: "maintenance_logs"
│   │
│   └── Value: [
│         {
│           id: "1699884000",
│           machineName: "CNC A",
│           date: "2025-11-13",
│           readings: ["98.5", "45"],
│           issue: "Minor wear",
│           technician: "John",
│           maintenanceInterval: "30",
│           nextDue: "2025-12-13",
│           timestamp: "2025-11-13T14:30:00Z",
│           status: "completed",  ← NEW (optional)
│           completedDate: "..."  ← NEW (optional)
│         },
│         {
│           id: "1699884001",
│           machineName: "Motor B",
│           ... (more records)
│         }
│       ]
│
└── Key: "spare_parts"
    │
    └── Value: [
          {
            id: "1699884002",
            partName: "Bearing",
            quantity: 5,
            cost: 250,
            machineUsed: "Motor B",
            replacementDate: "2025-11-10",
            technician: "Jane",
            notes: "Factory std",
            timestamp: "2025-11-13T14:30:00Z"
          },
          ... (more parts)
        ]
```

---

## 🎯 **ACTION BUTTONS FLOW**

```
┌──────────────────────┐
│  Dashboard/Reports   │
│   Table with Data    │
└──────────┬───────────┘
           │
      ┌────┴────┐
      │          │
      ▼          ▼
  ✓ Done    🗑️ Delete
      │          │
      │          │
      ▼          ▼
  Mark        Confirm
 Complete    Deletion
      │          │
      ▼          ▼
  Update      Remove
 Status        Data
      │          │
      ▼          ▼
 Save to     Save to
localStorage localStorage
      │          │
      ▼          ▼
Success      Success
Message      Message
```

---

## 🔒 **SECURITY FLOW**

```
┌─────────────────────────────────────────┐
│  Browser (Your Computer)                │
│                                         │
│  ┌────────────────────────────────────┐ │
│  │  localStorage                      │ │
│  │  (Protected by browser)            │ │
│  │                                    │ │
│  │  ✅ Same browser access only       │ │
│  │  ✅ Same domain access only        │ │
│  │  ✅ No network transmission        │ │
│  │  ❌ NOT visible online             │ │
│  │  ❌ NOT on servers                 │ │
│  │  ❌ NOT shared with others         │ │
│  └────────────────────────────────────┘ │
│                                         │
│  ❌ NO Firebase (not used)              │
│  ❌ NO Internet upload                  │
│  ❌ NO Cloud storage                    │
└─────────────────────────────────────────┘
       ▼
  Only on THIS device
  Only accessible to THIS user
  Only when using THIS browser
```

---

## 📊 **STATUS INDICATOR FLOW**

```
nextDue Date
     │
     ▼
┌──────────────────────┐
│ Calculate Days Until │
│      Due Date        │
└──────────┬───────────┘
           │
      ┌────┴─────┬────────┐
      │           │        │
      ▼           ▼        ▼
 < 0 days   0-7 days   > 7 days
      │           │        │
      ▼           ▼        ▼
 OVERDUE    DUE SOON   ON TIME
 (RED)     (YELLOW)   (GREEN)
      │           │        │
      └────┬──────┴────┬───┘
           │           │
           ▼           ▼
    Update Record   Display Color
    Status Color    in Table
```

---

## 🔄 **EXPORT FLOW**

```
┌──────────────────────┐
│  Reports Page        │
│  With Filtered Data  │
└──────────┬───────────┘
           │
      ┌────┴────┐
      │          │
      ▼          ▼
 📥 PDF     📊 CSV
      │          │
      │          │
      ▼          ▼
Format    Format
Data for  Data for
PDF       Excel
      │          │
      ▼          ▼
Generate  Create
PDF       CSV
File      File
      │          │
      ▼          ▼
Download  Download
as PDF    as Excel
      │          │
      └────┬─────┘
           │
           ▼
    Saved in
  Downloads
    Folder
```

---

## 🚀 **DEPLOYMENT ARCHITECTURE**

```
┌────────────────────────────────────┐
│  Development (Current Setup)       │
│                                    │
│  npm start → localhost:3000        │
│  React Dev Server                  │
│  localStorage storage              │
│  Single device usage               │
└────────────────────────────────────┘
         │
         │ (optional upgrade)
         ▼
┌────────────────────────────────────┐
│  Production (With Firebase)        │
│                                    │
│  npm run build → Deployment        │
│  Firestore database                │
│  Cloud backup                      │
│  Multi-device access               │
│  Team collaboration                │
└────────────────────────────────────┘
```

---

## ✅ **FEATURE COMPLETION MATRIX**

```
Feature                Status    Where              New?
─────────────────────────────────────────────────────────
Add Records            ✅ Done  AddMaintenance.js   No
View Dashboard         ✅ Done  Dashboard.js        No
View Reports           ✅ Done  Reports.js          No
Filter Data            ✅ Done  Reports.js          No
Export PDF             ✅ Done  Reports.js          No
Export CSV             ✅ Done  Reports.js          No
Calendar View          ✅ Done  CalendarView.js     No
Spare Parts Track      ✅ Done  SpareParts.js       No
🆕 DELETE Records      ✅ Done  Dashboard/Reports   YES ⭐
🆕 COMPLETE Records    ✅ Done  Dashboard/Reports   YES ⭐
Data Persistence       ✅ Done  localStorage        No
Offline Support        ✅ Done  localStorage        No
Responsive Design      ✅ Done  All pages           No
Mobile Friendly        ✅ Done  All pages           No
```

---

**Visual Architecture Complete! 🎨**
**All data flows documented and ready for use.**
