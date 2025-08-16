# Authentication back-end 
## 1. Initialize Spring Project
* Generate a new spring project https://start.spring.io/
  * Project: Gradle-Groovy
  * Language: Java
  * Spring Boot: 3.4.3
  * Group: com.example
  * Artifact: authentication
  * Name: authentication
  * Description: Spring Boot project
  * Package name: com.example.authentication
  * Packaging: Jar
  * Java: 17
  * Dependencies:
    * Spring Web
    * Spring Security
    * Spring Data JPA
    * MySQL Driver
  
## 2. Create MySQL Database
* execute the included authentication.sql script to set up tables

## 3. Set up Project Configuration
* add your database information to src/main/java/application.properties
```
spring.application.name=authentication
spring.datasource.url=jdbc:mysql://localhost:3306/authentication
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.properties.hibernate.type.preferred_uuid_jdbc_type=CHAR
```


