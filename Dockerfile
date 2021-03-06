FROM node:12-alpine

RUN npm install http-server-spa -g

COPY docker-start.sh /entrypoint.sh
COPY build /var/www

EXPOSE 8080

CMD ["ash", "entrypoint.sh"]

