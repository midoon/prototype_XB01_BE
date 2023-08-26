FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npx tsc

EXPOSE 8080

CMD ["npm","start"]