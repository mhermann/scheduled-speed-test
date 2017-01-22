FROM node:latest

RUN mkdir /scheduled-speed-test

RUN git clone https://github.com/mhermann/scheduled-speed-test.git /scheduled-speed-test

WORKDIR /scheduled-speed-test

RUN npm install

WORKDIR /scheduled-speed-test

RUN mkdir /outputdata

CMD node index.js