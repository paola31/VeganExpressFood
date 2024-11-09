# Usamos una imagen de Node.js como base
FROM node:14

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Copiamos los archivos package.json y package-lock.json
COPY app/package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código de la aplicación
COPY app .

# Exponemos el puerto 3000
EXPOSE 3000

# Instalamos dependencias y ejecutamos el servidor en un solo comando
CMD npm install && npm start
