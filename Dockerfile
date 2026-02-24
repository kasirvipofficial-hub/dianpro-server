FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# RTMP Port
EXPOSE 1935
# HTTP Admin/API Port
EXPOSE 8000

CMD ["node", "server.js"]
