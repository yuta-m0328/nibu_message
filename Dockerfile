FROM nginx:alpine

ENV PORT=8080
EXPOSE 8080
USER root

COPY ./ /usr/share/nginx/html

CMD sed -i 's/listen\s*80;/listen '"$PORT"';/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'