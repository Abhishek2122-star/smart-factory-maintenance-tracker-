# 🔍 Machine Name Storage - Diagnostic Guide

## Problem
Machine name is not being saved to Firebase

## Solution - Step by Step

### Step 1: Open Browser Console (F12)

1. **Go to the app:** http://localhost:3000/add
2. **Press:** F12 (or right-click → Inspect)
3. **Go to:** Console tab

### Step 2: Try Adding a Record

1. **Fill the form:**
   - Machine Name: `CNC-01` ✏️
   - Date: Today's date
   - Technician: `John` ✏️
   - Click: **✅ Add Maintenance Record**

2. **Watch the Console** - You should see:
   ```
   ✏️ Field changed: machineName = CNC-01
   ✏️ Field changed: date = 2025-11-13
   ✏️ Field changed: technician = John
   📝 Form submitted with data: { machineName: "CNC-01", date: "2025-11-13", ... }
   📤 Saving to Firebase: { machineName: "CNC-01", ... }
   ✅ Document saved with ID: x7K9m2L8qZ1p3
   💾 Full saved document: { machineName: "CNC-01", ... }
   ```

### Step 3: Check Dashboard

1. **Go to Dashboard:** http://localhost:3000
2. **Look at Console again** - Should show:
   ```
   📄 Document x7K9m2L8qZ1p3: { machineName: "CNC-01", ... }
      Machine Name: CNC-01
      Technician: John
      Date: 2025-11-13
   ✅ Total records fetched: 1
   ```

3. **Check Table** - Should see:
   ```
   | Machine | Date | Technician | Next Due | Status |
   |---------|------|------------|----------|--------|
   | CNC-01  | 11/13| John       | 12/13    | On Time|
   ```

---

## 🧪 If Machine Name is NOT Showing

### Check 1: Firebase Security Rules

**Are you getting a "Missing permissions" error?**

If YES:
1. Go to: https://console.firebase.google.com
2. Project: smart-factory-tracker-832a5
3. Firestore Database → Rules
4. Make sure it says: `if true;` (not `if false;`)
5. Click Publish if not already published

### Check 2: Form Input

**Is the machine name input field working?**

In Console, type this:
```javascript
// Type in console:
let input = document.getElementById('machineName');
console.log('Machine name input:', input.value);
```

Should print the value you typed.

### Check 3: Firebase Connection

**Go to:** http://localhost:3000/test

Expected to see: ✅ Connected! Found X records

If you see: ❌ Missing or insufficient permissions
→ Update Firestore Rules (see Check 1)

### Check 4: Firestore Console

**Verify document exists in Firebase:**

1. Go to: https://console.firebase.google.com
2. Project: smart-factory-tracker-832a5
3. Firestore Database → Data tab
4. Look for: **maintenance_logs** collection
5. Click it
6. Inside should see your documents with **machineName** field

---

## 🔧 Common Issues & Fixes

### Issue 1: "Permission denied" Error
```
❌ Error: Missing or insufficient permissions
```

**Fix:**
1. Update Firestore Rules
2. Set to: `allow read, write: if true;`
3. Click Publish

### Issue 2: Machine Name Field Empty in Table
```
The table shows empty machine name column
```

**Fix:**
1. Check console (F12)
2. Look for error messages
3. Verify form is being filled
4. Try refreshing page

### Issue 3: Can't See Documents in Firebase Console
```
maintenance_logs collection is empty
```

**Possible Causes:**
- a) Security rules blocking writes
- b) Document hasn't synced yet
- c) Wrong project selected
- d) Wrong collection name

**Fixes:**
- a) Update rules to `if true;`
- b) Wait 2-3 seconds, refresh
- c) Check project ID is smart-factory-tracker-832a5
- d) Collection name MUST be `maintenance_logs` (exact spelling)

---

## 📊 Expected Console Output

### When Adding Record - Should See:
```javascript
✏️ Field changed: machineName = CNC-01
✏️ Field changed: date = 2025-11-13
✏️ Field changed: readings = 
✏️ Field changed: issue = 
✏️ Field changed: technician = John
✏️ Field changed: maintenanceInterval = 30
✏️ Field changed: status = Pending

📝 Form submitted with data: {
  machineName: "CNC-01",
  date: "2025-11-13",
  readings: "",
  issue: "",
  technician: "John",
  maintenanceInterval: 30,
  status: "Pending"
}

📤 Saving to Firebase: {
  machineName: "CNC-01",
  date: "2025-11-13",
  readings: [],
  issue: "",
  technician: "John",
  maintenanceInterval: 30,
  nextDue: "2025-12-13",
  timestamp: "2025-11-13T10:30:45.123Z",
  status: "Pending"
}

✅ Document saved with ID: x7K9m2L8qZ1p3
💾 Full saved document: {
  machineName: "CNC-01",
  date: "2025-11-13",
  readings: [],
  issue: "",
  technician: "John",
  maintenanceInterval: 30,
  nextDue: "2025-12-13",
  timestamp: "2025-11-13T10:30:45.123Z",
  status: "Pending"
}
```

### When Viewing Dashboard - Should See:
```javascript
📄 Document x7K9m2L8qZ1p3: {
  machineName: "CNC-01",
  date: "2025-11-13",
  readings: [],
  issue: "",
  technician: "John",
  maintenanceInterval: 30,
  nextDue: "2025-12-13",
  timestamp: "2025-11-13T10:30:45.123Z",
  status: "Pending"
}
   Machine Name: CNC-01
   Technician: John
   Date: 2025-11-13

✅ Total records fetched: 1
```

---

## ✅ Quick Checklist

Before considering machine name issue fixed:

- [ ] Filled in Machine Name field: `CNC-01`
- [ ] Filled in Date field: (today)
- [ ] Filled in Technician field: `John`
- [ ] Clicked "Add Maintenance Record" button
- [ ] Got success message: ✅ Maintenance record added successfully!
- [ ] Went to Dashboard
- [ ] Saw record in table with machine name
- [ ] Checked console (F12) - no errors
- [ ] Checked Firebase Console - document exists
- [ ] Document has machineName field with value
- [ ] Real-time updates work (check other tab)

---

## 🎯 Next Steps

### If Everything Works ✅
→ Machine name storage is working!
→ Ready to use the app fully

### If Something Is Wrong ❌
→ Follow the "Common Issues & Fixes" section
→ Check console errors carefully
→ Verify Firestore Rules are updated
→ Try clearing cache: Ctrl+Shift+Delete

### If Still Stuck 🤔
→ Write down exact error message
→ Check console output matches expected
→ Verify project credentials
→ Try different machine name (CNC-02, Lathe-01, etc.)

---

## 📝 Manual Test Script

Try this in browser console (F12):

```javascript
// Test 1: Check if form input exists
console.log("Form input:", document.getElementById('machineName').value);

// Test 2: Check Firebase connection
console.log("Firebase app:", typeof db !== 'undefined' ? "✅ Loaded" : "❌ Not loaded");

// Test 3: Check Firestore collection access
// (You would need to import and test)

// Test 4: Manual document creation
// (Advanced - only if you know JavaScript well)
```

---

## 🚀 After Machine Name Works

Once machine name saves correctly:
- ✅ Data saves to Firebase
- ✅ Real-time updates work
- ✅ Dashboard shows all fields
- ✅ Search/filter will work
- ✅ Delete/Update will work
- ✅ Export to PDF/CSV will work

**Your app will be fully functional!** 🎉

---

**Status:** Diagnostic logging added

**Action:** Try adding a record and check console (F12)

**Expected:** See all the logging messages showing machine name is being saved
