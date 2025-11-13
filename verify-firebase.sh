#!/bin/bash
# Firebase Setup Verification Script

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        🔥 Firebase Setup Verification                         ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "✅ Checking Firebase Package..."
if grep -q '"firebase"' package.json; then
    echo "   ✓ Firebase package installed"
else
    echo "   ✗ Firebase package NOT found - Install with: npm install firebase"
fi

echo ""
echo "✅ Checking Firebase Config..."
if grep -q "firebaseConfig" src/Firebase/firebaseConfig.js; then
    echo "   ✓ Firebase config file exists"
    
    if grep -q "apiKey" src/Firebase/firebaseConfig.js; then
        echo "   ✓ API Key configured"
    fi
    
    if grep -q "projectId" src/Firebase/firebaseConfig.js; then
        echo "   ✓ Project ID configured"
    fi
    
    if grep -q "getFirestore" src/Firebase/firebaseConfig.js; then
        echo "   ✓ Firestore initialized"
    fi
else
    echo "   ✗ Firebase config file NOT found"
fi

echo ""
echo "✅ Checking Firestore Integration..."

if grep -q "from \"firebase/firestore\"" src/pages/Dashboard.js; then
    echo "   ✓ Dashboard.js uses Firestore"
fi

if grep -q "from \"firebase/firestore\"" src/pages/AddMaintenance.js; then
    echo "   ✓ AddMaintenance.js uses Firestore"
fi

if grep -q "from \"firebase/firestore\"" src/pages/Reports.js; then
    echo "   ✓ Reports.js uses Firestore"
fi

echo ""
echo "✅ App Status:"
if [ -d "node_modules" ]; then
    echo "   ✓ Dependencies installed"
else
    echo "   ⚠ Run: npm install"
fi

if [ -f ".git/config" ]; then
    echo "   ✓ Git repository initialized"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        🚀 Next Steps:                                         ║"
echo "├────────────────────────────────────────────────────────────────┤"
echo "║ 1. Update Firestore Security Rules:                          ║"
echo "║    https://console.firebase.google.com                       ║"
echo "║    Project: smart-factory-tracker-832a5                      ║"
echo "║                                                               ║"
echo "║ 2. Replace rules with:                                       ║"
echo "║    rules_version = '2';                                      ║"
echo "║    service cloud.firestore {                                 ║"
echo "║      match /databases/{database}/documents {                 ║"
echo "║        match /{document=**} {                                ║"
echo "║          allow read, write: if true;                         ║"
echo "║        }                                                      ║"
echo "║      }                                                        ║"
echo "║    }                                                          ║"
echo "║                                                               ║"
echo "║ 3. Click PUBLISH                                             ║"
echo "║                                                               ║"
echo "║ 4. Test: http://localhost:3000/test                          ║"
echo "║                                                               ║"
echo "╚════════════════════════════════════════════════════════════════╝"
