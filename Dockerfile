# ─── Stage 1: Build the React frontend ───────────────────────────────────────
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend

# Install deps first (layer-cached unless package.json changes)
COPY frontend/package*.json ./
RUN npm install

# Copy source and build
COPY frontend/ .
RUN npm run build

# ─── Stage 2: Production backend ─────────────────────────────────────────────
FROM node:22-alpine
WORKDIR /app/backend

# Add OpenSSL for Prisma
RUN apk add --no-cache openssl

# Install backend production dependencies
COPY backend/package*.json ./
RUN npm install --omit=dev

# Copy backend source (entrypoint.sh, server.js, data/, prisma/, etc.)
COPY backend/ .

# Generate Prisma Client (schema must be present at this point)
RUN npx prisma generate

# Copy the built frontend from Stage 1 into the location the server expects
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Make the entrypoint script executable and fix Windows CRLF line endings
RUN sed -i 's/\r$//' /app/backend/entrypoint.sh
RUN chmod +x /app/backend/entrypoint.sh

# Expose the application port
EXPOSE 5000

# Use entrypoint.sh so Prisma migrate runs at startup against the live volume
CMD ["sh", "/app/backend/entrypoint.sh"]
