#!/usr/bin/env bash
# Sunya (शून्य) - Autonomous Local Outreach & Lead Generation Desktop Launcher
# Location: /home/basant/sunya-visiblity/sunya.sh

APP_DIR="/home/basant/sunya-visiblity"
APP_PORT=3005
APP_URL="http://localhost:${APP_PORT}/sunya"

cd "$APP_DIR" || exit 1

# Check if port 3005 is already responding
if ! curl -s -o /dev/null -w "%{http_code}" "http://localhost:${APP_PORT}/api/leads/discover" | grep -q "200\|405"; then
  echo "⚡ [Sunya] Starting local backend on port ${APP_PORT}..."
  pnpm dev > /dev/null 2>&1 &
  
  # Wait up to 15 seconds for Next.js to be ready
  for i in {1..15}; do
    if curl -s "http://localhost:${APP_PORT}/sunya" > /dev/null 2>&1; then
      echo "✅ [Sunya] Backend is live!"
      break
    fi
    sleep 1
  done
else
  echo "✅ [Sunya] Backend is already running on port ${APP_PORT}."
fi

# Launch in dedicated app window using Brave
if command -v brave > /dev/null 2>&1; then
  echo "🚀 [Sunya] Launching desktop app view in Brave..."
  brave --app="${APP_URL}" > /dev/null 2>&1 &
elif command -v xdg-open > /dev/null 2>&1; then
  echo "🚀 [Sunya] Launching default browser..."
  xdg-open "${APP_URL}" > /dev/null 2>&1 &
else
  echo "Open in your browser: ${APP_URL}"
fi
