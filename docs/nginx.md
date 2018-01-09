# nginx

## Development Setup

1. Install nginx
2. Edit **nginx.conf** and set the correct paths under TODO comments
3. Copy **app.local.conf** from **servers-available** folder in **servers-enabled**
4. Edit **servers-enabled/app.local.conf**  and set the correct values under TODO comments
5. Setup local SSL:
   1. Navigate to **nginx/certs** folder
      ```bash
      cd nginx
      ```
   2. Generate the key necessary for the self-signed certificate
      ```bash
      openssl genrsa -out app.local.key 2048
      ```
   3. Generate self-signed certificate (It works with Chrome > 58 also)
      ```bash
      openssl req -key app.local.key -x509 -nodes -new -out app.local.crt -subj "/CN=app.local" -reqexts SAN -extensions SAN -config <(cat /etc/ssl/openssl.cnf <(printf '[SAN]\nsubjectAltName=DNS:app.local')) -sha256 -days 3650
      ```
   4. (Optional) If you are running macOS, add the certificate to keychain
      ```bash
      sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain app.local.crt
      ```
5. Start:
   ```bash
   sudo nginx -c /absolute/path/to/project/nginx.conf
   ```
   
## Production Setup

1. Copy **nginx/nginx.conf** and **nginx/mime.types** files to your nginx config folder
2. Copy **nginx/rules** to your nginx config folder
3. Replace the values marked with TODO in **/path/to/copied/nginx.conf**
4. Create the following folders:
   * **/path/to/nginx/config/folder/servers-available**
   * **/path/to/nginx/config/folder/servers-enabled**
5. Copy **nginx/servers-available/app.prod.conf** to **/path/to/nginx/config/folder/servers-available**
6. Replace the values marked with TODO in **/path/to/nginx/config/folder/servers-available/app.prod.conf**
7. Copy **/path/to/nginx/config/folder/servers-available/app.prod.conf** in **/path/to/nginx/config/folder/servers-enabled/app.prod.conf**
