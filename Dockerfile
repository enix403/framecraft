FROM nginx:1.27.4-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf /usr/share/nginx/html/*

COPY dist/ .

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
