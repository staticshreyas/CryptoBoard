# Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY data-processing-service/package.json ./
RUN npm install

COPY data-processing-service/ ./
COPY shared-models/ ./shared-models/
COPY config/ ./config/

EXPOSE 5001

CMD ["npm", "start"]
