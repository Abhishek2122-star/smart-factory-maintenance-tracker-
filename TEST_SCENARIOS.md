# 🧪 Test Scenarios - Smart Factory Maintenance Tracker

## Pre-Testing Checklist
- [ ] Dev server running (`npm start`)
- [ ] No console errors
- [ ] Firebase connection working
- [ ] Browser: Chrome, Firefox, or Safari

---

## Test Suite 1: Adding Maintenance Records

### Test 1.1: Add Valid Maintenance Record
**Steps:**
1. Navigate to "Add Maintenance" page
2. Fill form:
   - Machine Name: `CNC-01`
   - Date: `2025-11-13`
   - Readings: `Temperature: 85°C, RPM: 1200, Pressure: 150 PSI`
   - Issue: `Routine maintenance`
   - Technician: `John Smith`
   - Interval: `30`
   - Status: `Completed`
3. Click "Add Maintenance Record"

**Expected Result:**
- ✅ Success message appears
- ✅ Form clears
- ✅ Data saves to Firestore
- ✅ Message disappears after 3 seconds

---

### Test 1.2: Validate Required Fields
**Steps:**
1. Navigate to "Add Maintenance" page
2. Leave Machine Name empty
3. Click "Add Maintenance Record"

**Expected Result:**
- ✅ Browser validation prevents submission
- ✅ Error message: "Please fill all required fields!"

---

### Test 1.3: Add Multiple Records (Different Machines)
**Steps:**
1. Add record for `CNC-01` (follow Test 1.1)
2. Add record for `CNC-02` (same date)
3. Add record for `Lathe-01` (same date)
4. Add record for `Mill-03` (same date)

**Expected Result:**
- ✅ All records saved successfully
- ✅ Each gets unique next due date: 2025-12-13

---

### Test 1.4: Custom Maintenance Interval
**Steps:**
1. Add record with:
   - Machine: `Compressor-01`
   - Date: `2025-11-13`
   - Interval: `14` (2 weeks)
   - Technician: `Jane Doe`
2. Submit form

**Expected Result:**
- ✅ Next due date calculated: 2025-11-27 (14 days later)
- ✅ Appears in dashboard/reports with correct date

---

## Test Suite 2: Dashboard Status Highlighting

### Test 2.1: Verify Status Indicators
**Prerequisites:** Add at least 3 machines (use Test 1.3)

**Steps:**
1. Navigate to Dashboard
2. Observe status cards at top

**Expected Results:**
- ✅ "✅ On Time" card shows count: 3 (green)
- ✅ "⚠️ Due Soon" card shows: 0 (yellow)
- ✅ "🔴 Overdue" card shows: 0 (red)

---

### Test 2.2: Verify Maintenance Table
**Steps:**
1. On Dashboard, scroll down to "Recent Maintenance Logs" table
2. Check first 3 rows

**Expected Result:**
- ✅ Table shows all machines added in Test 1.3
- ✅ All rows have green background (On Time status)
- ✅ Machine names display correctly
- ✅ Dates are properly formatted
- ✅ Next Due dates show +30 days

---

### Test 2.3: Verify Pie Chart
**Steps:**
1. On Dashboard, look for "Maintenance Status Chart"
2. Observe pie chart

**Expected Result:**
- ✅ Pie chart displays
- ✅ Shows "On Time: 3" segment
- ✅ Legend shows status types
- ✅ Chart is responsive

---

### Test 2.4: Test Status Logic (Simulated Dates)
**Manual Verification:**
- Record with nextDue = today + 20 days → Green (On Time)
- Record with nextDue = today + 5 days → Yellow (Due Soon)
- Record with nextDue = today - 2 days → Red (Overdue)

**Expected Result:**
- ✅ Color coding matches logic

---

## Test Suite 3: Reports Page

### Test 3.1: View All Records in Reports
**Prerequisites:** Complete Test Suite 1 (4 records added)

**Steps:**
1. Navigate to "Reports" page
2. Observe table with all records

**Expected Result:**
- ✅ All 4 machines from Test 1.3 appear
- ✅ Table shows columns: Machine, Date, Readings, Issue, Technician, Next Due, Status
- ✅ All data displays correctly
- ✅ Status column shows "On Time" with green background

---

### Test 3.2: Filter by Machine
**Steps:**
1. On Reports page, open "Filter by Machine" dropdown
2. Select `CNC-01`
3. Observe table

**Expected Result:**
- ✅ Dropdown shows all unique machine names (CNC-01, CNC-02, Lathe-01, Mill-03)
- ✅ Table shows only CNC-01 record
- ✅ Record count shows: "Total Records: 1"

---

### Test 3.3: Export to PDF
**Steps:**
1. On Reports page, select "All Machines" filter
2. Click "Export as PDF" button
3. Check downloads folder

**Expected Result:**
- ✅ PDF file downloads with name: `maintenance_report_[timestamp].pdf`
- ✅ PDF opens and contains:
  - Title: "Smart Factory Maintenance Report"
  - Generated timestamp
  - Summary (On Time: 4, Due Soon: 0, Overdue: 0)
  - Table with all records
  - Properly formatted

---

### Test 3.4: Export Single Machine Report
**Steps:**
1. Filter by machine: `CNC-01`
2. Click "Export as PDF"
3. Check downloads

**Expected Result:**
- ✅ PDF downloads with filtered data
- ✅ Contains only CNC-01 record
- ✅ Filename includes timestamp

---

## Test Suite 4: Calendar View

### Test 4.1: Display Current Month Calendar
**Steps:**
1. Navigate to "Calendar" page
2. Observe calendar grid

**Expected Result:**
- ✅ Calendar shows current month (November 2025)
- ✅ Days of week header: Sun, Mon, Tue, Wed, Thu, Fri, Sat
- ✅ Calendar grid displays 7 columns
- ✅ Dates 1-30 visible

---

### Test 4.2: View Scheduled Maintenance on Calendar
**Steps:**
1. On Calendar, find November 13 (today's date)
2. Check if colored boxes appear

**Expected Result:**
- ✅ Date cells with maintenance show green background (On Time)
- ✅ Machine names display in colored cells
- ✅ Technician names visible

---

### Test 4.3: Month Navigation
**Steps:**
1. Click "Next →" button
2. Observe calendar changes to December 2025
3. Click "← Previous" button
4. Observe calendar returns to November 2025

**Expected Result:**
- ✅ Month navigation works correctly
- ✅ Calendar updates immediately
- ✅ Month/year title updates
- ✅ Can navigate backward and forward

---

### Test 4.4: Upcoming Maintenance List
**Steps:**
1. On Calendar, scroll to "Upcoming Maintenance (Next 30 Days)"
2. Observe list

**Expected Result:**
- ✅ Shows all maintenance due within 30 days
- ✅ Sorted by due date (earliest first)
- ✅ Shows: Machine, Due Date, Days Left, Technician
- ✅ All records from Test 1.3 appear with "30 days" left
- ✅ Background colors match status (green for On Time)

---

## Test Suite 5: Status Color Consistency

### Test 5.1: Color Match Across Pages
**Steps:**
1. Add maintenance records
2. Check Dashboard colors
3. Check Reports colors
4. Check Calendar colors

**Expected Result:**
- ✅ Green (#d4edda) for On Time on all pages
- ✅ Yellow (#fff3cd) for Due Soon on all pages
- ✅ Red (#f8d7da) for Overdue on all pages

---

## Test Suite 6: Error Handling

### Test 6.1: Network Error Recovery
**Steps:**
1. Disconnect internet
2. Try to submit maintenance form
3. Observe error message
4. Reconnect internet

**Expected Result:**
- ✅ Error message displays: "Error adding record: [error details]"
- ✅ Message shows in red/alert box
- ✅ Form remains filled for retry

---

### Test 6.2: Empty Database
**Steps:**
1. (Hypothetically) Clear all records
2. Navigate to Dashboard

**Expected Result:**
- ✅ Shows message: "No maintenance logs yet. Start by adding a log!"
- ✅ Status cards show: 0, 0, 0
- ✅ No errors in console

---

## Test Suite 7: Data Persistence

### Test 7.1: Data Survives Refresh
**Steps:**
1. Add maintenance record
2. Press F5 (refresh page)
3. Navigate to Dashboard

**Expected Result:**
- ✅ Record still appears after refresh
- ✅ Data persists (Firebase sync working)

---

### Test 7.2: Real-time Update
**Steps:**
1. Add record on page A
2. Open page B (Reports) in another tab
3. Observe data

**Expected Result:**
- ✅ New record appears immediately on page B
- ✅ Shows real-time synchronization

---

## Test Suite 8: Responsive Design

### Test 8.1: Mobile View (360px width)
**Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar
3. Set to iPhone SE (375px)
4. Navigate through all pages

**Expected Result:**
- ✅ All pages readable on small screen
- ✅ Tables scroll horizontally
- ✅ Forms stack vertically
- ✅ Buttons clickable
- ✅ Calendar responsive

---

### Test 8.2: Tablet View (768px width)
**Steps:**
1. Toggle device toolbar to iPad (768px)
2. Check all pages

**Expected Result:**
- ✅ Optimal layout for tablet
- ✅ Grid adjusts appropriately
- ✅ Charts visible

---

## Test Suite 9: Navigation

### Test 9.1: Navigation Links Work
**Steps:**
1. Click each nav link:
   - Dashboard (/)
   - Add Maintenance (/add)
   - Calendar (/calendar)
   - Reports (/reports)
2. Verify page loads

**Expected Result:**
- ✅ All links navigate correctly
- ✅ URL updates in address bar
- ✅ Page content updates
- ✅ No console errors

---

## Test Suite 10: Performance

### Test 10.1: Add 50 Records Performance
**Steps:**
1. Add 10 records
2. Go to Dashboard → should load quickly
3. Go to Reports → should load quickly
4. Go to Calendar → should load quickly

**Expected Result:**
- ✅ Dashboard loads in < 2 seconds
- ✅ Reports loads in < 2 seconds
- ✅ Calendar loads in < 2 seconds
- ✅ No lag or freezing

---

## 🎯 Test Execution Summary

### Quick Test (10 minutes)
1. ✅ Test 1.1 - Add valid record
2. ✅ Test 2.1 - Check Dashboard status
3. ✅ Test 3.1 - View Reports
4. ✅ Test 3.3 - Export PDF
5. ✅ Test 4.1 - View Calendar

### Full Test (45 minutes)
- Complete all test suites 1-10

### Recommended Test Order
1. Suite 1: Verify data input works
2. Suite 2: Verify display logic
3. Suite 3: Verify reports
4. Suite 4: Verify calendar
5. Suite 5: Verify consistency
6. Suite 6: Verify error handling
7. Suite 7: Verify persistence
8. Suite 8: Verify responsive
9. Suite 9: Verify navigation
10. Suite 10: Verify performance

---

## ✅ Sign-Off Checklist

After completing tests, verify:
- [ ] All features work as expected
- [ ] No console errors
- [ ] Data persists correctly
- [ ] Colors are consistent
- [ ] Mobile responsive
- [ ] PDF exports successfully
- [ ] Navigation works
- [ ] Performance acceptable
- [ ] Ready for deployment

---

**Last Updated:** November 13, 2025  
**Version:** 1.0 Test Suite  
**Total Tests:** 25+  
**Estimated Time:** 45 minutes (full) / 10 minutes (quick)

