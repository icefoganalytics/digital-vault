FROM node:20.18.0-alpine3.19

# Install Java (OpenJDK)
RUN apk add --no-cache openjdk11

# Set JAVA_HOME environment variable
ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk"
ENV PATH="$JAVA_HOME/bin:$PATH"

# Install iText SDK (you'll need to have the iText JAR file or download it)
# Here, I’m assuming you have the JAR file available locally or at a specific URL

# COPY or ADD the iText JAR file
# For example, if it's local:
COPY path/to/itextpdf-7.x.x.jar /app/libs/

# If it's from a URL, you can use wget or curl
# RUN wget -O /app/libs/itextpdf-7.x.x.jar http://example.com/itextpdf-7.x.x.jar

RUN npm install -g npm@10.9.0

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./bin/boot-app.sh

CMD ["/usr/src/api/bin/boot-app.sh"]
