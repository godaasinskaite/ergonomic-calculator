# # Stage 1: Build the Angular application
# FROM node:18 AS build

# WORKDIR /app

# COPY package*.json ./
# RUN npm install
# RUN npm install -g @angular/cli
# # RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

# COPY . .

# RUN ng build --configuration production
# FROM nginx:alpine
# COPY --from=build /app/dist/ergonomic-calculator/browser /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]

