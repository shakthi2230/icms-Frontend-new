FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Cloud Run sets $PORT automatically, so we use it
ENV PORT=8080
EXPOSE 8080

# React dev server must listen on 0.0.0.0 and use $PORT
CMD ["sh", "-c", "npm run dev -- --port $PORT --host 0.0.0.0"]
