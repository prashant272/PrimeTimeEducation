# Use official Node.js 20 LTS Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set default environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Copy dependency definitions first for Docker layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the rest of the application files
COPY . .

# Ensure uploads directory exists and set ownership to non-root node user
RUN mkdir -p uploads && chown -R node:node /app

# Switch to non-root user
USER node

# Expose server port
EXPOSE 5000

# Start command
CMD ["npm", "start"]
