FROM nginx:1.17.1-alpine
# Hi
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/ang-eshop /usr/share/nginx/html
