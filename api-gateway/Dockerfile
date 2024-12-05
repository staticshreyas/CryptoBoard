# Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY api-gateway/package.json ./
RUN npm install

COPY api-gateway/ ./
COPY shared-models/ ./shared-models/
COPY config/ ./config/

EXPOSE 3000

CMD ["npm", "start"]
