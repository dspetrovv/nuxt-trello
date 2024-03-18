FROM node:18
WORKDIR /application
COPY . /
EXPOSE 3000
RUN npm install