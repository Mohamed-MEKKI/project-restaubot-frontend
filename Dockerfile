FROM Next.json

COPY package*.json /app/

RUN npm install

COPY .  /app 

RUN npm run build