FROM node:6.10.3

RUN useradd --user-group --create-home --shel /bin/false app &&\
  npm install --global npm@3.10.10

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json & $HOME/chatroom/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/chatroom
RUN npm cache clean && npm install --silent --progress=false

USER root
COPY . $HOME/chatroom
RUN chown -R app:app $HOME/*
USER app

CMD ["npm", "start"]
