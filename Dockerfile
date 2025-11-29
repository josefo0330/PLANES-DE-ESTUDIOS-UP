FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production
RUN apk add --no-cache bash
COPY . .

EXPOSE 3000

CMD ["node", "src"]