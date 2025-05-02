# 1. Use Playwright base image with all dependencies and ARM64 support
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies (Node modules + Playwright browsers)
RUN npm ci \
  && npx playwright install --with-deps

# 5. Copy project files
COPY . .

# 6. Set environment variable for CI
ENV CI=true

# 7. Run tests and then generate report
CMD npm run cucumberWithTs && npm run generate-report