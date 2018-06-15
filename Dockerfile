FROM node:8.4.0
# Create app directory
RUN mkdir /app
ADD . /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --quiet
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]