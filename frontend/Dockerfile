# Etapa de build
FROM node:20 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa de producción
FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
