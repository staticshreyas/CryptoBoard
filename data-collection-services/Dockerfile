# Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY data-collection-services/package.json ./
RUN npm install

COPY data-collection-services/ ./
COPY shared-models/ ./shared-models/
COPY config/ ./config/

EXPOSE 5002

CMD ["npm", "start"]
