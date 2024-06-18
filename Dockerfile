FROM --platform=linux/amd64 openjdk:22
EXPOSE 8080
ADD backend/target/cinetiq.jar cinetiq.jar
ENTRYPOINT ["java", "-jar", "cinetiq.jar"]