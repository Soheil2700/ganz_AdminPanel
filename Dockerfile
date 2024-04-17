FROM node:21-alpine
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]
