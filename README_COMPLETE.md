# 🏭 Smart Factory Maintenance Tracker

A comprehensive web application for manufacturing facilities to log, track, and manage machine maintenance activities. This solution eliminates scattered maintenance logs and prevents unexpected breakdowns through organized scheduling and real-time alerts.

## 🎯 Problem Solved

**Industry:** Manufacturing / Foundry / Machine Shop

**Challenge:** Machine maintenance logs are scattered and often missed, leading to costly breakdowns.

**Solution:** A centralized, cloud-based maintenance tracking system with automated scheduling and status monitoring.

---

## ✨ Key Features

### 1. **📋 Daily Machine Readings Logging**
- Log machine readings (temperature, RPM, pressure, etc.)
- Record maintenance issues found during inspection
- Assign technician responsible for the maintenance
- Set custom maintenance intervals (default: 30 days)
- Track maintenance status (Pending, Completed, Urgent)

**Location:** `Add Maintenance` page → `/add`

### 2. **🔄 Auto-Calculate Next Maintenance Due Date**
- Automatically calculates next maintenance due date based on interval
- Default interval: 30 days (customizable per machine)
- Stores timestamps for audit trails
- Supports any interval from 1 to 365 days

**Implementation:** `src/utils/calculateNextDue.js`

### 3. **🎨 Highlight Overdue Machines on Dashboard**
- **Color-coded status indicators:**
  - 🟢 **Green (On Time):** 8+ days until due
  - 🟡 **Yellow (Due Soon):** 1-7 days until due
  - 🔴 **Red (Overdue):** Past due date
- Real-time status counters
- Maintenance history table with latest logs
- Quick visual overview of fleet health

**Location:** Dashboard → `/`

### 4. **📥 Generate PDF Maintenance Reports**
- Export maintenance records to professional PDF format
- Includes summary statistics (On Time, Due Soon, Overdue counts)
- Detailed table with all maintenance information
- Timestamped reports for compliance
- Per-machine or full fleet reports

**Implementation:** `src/utils/pdfGenerator.js`

### 5. **📅 Maintenance Calendar Dashboard**
- Visual calendar view of scheduled maintenance
- Color-coded maintenance dates (same status colors as dashboard)
- Click to view maintenance details for specific dates
- "Next 30 Days" upcoming maintenance list
- Month navigation (previous/next month)

**Location:** Calendar → `/calendar`

### 6. **🔧 Track Spare Parts Replacement History**
- Chart component ready for spare parts data
- Visual representation of parts usage and costs
- SparePartsChart component with bar chart visualization
- Integration ready for spare parts database

**Location:** `src/Component/charts/SparePartsChart.js`

---

## 🏗️ Architecture

### Project Structure
```
smart-factory-tracker/
├── src/
│   ├── pages/
│   │   ├── Dashboard.js           # Main status overview
│   │   ├── AddMaintenance.js      # Log new maintenance
│   │   ├── Reports.js            # View & export reports
│   │   ├── CalendarView.js        # Calendar scheduling view
│   │   └── Login.js              # Authentication (placeholder)
│   ├── Component/
│   │   └── charts/
│   │       ├── MaintenanceStatusChart.js    # Pie chart visualization
│   │       └── SparePartsChart.js           # Bar chart for parts
│   ├── Firebase/
│   │   └── firebaseConfig.js      # Firebase initialization
│   ├── utils/
│   │   ├── calculateNextDue.js    # Auto-calculate due dates
│   │   └── pdfGenerator.js        # PDF export utility
│   ├── App.js                     # Main app router
│   └── index.js                   # React entry point
├── public/
│   └── index.html
├── package.json
└── README.md
```

### Technology Stack
- **Frontend:** React 18, React Router
- **Styling:** CSS-in-JS (inline styles + CSS modules)
- **Charts:** Recharts (PieChart, BarChart)
- **PDF Export:** jsPDF, jsPDF-AutoTable
- **Backend:** Firebase/Firestore (Cloud Database)
- **Authentication:** Firebase Auth (integrated)
- **Build Tool:** Create React App (Webpack, Babel)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm
- Firebase project (create at [firebase.google.com](https://firebase.google.com))

### Installation

1. **Clone and navigate to project:**
```bash
cd smart-factory-tracker
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up Firebase credentials:**
   - Update `src/Firebase/firebaseConfig.js` with your Firebase project credentials
   - Enable Firestore Database
   - Enable Authentication (optional)

4. **Start development server:**
```bash
npm start
```

The app opens at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

---

## 📊 Data Flow

### Adding Maintenance Record
```
User Input → AddMaintenance.js
    ↓
Validate Fields
    ↓
Calculate Next Due (calculateNextDue.js)
    ↓
Save to Firestore
    ↓
Update Dashboard & Reports
```

### Status Determination
```
Next Due Date → Calculate Days Until Due
    ↓
If days < 0 → Overdue (Red)
If 0-7 days → Due Soon (Yellow)
If 8+ days → On Time (Green)
```

---

## 📱 User Guide

### 1. Adding Maintenance
1. Navigate to "Add Maintenance" tab
2. Enter machine name (e.g., CNC-01)
3. Select maintenance date
4. Enter readings (optional): Temperature, RPM, Pressure, etc.
5. Note any issues found
6. Enter technician name
7. Set maintenance interval (days)
8. Select status
9. Click "Add Maintenance Record"

### 2. Viewing Dashboard
- See summary counts of machines by status
- View pie chart of maintenance distribution
- Browse recent maintenance logs in table
- Identify overdue machines immediately

### 3. Viewing Reports
1. Navigate to "Reports"
2. Filter by machine (optional)
3. Review maintenance history
4. Click "Export as PDF" to download report

### 4. Checking Calendar
1. Navigate to "Calendar"
2. View current month with colored maintenance dates
3. Navigate months using Previous/Next buttons
4. See "Next 30 Days" list of upcoming maintenance
5. Color indicators show maintenance status

---

## 🔐 Database Schema (Firestore)

### Collection: `maintenance_logs`
```json
{
  "machineName": "CNC-01",
  "date": "2025-11-13",
  "readings": ["Temperature: 85°C", "RPM: 1200"],
  "issue": "Unusual noise detected",
  "technician": "John Smith",
  "maintenanceInterval": 30,
  "status": "Completed",
  "nextDue": "2025-12-13",
  "timestamp": "2025-11-13T10:30:00.000Z"
}
```

---

## 🎨 UI Components

### Color Scheme
- **On Time:** #d4edda (Light Green)
- **Due Soon:** #fff3cd (Light Yellow)
- **Overdue:** #f8d7da (Light Red)
- **Primary:** #007bff (Blue)
- **Success:** #28a745 (Green)

### Responsive Design
- Mobile-friendly layout
- Grid-based responsive tables
- Adaptive calendar view
- Touch-friendly buttons and inputs

---

## 📈 Features Roadmap

### Current (v1.0)
✅ Daily maintenance logging
✅ Auto-calculate due dates
✅ Status highlighting
✅ PDF report generation
✅ Calendar view
✅ Spare parts chart component

### Planned (v2.0)
- [ ] Spare parts inventory tracking
- [ ] Predictive maintenance alerts
- [ ] Multi-user authentication with roles
- [ ] Email notifications for overdue machines
- [ ] SMS alerts for critical issues
- [ ] Mobile app (React Native)
- [ ] AI-powered maintenance predictions
- [ ] Vendor management integration
- [ ] Cost analysis and budgeting
- [ ] Machine downtime tracking

---

## 🐛 Troubleshooting

### Issue: Firebase Connection Error
**Solution:** 
1. Verify Firebase credentials in `firebaseConfig.js`
2. Check Firestore rules (allow read/write for development)
3. Ensure Firebase project is active

### Issue: PDF Export Not Working
**Solution:**
1. Ensure jsPDF and jspdf-autotable are installed: `npm install jspdf jspdf-autotable`
2. Check browser console for errors
3. Verify data is properly formatted

### Issue: Build Fails
**Solution:**
```bash
# Clear cache and reinstall
rm -r node_modules
npm install
npm run build
```

---

## 📞 Support

For issues, questions, or feature requests:
1. Check existing documentation
2. Review GitHub issues
3. Create a new issue with details

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👥 Contributors

Built for hackathon manufacturing challenge

---

## 🎓 API Reference

### calculateNextDueDate(lastDate, days = 30)
```javascript
import { calculateNextDueDate } from "../utils/calculateNextDue";

const nextDue = calculateNextDueDate("2025-11-13", 30);
// Returns: "2025-12-13"
```

### generateMaintenanceReport(logs)
```javascript
import { generateMaintenanceReport } from "../utils/pdfGenerator";

generateMaintenanceReport(maintenanceLogs);
// Generates and downloads PDF report
```

---

## 🚢 Deployment

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

---

**Version:** 1.0.0  
**Last Updated:** November 13, 2025  
**Status:** Production Ready ✅
