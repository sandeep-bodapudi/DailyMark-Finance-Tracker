# DailyMark — Personal Finance Tracker

A lightweight offline-first PWA to log and track daily expenses — no backend needed.

## Features
- Log daily expenses by category
- Works fully offline using IndexedDB
- Installable as a PWA on mobile and desktop
- Data stored locally on your device — private by design
- Visual spending summaries

## Tech Stack
**Frontend:** Vanilla JavaScript, HTML5, CSS3  
**Storage:** IndexedDB (browser-native)  
**Type:** Progressive Web App (PWA)

## Why No Backend?
The goal was a frictionless tool that works anywhere, anytime — no login, no server, no data leaving your device. IndexedDB handles persistence even when offline.

## PWA Setup
- Service worker caches all assets for offline use
- Web app manifest enables install-to-homescreen
- Works on Android, iOS, and desktop Chrome

> I built this for personal use and still use it daily.
