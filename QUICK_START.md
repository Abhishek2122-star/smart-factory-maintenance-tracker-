# 🚀 Quick Start Guide - Smart Factory Maintenance Tracker

## 5-Minute Setup

### Step 1: Start the Application
```bash
cd e:\OneDrive\Desktop\hackathon\smart-factory-tracker
npm start
```

The app will open at `http://localhost:3000` (or another port if 3000 is busy)

### Step 2: Add Your First Maintenance Log
1. Click **"Add Maintenance"** in the navigation
2. Fill in the form:
   - **Machine Name:** CNC-01
   - **Date:** Today's date
   - **Readings:** Temperature: 85°C, RPM: 1200
   - **Issue:** Normal operation
   - **Technician:** Your name
   - **Interval:** 30 (days)
   - **Status:** Completed
3. Click **"Add Maintenance Record"**

### Step 3: View Dashboard
1. Click **"Dashboard"** (or home icon)
2. See your machine status:
   - ✅ On Time count
   - ⚠️ Due Soon count
   - 🔴 Overdue count
3. View the maintenance chart and recent logs

### Step 4: Check Calendar
1. Click **"Calendar"**
2. See maintenance dates highlighted
3. Check "Next 30 Days" list

### Step 5: Export Report
1. Click **"Reports"**
2. (Optional) Filter by machine
3. Click **"Export as PDF"** button
4. PDF downloads to your computer

---

## 📊 What Data Is Saved?

Each maintenance record includes:
- ✅ Machine name
- ✅ Maintenance date
- ✅ Machine readings (sensors/gauges)
- ✅ Issues found
- ✅ Technician who performed maintenance
- ✅ **Auto-calculated** next due date
- ✅ Status flag (On Time / Due Soon / Overdue)

---

## 🎨 Status Indicators

| Status | Color | Days Until Due | Meaning |
|--------|-------|----------------|---------|
| On Time | 🟢 Green | 8+ days | No urgent action needed |
| Due Soon | 🟡 Yellow | 1-7 days | Schedule maintenance soon |
| Overdue | 🔴 Red | 0 or less | Schedule immediately |

---

## 🔧 Features at a Glance

| Feature | Location | Purpose |
|---------|----------|---------|
| Log Maintenance | /add | Record daily machine checks |
| Dashboard | / | See overall status |
| Reports | /reports | View history & export PDF |
| Calendar | /calendar | Plan future maintenance |

---

## 💾 Data Storage

All data is saved to **Firebase Firestore** (cloud database):
- ✅ Real-time updates
- ✅ Cloud backup
- ✅ Accessible from anywhere
- ✅ Secure authentication-ready

---

## ❓ Common Tasks

### Add 5 Maintenance Records Quickly
1. Go to "Add Maintenance"
2. Use different machine names: CNC-01, CNC-02, Lathe-01, etc.
3. Use today's date for all
4. Fill technician name and click Submit
5. Repeat 5 times

### Find Overdue Machines
1. Go to Dashboard
2. Look for 🔴 Red cards at the top
3. Scroll down to see overdue machines in table (marked with red background)

### Generate Monthly Report
1. Go to Reports
2. Scroll to bottom for all records
3. Click "Export as PDF"
4. Share the PDF with management

### Check Next 30 Days
1. Go to Calendar
2. Scroll to bottom section
3. See "Upcoming Maintenance (Next 30 Days)"
4. Plan work schedule accordingly

---

## 🎯 Example Workflow for Day 1

**9:00 AM - Morning Shift Starts**
1. Tech logs into app
2. Goes to "Add Maintenance"
3. Checks CNC-01:
   - Logs readings: Temp 82°C, RPM 1150
   - Notes: "All normal, no issues"
   - System auto-sets next due: Dec 13
4. Repeats for CNC-02, Lathe-01, etc.

**2:00 PM - Supervisor Review**
1. Manager opens Dashboard
2. Sees at a glance:
   - 5 machines On Time ✅
   - 2 machines Due Soon ⚠️
   - 1 machine Overdue 🔴
3. Assigns team to handle overdue machine

**4:00 PM - Reporting**
1. Manager goes to Reports
2. Filters for Lathe-01
3. Exports PDF for records
4. Sends to maintenance coordinator

---

## 🛠️ Troubleshooting

### App won't start?
```bash
# Kill any running processes and try again
npm start
```

### Can't see data after adding?
1. Wait 2 seconds for Firebase sync
2. Refresh the page (F5)
3. Check browser console for errors

### PDF export not working?
1. Try another browser
2. Check if pop-up is blocked
3. Check browser developer tools (F12 → Console)

---

## 📱 Mobile Friendly?

✅ Yes! The app works on phones and tablets:
- Responsive design adapts to screen size
- Touch-friendly buttons
- Mobile-optimized tables and forms

---

## 🔐 Security Note

Currently uses **demo Firebase credentials**. For production:
1. Create your own Firebase project
2. Update `src/Firebase/firebaseConfig.js`
3. Set up proper Firestore security rules
4. Enable authentication

---

## 📞 Need Help?

Check the full documentation:
- Full README: `README_COMPLETE.md`
- Architecture: See `README_COMPLETE.md` → Architecture section
- API Reference: See `README_COMPLETE.md` → API Reference section

---

**Ready?** Start with Step 1! 🚀

