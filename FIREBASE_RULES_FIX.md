# Firebase Firestore Rules - SOLUTION

## 🚨 THE MOST COMMON CAUSE

When records don't save, it's usually **Firestore Security Rules** blocking the write.

---

## ✅ FIX: Update Firestore Rules

### Step 1: Go to Firebase Console
1. Visit: https://console.firebase.google.com/
2. Click project: `smart-factory-tracker-832a5`
3. Left sidebar → **Firestore Database**
4. Click tab: **Rules**

### Step 2: Replace All Rules

**DELETE all existing rules** and **PASTE this:**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Step 3: Publish
1. Click blue **"Publish"** button
2. Wait for "Rules updated successfully" message
3. ✅ Done!

---

## 🔄 Then Try Again

1. **Restart app:**
   ```bash
   npm start
   ```

2. **Go to:** Add Maintenance

3. **Fill form:**
   - Machine Name: `CNC-01`
   - Date: Today
   - Readings: `Test`
   - Technician: `Me`

4. **Click:** "✅ Add Maintenance Record"

5. **Check:**
   - ✅ Shows "✅ Maintenance record added successfully!"
   - ✅ Form clears
   - ✅ Go to Dashboard, record appears

---

## ⚠️ Security Note

The rules above allow **anyone** to read/write. For production:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /maintenance_logs/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /spare_parts/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

This requires users to login (requires Firebase Auth setup).

---

## 🔍 How to Check Current Rules

1. Go to Firestore Database → Rules tab
2. Look for lines with `allow read, write: if ...`
3. If shows `false` or requires auth → THIS IS YOUR PROBLEM

---

## 🆘 Still Stuck?

After updating rules:

1. **Hard refresh browser:**
   - Windows: `Ctrl + Shift + Delete` (clears cache)
   - Mac: `Cmd + Shift + Delete`

2. **Restart app:**
   ```bash
   npm stop
   npm start
   ```

3. **Check browser console (F12)** for any errors

4. **Try adding record again**

---

**Expected Result:** Record saves immediately! ✅

