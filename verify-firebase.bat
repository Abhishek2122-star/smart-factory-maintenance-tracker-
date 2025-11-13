@echo off
REM Firebase Setup Verification Script for Windows

echo.
echo ========================================
echo  FIREBASE SETUP VERIFICATION
echo ========================================
echo.

echo Checking Firebase package...
findstr /M "\"firebase\"" package.json >nul
if %ERRORLEVEL% EQU 0 (
    echo   [OK] Firebase package found
) else (
    echo   [ERROR] Firebase package NOT found
    echo   Run: npm install firebase
)

echo.
echo Checking Firebase Config file...
if exist "src\Firebase\firebaseConfig.js" (
    echo   [OK] Firebase config file exists
    findstr /M "apiKey" src\Firebase\firebaseConfig.js >nul
    if %ERRORLEVEL% EQU 0 echo   [OK] API Key configured
    findstr /M "projectId" src\Firebase\firebaseConfig.js >nul
    if %ERRORLEVEL% EQU 0 echo   [OK] Project ID configured
) else (
    echo   [ERROR] Firebase config file NOT found
)

echo.
echo Checking Firestore Integration...
findstr /M "firebase/firestore" src\pages\Dashboard.js >nul
if %ERRORLEVEL% EQU 0 echo   [OK] Dashboard.js uses Firestore

findstr /M "firebase/firestore" src\pages\AddMaintenance.js >nul
if %ERRORLEVEL% EQU 0 echo   [OK] AddMaintenance.js uses Firestore

findstr /M "firebase/firestore" src\pages\Reports.js >nul
if %ERRORLEVEL% EQU 0 echo   [OK] Reports.js uses Firestore

echo.
echo ========================================
echo.
echo IMPORTANT: NEXT STEPS
echo ========================================
echo.
echo 1. Go to Firebase Console:
echo    https://console.firebase.google.com
echo.
echo 2. Select project: smart-factory-tracker-832a5
echo.
echo 3. Click: Firestore Database ^> Rules
echo.
echo 4. Replace ALL code with:
echo.
echo rules_version = '2'^;
echo service cloud.firestore {
echo   match /databases/{database}/documents {
echo     match /{document=**} {
echo       allow read, write: if true^;
echo     }
echo   }
echo }
echo.
echo 5. Click PUBLISH button
echo.
echo 6. Test at: http://localhost:3000/test
echo.
echo ========================================
pause
