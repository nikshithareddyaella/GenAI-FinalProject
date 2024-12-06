FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.6-jdk-slim
COPY --from=build /target/rest1-0.0.1-SNAPSHOT.jar rest1.jar
EXPOSE 3000
ENTRYPOINT ["java", "-jar","rest1.jar"]