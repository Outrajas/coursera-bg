@echo off
chcp 65001 >nul
title Coursera Background Player Installer
color 0A
setlocal

:: --- CONFIGURATION ---
set "SCRIPT_URL=https://github.com/Outrajas/coursera-bg/raw/main/CourseraKeepActive.user.js"
set "SCRIPT_FILENAME=CourseraKeepActive.user.js"
set "TEMP_SCRIPT=%TEMP%\%SCRIPT_FILENAME%"
:: --------------------

:: Introduction
cls
echo ============================================
echo   COURSERA BACKGROUND PLAYER INSTALLER
echo ============================================
echo.
echo This will install a Tampermonkey userscript to keep
echo Coursera videos playing when you switch tabs.
echo.
echo IMPORTANT: Before we start, please ensure:
echo   1. Tampermonkey is installed in your browser.
echo   2. You have enabled "Allow access to file URLs"
echo      in Chrome's extension settings for Tampermonkey.
echo.
echo Press any key to continue...
pause >nul

:: Step 1: Download the Script
cls
echo ============================================
echo   STEP 1: Downloading the script
echo ============================================
echo.
echo Downloading script from GitHub...
echo.

:: Use PowerShell to download the file
powershell -NoProfile -Command "Invoke-WebRequest -Uri '%SCRIPT_URL%' -OutFile '%TEMP_SCRIPT%'"

if not exist "%TEMP_SCRIPT%" (
    echo.
    echo ERROR: Failed to download the script.
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo Download successful. The script is saved to:
echo %TEMP_SCRIPT%
echo.
echo Press any key to open the script for installation...
pause >nul

:: Step 2: Open the downloaded script
:: Opening the local file should trigger Tampermonkey's install prompt.
start "" "%TEMP_SCRIPT%"

echo.
echo ============================================
echo   STEP 2: Install the script
echo ============================================
echo.
echo The script should now be opening in your browser.
echo Tampermonkey should prompt you to install it.
echo Click "Install" to continue.
echo.
echo If nothing happens, you can manually open the file
echo from this location: %TEMP_SCRIPT%
echo.
echo After installation, press any key to exit.
pause >nul

:: Cleanup (optional)
del "%TEMP_SCRIPT%" >nul 2>&1
exit /b 0