# Set the base image to Ubuntu
FROM node:current

# Install nodemon
RUN npm install -g nodemon

# Define working directory
WORKDIR /app

COPY src /app/src/

COPY package.json package-lock.json /app/

RUN npm install

# Run app using nodemon
CMD npm run dev