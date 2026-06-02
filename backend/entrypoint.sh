#!/bin/sh
# entrypoint.sh — runs at container startup (not build time)
# This ensures the SQLite DB is always up-to-date with the latest schema
# before the server starts. It is safe to run on every container restart.

set -e

echo ">>> Running Prisma migrations..."
npx prisma migrate deploy

echo ">>> Starting SRFC backend server..."
exec node server.js
