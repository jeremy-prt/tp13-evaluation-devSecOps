FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --retries=3 --start-period=10s \
  CMD wget -qO- http://localhost:3000/healthz || exit 1

CMD ["node", "app.js"]
