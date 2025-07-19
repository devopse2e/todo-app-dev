# Multi-stage build for Node.js backend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install ALL dependencies (including devDeps for build tools like Babel)
COPY package*.json ./
RUN npm ci  

# Copy source code and build (transpile with Babel)
COPY . .
#RUN npm run build 

#  (lean runtime image)
FROM node:18-alpine
# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

WORKDIR /app
# Copy package files and install ONLY production dependencies (strips devDeps for lean image)
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force  # Kept --only=production here for runtime optimization

# Copy built application (dist/ folder only) from builder, with ownership change
# Note: We don't copy builder's node_modules to avoid including devDeps
COPY --from=builder --chown=nodejs:nodejs /app .
# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3001

# Health check (pings /health endpoint)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Run the transpiled server
CMD ["node", "server.js"]
