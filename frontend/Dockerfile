FROM node:18-alpine

WORKDIR /app

COPY frontend/package.json ./
RUN npm install

COPY frontend/ ./
COPY config/ ./config/

EXPOSE 3001

CMD ["npm", "start"]
