
# -------- Stage 1: Build --------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# -------- Stage 2: Serve --------
FROM nginx:1.25-alpine

# Copiar build
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar template correctamente
COPY config.template.js /usr/share/nginx/html/config.template.js


EXPOSE 80

CMD ["/bin/sh", "-c", "envsubst '$VITE_API_URL' < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js && nginx -g 'daemon off;'"]