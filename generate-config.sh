#!/bin/sh

# Define the location of the Nginx configuration file
NGINX_CONF="/etc/nginx/conf.d/default.conf"

# Use environment variables to generate the Nginx configuration
cat <<EOF > $NGINX_CONF
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }
    
    # Optional: Add additional configurations if needed
    # location /api {
    #     proxy_pass http://backend-service:port;
    # }
}
EOF

# Start Nginx
exec nginx -g "daemon off;"