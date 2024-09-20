FROM node:20
WORKDIR /lambda
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8000
CMD [ "node", "./build/server.js" ]