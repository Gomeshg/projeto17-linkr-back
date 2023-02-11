FROM node:18

WORKDIR /app

COPY . ./

RUN npm i

EXPOSE 4000

CMD [ "npm", "run", "dev" ]