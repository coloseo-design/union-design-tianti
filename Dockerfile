FROM test.mesos/library/nginx:stable

COPY site/dist /usr/share/nginx/html/union-design

#COPY dist /usr/share/nginx/html/mip-ui
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
