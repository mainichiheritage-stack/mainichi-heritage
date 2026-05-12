FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install wrangler globally for Cloudflare deployment
RUN npm install -g wrangler

COPY . .

CMD ["npm","run","dev"]