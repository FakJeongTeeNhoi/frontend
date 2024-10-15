FROM node:21-alpine

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm install --only=dev && npm run build

EXPOSE 3000

CMD ["npm", "start"]