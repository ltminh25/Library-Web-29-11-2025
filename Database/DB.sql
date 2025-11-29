CREATE DATABASE  IF NOT EXISTS `library` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `library`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: library
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `birth_date` datetime(6) DEFAULT NULL,
  `biography` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKgrm3merlhi91rac0mu26swyhf` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (2,'1818-05-05 00:00:00.000000','Nhà triết học (Karl Heinrich Marx), nhà tư tưởng xã hội(Friedrich Engels), lãnh tụ cách mạng Nga (Lenin)',NULL,'Karl Heinrich Marx, Friedrich Engels, và Vladimir Ilyich Ulyanov','Moor - Karl Heinrich Marx, The General - Friedrich Engels, Lenin - Vladimir Ilyich Ulyanov'),(3,'1856-05-06 00:00:00.000000','Freud là bác sĩ thần kinh người Áo, người sáng lập ngành phân tâm học (psychoanalysis)',NULL,'Sigismund Schlomo Freud',NULL),(4,'1955-05-07 00:00:00.000000','Nguyễn Nhật Ánh sinh ngày 7 tháng 5 năm 1955 tại tỉnh Quảng Nam.  Ông được coi là một trong những nhà văn thành công nhất viết sách cho tuổi thơ, tuổi mới lớn với hơn 100 tác phẩm các thể loại.','NguyenNhatAnh@gmail.com','Nguyễn Nhật Ánh','Nguyễn Nhật Ánh'),(5,'1974-04-08 00:00:00.000000','Adam Khoo Yean Ann (sinh ngày 8 tháng 4 năm 1974 tại Singapore) là một doanh nhân, tác giả nổi tiếng, và chuyên gia đào tạo hàng đầu Châu Á.','thoon@labyrinthap.com','Adam Khoo','Adam Khoo'),(6,'1890-05-19 00:00:00.000000','Hồ Chí Minh (1890-1969) là một nhà cách mạng và chính khách Việt Nam, tên khai sinh là Nguyễn Sinh Cung. Ông là người sáng lập Đảng Cộng sản Việt Nam',NULL,'Nguyễn Sinh Cung','Hồ Chí Minh, Nguyễn Ái Quốc, Nguyễn Tất Thành'),(7,'1982-01-23 00:00:00.000000','Cal Newport là tác giả, giáo sư khoa học máy tính tại Đại học Georgetown, nổi tiếng với các sách về năng suất và làm việc sâu.',NULL,'Cal Newport',NULL),(8,'1564-04-26 00:00:00.000000','William Shakespeare là nhà viết kịch, nhà thơ và diễn viên người Anh, được xem là nhà văn vĩ đại nhất trong nền văn học Anh.',NULL,'William Shakespeare','Bard of Avon'),(9,'1947-08-24 00:00:00.000000','Paulo Coelho là tiểu thuyết gia người Brazil, nổi tiếng với các tác phẩm mang tính triết lý và truyền cảm hứng như \"Nhà giả kim\"\".\"',NULL,'Paulo Coelho',NULL);
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `author_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `publish_year` int DEFAULT NULL,
  `publisher_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `status` enum('AVAILABLE','UNAVAILABLE') DEFAULT NULL,
  `cover_photo_url` varchar(255) DEFAULT NULL,
  `pdf_url` varchar(255) DEFAULT NULL,
  `average_rating` decimal(2,1) DEFAULT '0.0',
  `rating_count` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FKklnrv3weler2ftkweewlky958` (`author_id`),
  KEY `FKam9riv8y6rjwkua1gapdfew4j` (`category_id`),
  KEY `FKgtvt7p649s4x80y6f4842pnfq` (`publisher_id`),
  CONSTRAINT `FKam9riv8y6rjwkua1gapdfew4j` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKgtvt7p649s4x80y6f4842pnfq` FOREIGN KEY (`publisher_id`) REFERENCES `publisher` (`id`),
  CONSTRAINT `FKklnrv3weler2ftkweewlky958` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (2,7,4,1845,1,22,'Giáo trình Triết học Mác – Lênin','AVAILABLE','https://drive.google.com/file/d/1x6g7cSOdHR_2af9Eru5Zx6R1ka47KVsA/view?usp=drive_link','https://drive.google.com/file/d/1jnR2MTKG0YriLt-N9rMm-onPjw8UK4au/view?usp=drive_link',4.0,1),(2,7,5,1867,1,34,'Giáo trình Kinh tế chính trị Mác – Lênin','AVAILABLE','https://drive.google.com/file/d/1KUdHtPfpDekgwySHONXtWkv6A38CoFHb/view?usp=drive_link','https://drive.google.com/file/d/1etCuUcdlK9mjtLf_YGDsdG76gk4ZmZ2m/view?usp=drive_link',3.0,1),(2,7,6,1848,1,41,'Giáo trình Chủ nghĩa xã hội khoa học','AVAILABLE','https://drive.google.com/file/d/1MaEDfZHywjgDM5MqipkL8Nw4MGRneD8Z/view?usp=drive_link','https://drive.google.com/file/d/1lnxPm_VqbC8DJYGo8YQaNxdYNcE92quF/view?usp=drive_link',3.0,1),(3,3,7,1900,1,38,'The Interpretation of Dreams','AVAILABLE','https://drive.google.com/file/d/1bNDHhIwFMWXeP6dU5DAYEICPPF7gWpBn/view?usp=drive_link','https://drive.google.com/file/d/11lSFu2UjDDujds57q7w2yPZ5yG0Umovt/view?usp=drive_link',0.0,0),(3,3,8,1901,1,19,'The Psychopathology of Everyday Life','AVAILABLE','https://drive.google.com/file/d/1IkBiyvxvfM_hh2AuUW00Oh7csfHw0ekA/view?usp=drive_link','https://drive.google.com/file/d/1zegRzjwcnF6eXg1eGDjGd_wi6up9oQUS/view?usp=drive_link',4.0,1),(3,3,9,1923,1,55,'The Ego and the Id','AVAILABLE','https://drive.google.com/file/d/1cdUh0HpM8iTU2W4jGlrWs8BBa0UCxFbT/view?usp=drive_link','https://drive.google.com/file/d/1n7KBKU_iFjiqoE9kqRJZfY58Zz7_OQMh/view?usp=drive_link',4.0,1),(4,1,10,2008,1,12,'Cho tôi xin một vé đi tuổi thơ','AVAILABLE','https://drive.google.com/file/d/1HRGTIryc56lWQtsPql86xa7QrNkNBwrg/view?usp=drive_link','https://drive.google.com/file/d/1Hp26td_pOg1Mlox99S2qRbpjWZfbQQE9/view?usp=drive_link',4.0,1),(4,1,11,2010,1,20,'Tôi thấy hoa vàng trên cỏ xanh','AVAILABLE','https://drive.google.com/file/d/1VsGmyHjSqxVu4wrk2NJyWVgEFlNwx_fb/view?usp=drive_link','https://drive.google.com/file/d/1UGuvQ23E793Q9-174eOBZoWbEGxtmekP/view?usp=drive_link',0.0,0),(4,1,12,1990,1,18,'Mắt biếc','AVAILABLE','https://drive.google.com/file/d/1J_nlBKf4UcbH4h3tBWP2pVUcIFmdkruI/view?usp=drive_link','https://drive.google.com/file/d/1RsGy-Scpa4dzWi-GrAnzA5lJ0N3gOz4v/view?usp=drive_link',0.0,0),(5,2,13,1998,1,35,'Tôi tài giỏi, bạn cũng thế!','AVAILABLE','https://drive.google.com/file/d/1sfZ_iPt2h_x4kmHFmJCYG8ZdJH8pof5Z/view?usp=drive_link','https://drive.google.com/file/d/1PYhfSSpZARj9Uh2H81-UCqq3jHHbO4rC/view?usp=drive_link',0.0,0),(5,10,14,2008,1,14,'Bí quyết xây dựng cơ nghiệp bạc tỷ','AVAILABLE','https://drive.google.com/file/d/1bmHnwc2DFbbU1XvwKNlVKAccJntaaIAZ/view?usp=drive_link','https://drive.google.com/file/d/1HPysBjgjii4ZjAAw_1HKrMAa7fuEa-FG/view?usp=drive_link',3.0,2),(5,2,15,2004,1,28,'Làm chủ tư duy thay đổi vận mệnh','AVAILABLE','https://drive.google.com/file/d/1-NEBgEzk0uhVlaEURQI0nGpUzRi7KrVJ/view?usp=drive_link','https://drive.google.com/file/d/1epzg3ImLqcy2uPTdUHRM6VmxwNVvXKJf/view?usp=drive_link',0.0,0),(6,5,16,1942,1,22,'Lịch sử nước ta','AVAILABLE','https://drive.google.com/file/d/1upWwKNZq51OTBhAXeeL0iPJRLdv-FyG_/view?usp=drive_link','https://drive.google.com/file/d/1Vt3CoVypZgaSSuQtzxbZJ4JH7-f3y_Ot/view?usp=drive_link',0.0,0),(6,5,17,1943,1,15,'Nhật kí trong tù','AVAILABLE','https://drive.google.com/file/d/1zeLUpD1AWxj6Hnj4KEBFBTHBb2RBFhUN/view?usp=drive_link','https://drive.google.com/file/d/1L7fqKgG2fR-wo97tkeD_Tb0vqrSfczPD/view?usp=drive_link',0.0,0),(6,5,18,1946,1,21,'Bản án chế độ thực dân Pháp','AVAILABLE','https://drive.google.com/file/d/1M5esJGaa7VUMSXf30op5LZ8haCgQEXOH/view?usp=drive_link','https://drive.google.com/file/d/1HcEL5eh56Jsf8G7fh-8Vjpiz3LGgjNG5/view?usp=drive_link',3.5,2),(7,6,19,2012,1,12,'Kỹ năng đi trước đam mê','AVAILABLE','https://drive.google.com/file/d/1y10c8QD6pBwlWV2qGTlSQJ5yOZFKx7mt/view?usp=drive_link','https://drive.google.com/file/d/1XlVlc4nNr6c3O8lURaX7mI-7e5RjvFLz/view?usp=drive_link',5.0,1),(7,6,20,2019,1,69,'Lối sống tối giản thời công nghệ số','AVAILABLE','https://drive.google.com/file/d/1f9RzZmdGA-PjXF90KtDJ8sir9CN8FJ4W/view?usp=drive_link','https://drive.google.com/file/d/17KD6tr0IUw9uWqQLq9NC3D19qUJvloby/view?usp=drive_link',0.0,0),(7,3,21,2016,1,36,'Làm ra làm chơi ra chơi','AVAILABLE','https://drive.google.com/file/d/1t4-MqfumPNUJmL4pSDIsaJGxhjPzHJ58/view?usp=drive_link','https://drive.google.com/file/d/1hsBfU_1f8a-HpEWPNU29tX9dlkmtl42c/view?usp=drive_link',0.0,0),(8,10,22,1597,1,30,'Romeo và Juliet','AVAILABLE','https://drive.google.com/file/d/1sLOokxdTQDdfnyCeOadg2gUxE4Bg5Hgz/view?usp=drive_link','https://drive.google.com/file/d/1bPbRdhCC33Mi4O3186Ew8Ya0SgoOnlCR/view?usp=drive_link',0.0,0),(8,10,23,1600,1,24,'HamLet – Hoàng Tử Đan Mạch','AVAILABLE','https://drive.google.com/file/d/1_j72dioypOvmJKT_axU5qd4Si89LouQo/view?usp=drive_link','https://drive.google.com/file/d/1wnTfbA8sRwi0VCbTqiZuG3gAI7uTRIik/view?usp=drive_link',5.0,1),(8,10,24,1610,1,10,'Cơn bão','AVAILABLE','https://drive.google.com/file/d/1E3O_8stDmL19hopCxDtE7xfpi-sLIgbr/view?usp=drive_link','https://drive.google.com/file/d/1Zl1KMN2a2EyMctgv9k-h45fBC0it0yeY/view?usp=drive_link',3.0,1),(9,1,25,1988,1,40,'Nhà giả kim','AVAILABLE','https://drive.google.com/file/d/1kivPuNy_LpyLB-kM9lW9jovGiYrVxWuI/view?usp=drive_link','https://drive.google.com/file/d/15WtFqkx3EsI7TXcwxZB-uQj5_GOpQyRC/view?usp=drive_link',0.0,0),(9,10,26,1998,1,15,'Veronica quyết chết','AVAILABLE','https://drive.google.com/file/d/10LiWyadBpHIIdeLorfRvwOfjNfFdK_17/view?usp=drive_link','https://drive.google.com/file/d/1rlX1liDAa4d_OjtWrBFhbZVdAIdVyO7K/view?usp=drive_link',0.0,0),(9,8,27,1997,1,27,'Cẩm Nang Của Người Chiến Binh Ánh Sáng','AVAILABLE','https://drive.google.com/file/d/17hK01WZBqhhGgPEiTDEiZhaV7cBxRgV1/view?usp=drive_link','https://drive.google.com/file/d/1KaLyOlMRyZl_g1X3To9-rbyBjAffUiq2/view?usp=drive_link',4.0,1),(7,4,88,4,1,16,'sda','AVAILABLE','abc','bcd',0.0,0);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow_transaction`
--

DROP TABLE IF EXISTS `borrow_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrow_transaction` (
  `fine_amount` decimal(10,2) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `reader_id` int NOT NULL,
  `staff_id` int NOT NULL,
  `borrow_date` datetime(6) NOT NULL,
  `due_date` datetime(6) NOT NULL,
  `return_date` datetime(6) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `status` enum('BORROWED','LATE','RETURNED') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgfhpgvswnpk7kmbfqlbr64n23` (`reader_id`),
  KEY `FK84ne2g65ra7m02uh925l0v427` (`staff_id`),
  CONSTRAINT `FK84ne2g65ra7m02uh925l0v427` FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKgfhpgvswnpk7kmbfqlbr64n23` FOREIGN KEY (`reader_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_transaction`
--

LOCK TABLES `borrow_transaction` WRITE;
/*!40000 ALTER TABLE `borrow_transaction` DISABLE KEYS */;
INSERT INTO `borrow_transaction` VALUES (0.00,1,6,2,'2025-09-10 10:00:00.000000','2025-09-20 00:00:00.000000','2025-10-01 16:12:47.337434','Đang mượn','RETURNED'),(10000.00,2,7,3,'2025-09-05 11:00:00.000000','2025-09-15 00:00:00.000000','2025-09-16 00:00:00.000000','Trả trễ 1 ngày','RETURNED'),(0.00,3,8,2,'2025-09-01 09:30:00.000000','2025-09-10 00:00:00.000000',NULL,'Đang mượn','LATE'),(15000.00,4,9,3,'2025-08-20 14:00:00.000000','2025-08-30 00:00:00.000000','2025-09-01 00:00:00.000000','Trả trễ 2 ngày','RETURNED'),(0.00,5,10,2,'2025-09-12 10:30:00.000000','2025-09-22 00:00:00.000000',NULL,'Đang mượn','LATE'),(5000.00,6,6,2,'2025-09-01 10:00:00.000000','2025-09-10 00:00:00.000000','2025-09-12 00:00:00.000000','Trả trễ 2 ngày','RETURNED'),(0.00,7,7,3,'2025-09-02 11:00:00.000000','2025-09-12 00:00:00.000000',NULL,'Đang mượn','LATE'),(0.00,8,8,2,'2025-09-03 09:30:00.000000','2025-09-13 00:00:00.000000',NULL,'Đang mượn','LATE'),(10000.00,9,9,3,'2025-09-04 14:00:00.000000','2025-09-14 00:00:00.000000','2025-09-15 00:00:00.000000','Trả trễ 1 ngày','RETURNED'),(0.00,10,10,2,'2025-09-05 10:30:00.000000','2025-09-15 00:00:00.000000',NULL,'Đang mượn','LATE'),(0.00,11,11,3,'2025-09-06 15:00:00.000000','2025-09-16 00:00:00.000000',NULL,'Đang mượn','LATE'),(5000.00,12,12,2,'2025-09-07 09:00:00.000000','2025-09-17 00:00:00.000000','2025-09-18 00:00:00.000000','Trả trễ 1 ngày','RETURNED'),(0.00,13,13,3,'2025-09-08 10:00:00.000000','2025-09-18 00:00:00.000000',NULL,'Đang mượn','LATE'),(0.00,14,14,2,'2025-09-09 09:30:00.000000','2025-09-19 00:00:00.000000',NULL,'Đang mượn','LATE'),(5000.00,15,15,3,'2025-09-10 14:00:00.000000','2025-09-20 00:00:00.000000','2025-09-21 00:00:00.000000','Trả trễ 1 ngày','RETURNED'),(0.00,16,6,2,'2025-09-11 10:00:00.000000','2025-09-21 00:00:00.000000',NULL,'Đang mượn','LATE'),(0.00,17,7,3,'2025-09-12 11:00:00.000000','2025-09-22 00:00:00.000000',NULL,'Đang mượn','LATE'),(10000.00,18,8,2,'2025-09-13 09:30:00.000000','2025-09-23 00:00:00.000000','2025-09-25 00:00:00.000000','Trả trễ 2 ngày','RETURNED'),(0.00,19,9,3,'2025-09-14 14:00:00.000000','2025-09-24 00:00:00.000000',NULL,'Đang mượn','LATE'),(0.00,20,10,2,'2025-09-15 10:30:00.000000','2025-09-25 00:00:00.000000',NULL,'Đang mượn','LATE'),(NULL,21,2,18,'2025-10-01 13:44:54.635808','2025-10-10 07:00:00.000000',NULL,'Mượn 2 cuốn sách','LATE'),(NULL,22,2,18,'2025-10-01 14:01:33.157427','2025-10-10 00:00:00.000000',NULL,'Mượn 2 cuốn sách','LATE'),(NULL,23,5,18,'2025-10-05 13:37:55.948433','2025-10-20 17:00:00.000000','2025-10-05 14:43:42.397269','Ưu tiên xử lý sớm','RETURNED'),(NULL,24,5,18,'2025-10-07 20:23:25.260357','2025-10-20 17:00:00.000000',NULL,'Ưu tiên xử lý sớm','LATE'),(NULL,25,5,18,'2025-10-26 11:56:35.259597','2025-10-20 17:00:00.000000','2025-10-26 12:00:21.504730','Ưu tiên xử lý sớm','RETURNED'),(NULL,26,24,25,'2025-11-02 15:26:42.337767','2025-11-20 04:11:00.000000','2025-11-02 15:30:17.839069','DEP TRAI','RETURNED'),(NULL,27,7,25,'2025-11-02 15:27:20.024176','2025-11-01 04:11:00.000000','2025-11-02 15:30:56.484445','A','RETURNED'),(NULL,28,7,25,'2025-11-02 15:32:50.784617','2025-11-29 04:11:00.000000','2025-11-02 15:35:46.633173','a','RETURNED'),(NULL,29,24,25,'2025-11-06 21:33:46.626612','2025-11-20 04:11:00.000000','2025-11-28 23:18:09.168588','nothing','RETURNED'),(NULL,30,10,25,'2025-11-14 22:36:28.141963','2025-11-21 04:11:00.000000','2025-11-28 23:18:07.684116','ádsa','RETURNED'),(NULL,31,10,25,'2025-11-28 20:37:42.372005','2025-11-11 04:11:00.000000','2025-11-28 23:18:06.414751','dasd','RETURNED'),(NULL,32,24,25,'2025-11-28 20:38:10.008180','2025-11-11 04:11:00.000000','2025-11-28 23:18:04.862330','ko','RETURNED'),(NULL,33,28,25,'2025-11-29 11:25:56.456365','2025-11-11 04:11:00.000000',NULL,'ok','LATE');
/*!40000 ALTER TABLE `borrow_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Văn học – Tiểu thuyết','Câu chuyện hư cấu phản ánh đời sống, cảm xúc và con người.'),(2,'Phát triển bản thân','Giúp hoàn thiện tư duy, kỹ năng và thói quen sống tích cực.'),(3,'Tâm lý học – Hành vi','Giải thích cách con người suy nghĩ, cảm nhận và hành động.'),(4,'Kinh tế – Tài chính','Phân tích quy luật thị trường, tiền tệ và quản lý tài sản.'),(5,'Lịch sử – Chính trị','Ghi lại quá khứ, tư tưởng và vận động của các quốc gia, xã hội.'),(6,'Khoa học – Công nghệ','Giới thiệu khám phá, phát minh và nguyên lý khoa học hiện đại.'),(7,'Triết học – Tư tưởng','Tư duy về ý nghĩa, đạo đức và bản chất của thế giới, con người.'),(8,'Văn hóa – Xã hội','Phản ánh phong tục, lối sống, giá trị và thay đổi xã hội.'),(9,'Giả tưởng – Phiêu lưu','Hướng dẫn kỹ năng làm việc, giao tiếp, lãnh đạo và quản lý.'),(10,'Kỹ năng – Nghề nghiệp','Tạo dựng thế giới tưởng tượng, khám phá và hành trình phiêu lưu.');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `book_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgclyi456gw0lcd6xcfj2l7r6s` (`book_id`),
  KEY `FKpwwmhguqianghvi1wohmtsm8l` (`user_id`),
  CONSTRAINT `FKgclyi456gw0lcd6xcfj2l7r6s` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
  CONSTRAINT `FKpwwmhguqianghvi1wohmtsm8l` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (12,'hay',18,28);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fine`
--

DROP TABLE IF EXISTS `fine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fine` (
  `amount` decimal(38,2) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `transaction_id` int DEFAULT NULL,
  `issued_date` datetime(6) DEFAULT NULL,
  `paid_date` datetime(6) DEFAULT NULL,
  `reason` varchar(255) NOT NULL,
  `paid_status` enum('PAID','UNPAID') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9n08wujjpwtkl7q33lllum4bq` (`transaction_id`),
  CONSTRAINT `FK9n08wujjpwtkl7q33lllum4bq` FOREIGN KEY (`transaction_id`) REFERENCES `borrow_transaction` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fine`
--

LOCK TABLES `fine` WRITE;
/*!40000 ALTER TABLE `fine` DISABLE KEYS */;
INSERT INTO `fine` VALUES (50000.00,12,10,'2025-10-20 10:00:00.000000','2025-11-14 22:37:12.209951','Late return','PAID');
/*!40000 ALTER TABLE `fine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `body` varchar(255) DEFAULT NULL,
  `status` enum('READ','UNREAD') NOT NULL,
  `type` enum('MESSAGE','SYSTEM') NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `recipient_id` int DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  `sent_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqqnsjxlwleyjbxlmm213jaj3f` (`recipient_id`),
  KEY `FK13vcnq3ukas06ho1yrbc5lrb5` (`sender_id`),
  CONSTRAINT `FK13vcnq3ukas06ho1yrbc5lrb5` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKqqnsjxlwleyjbxlmm213jaj3f` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (10,'alo','READ','MESSAGE','xin chào',24,25,'2025-11-27 20:35:23.444176'),(11,'hãy trả sách','READ','MESSAGE','Trả sách',24,25,'2025-11-29 09:56:09.999232'),(12,'tra sach','READ','MESSAGE','tra sach',28,25,'2025-11-29 11:27:05.510445'),(13,'ok','UNREAD','MESSAGE','ok',29,31,'2025-11-29 22:50:25.866551'),(14,'ok','READ','MESSAGE','ok',32,31,'2025-11-29 22:50:30.314939'),(15,'ok','READ','MESSAGE','ok',32,31,'2025-11-29 22:57:39.206524'),(16,'ok','READ','MESSAGE','ok',32,31,'2025-11-29 23:23:21.730321'),(17,'ok','READ','MESSAGE','ok',32,31,'2025-11-30 00:12:31.825510');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `founded_year` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `website` varchar(200) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKh9trv4xhmh6s68vbw9ba6to70` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES (1986,1,'0281234567','tre@nxb.com','https://nxbtre.com','TP.HCM','NXB sách thiếu nhi và văn học','NXB Trẻ'),(1957,2,'0247654322','tonghop@nxb.com','https://nxbtonghop.com','Hà Nội','NXB nhiều thể loại','NXB Tổng hợp Hà Nội'),(1970,3,'0289876544','thegioi@nxb.com','https://nxbthegioi.com','TP.HCM','NXB sách quốc tế','NXB Thế Giới');
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `score` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
  CONSTRAINT `rating_chk_1` CHECK ((`score` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (1,32,9,4,'2025-11-29 15:06:08','2025-11-29 15:06:08'),(2,32,18,4,'2025-11-29 15:06:34','2025-11-29 15:06:34'),(3,32,14,4,'2025-11-29 15:06:37','2025-11-29 15:06:37'),(4,32,8,4,'2025-11-29 15:07:34','2025-11-29 15:07:34'),(5,33,18,3,'2025-11-29 15:39:18','2025-11-29 15:39:18'),(6,33,14,2,'2025-11-29 15:39:23','2025-11-29 15:39:23'),(7,33,27,4,'2025-11-29 15:39:27','2025-11-29 15:39:27'),(8,33,10,4,'2025-11-29 15:39:29','2025-11-29 15:39:29'),(9,33,24,3,'2025-11-29 15:39:32','2025-11-29 15:39:32'),(10,33,6,3,'2025-11-29 15:39:35','2025-11-29 15:39:35'),(11,33,19,5,'2025-11-29 15:39:38','2025-11-29 15:39:38'),(12,33,5,3,'2025-11-29 15:39:44','2025-11-29 15:39:44'),(13,33,4,4,'2025-11-29 15:39:47','2025-11-29 15:39:47'),(14,33,23,5,'2025-11-29 15:39:55','2025-11-29 15:39:55');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_detail`
--

DROP TABLE IF EXISTS `transaction_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_detail` (
  `book_id` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `transaction_id` int DEFAULT NULL,
  `condition_note` varchar(255) DEFAULT NULL,
  `status` enum('BORROWED','LATE','RETURNED','LOST','DAMAGED') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnc4cgaqfdeub51hhogkjyottn` (`book_id`),
  KEY `FKj6ml7babpbbx8rceb1317a6ru` (`transaction_id`),
  CONSTRAINT `FKj6ml7babpbbx8rceb1317a6ru` FOREIGN KEY (`transaction_id`) REFERENCES `borrow_transaction` (`id`),
  CONSTRAINT `FKnc4cgaqfdeub51hhogkjyottn` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_detail`
--

LOCK TABLES `transaction_detail` WRITE;
/*!40000 ALTER TABLE `transaction_detail` DISABLE KEYS */;
INSERT INTO `transaction_detail` VALUES (5,37,29,'ổn','RETURNED'),(23,38,30,'sđasa','RETURNED'),(5,39,31,'oonr','RETURNED'),(8,40,32,'adsa','RETURNED'),(23,41,32,'dasds','RETURNED'),(23,42,32,'dasdsa','RETURNED'),(7,43,33,'ok','LATE');
/*!40000 ALTER TABLE `transaction_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','READER','STAFF') DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKk8d0f2n7n88w1a16yhua64onx` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'0901111111','admin1@library.com','admin1','admin@123','Hà Nội','Nguyễn Văn An','ADMIN','ACTIVE'),(2,'0902222222','staff1@library.com','staff1','staff@123','Hà Nội','Trần Thị Bích','STAFF','ACTIVE'),(3,'0903333333','staff2@library.com','staff2','staff@123','Đà Nẵng','Lê Minh Cường','STAFF','ACTIVE'),(4,'0904444444','staff3@library.com','staff3','staff@123','TP.HCM','Phạm Thị Dung','STAFF','ACTIVE'),(5,'0905555555','admin2@library.com','admin2','admin@123','Hải Phòng','Hoàng Văn Bình','ADMIN','ACTIVE'),(6,'0911111111','reader1@gmail.com','reader1','reader@123','Hà Nội','Nguyễn Thị Lan','READER','INACTIVE'),(7,'0912222222','reader2@gmail.com','reader2','reader@123','Đà Nẵng','Lê Thị Hoa','READER','ACTIVE'),(8,'0913333333','reader3@gmail.com','reader3','reader@123','TP.HCM','Trần Văn Hưng','READER','ACTIVE'),(9,'0914444444','reader4@gmail.com','reader4','reader@123','Hải Phòng','Phạm Thị Mai','READER','ACTIVE'),(10,'0915555555','reader5@gmail.com','reader5','reader@123','Huế','Đỗ Văn Quang','READER','ACTIVE'),(11,'0916666666','reader6@gmail.com','reader6','reader@123','Cần Thơ','Ngô Thị Hạnh','READER','ACTIVE'),(12,'0917777777','reader7@gmail.com','reader7','reader@123','Quảng Ninh','Bùi Văn Sơn','READER','ACTIVE'),(13,'0918888888','reader8@gmail.com','reader8','reader@123','Nghệ An','Võ Thị Thanh','READER','ACTIVE'),(14,'0919999999','reader9@gmail.com','reader9','reader@123','Bình Dương','Phan Văn Long','READER','ACTIVE'),(15,'0921111111','reader10@gmail.com','reader10','reader@123','Hà Nội','Lý Thị Nhung','READER','ACTIVE'),(16,'0997788665','trungduc@abc','trungduc','trungduc123','Hà Nội','Phan Trung Đức','ADMIN','ACTIVE'),(17,'0997738665','trungduc@abchhi','trungduc2','$2a$10$ddiiDMZlVsZBTYcsC5O9zeEtOVHPXIdtbzAC8AcFQo/AdaCljiw2y','Hà Nội','Phan Trung Đức','ADMIN','ACTIVE'),(18,'0901234567','ducphanhihi@example.com','ducphan99','$2a$10$DCJUpbyDy2aVzakypZa8R.Zkjz53DpP6ylAZX6OIIey7hNXKJ6XA6','Hồ Chí Minh','Phan Đức','ADMIN','ACTIVE'),(19,'0987654321','duy@example.com','duynguyenabc','$2a$10$UfJt4Y/sry221z/1qgKENeeQ3WtG.8U.pQnP6EKrnlEKho4ydr/YK','123 Tran Hung Dao, Q1, TP.HCM','Nguyen Duc Duy','READER','ACTIVE'),(20,'0912345678','admin@example.com','adminuser','$2a$10$ZM2l3AGSQtO2egwjsav9qOQKBKn8b.Zvv3hsDx8cniwPTpvO7acle','10 Le Loi, Q1, TP.HCM','Nguyen Van Admin','ADMIN','ACTIVE'),(22,'0912345679','admin@example.com','adminuser2','$2a$10$ac3Ph/Q9E3K06qazXXUxCujQws5Vd/4pADMkxTHczExbMzQMxuyKm','10 Le Loi, Q1, TP.HCM','Nguyen Van Admin 2','ADMIN','ACTIVE'),(24,'0363601205','john@example.com','quang','$2a$10$rQdjLChCk6IxjVOTxzLa/.yf2P/8silBKNkr4JpSKNuAzpkcRuF7u','123 Main St, Hanoi','Nguyen Viet Quang','READER','ACTIVE'),(25,'2','john@example.com','admin','$2a$10$PxIKIGNRKyH/ypqhWM8vee3NjQvW2y7xu5Tww2XAyNfbYLNZ6kl6W','123 Main St, Hanoi','Quang','STAFF','ACTIVE'),(26,'5','john@example.com','abc','$2a$10$WuKDzQ.hZn7pShznNMNZO.bUSlSfA1mOqxx5hK0WZtrw/mGJuZHrm','123 Main St, Hanoi','quang','READER','ACTIVE'),(27,'112345678','kiet@gmail.com','kiet','$2a$10$lkO1enqNTH910aXcm0cBK.AUdSX9g97vvi9xgTKsSA6/FvnsciT9m','abc','hkiet','READER','ACTIVE'),(28,'0123456789','a@gmail.com','anh','$2a$10$3BuYOyqdBxCZQ3.XC61iVeU9Qproey2KvFqO6mPcRvNVDZ5sTCIjq','abc','viet anh','READER','ACTIVE'),(29,'0588688889','tuanminh30042005@gmail.com','minhstaff','$2a$10$EIWv50cerfiIE6hce/.wtuCAaaVSXhxU5NwPV6NjVROoGdggWCI7u','hanoi','Lê Tuấn Minh','READER','ACTIVE'),(31,'0000022222','minh@example.com','minhst','$2a$10$LB8xlpd/iLYmMALPJf78m.zawjRWQBM7d8/lFhhxgIPAm2UPM9ihm','12 Nguyen Hue, Q1, TP.HCM','Le Tuan Minh','STAFF','ACTIVE'),(32,'0000033333','tuanminh30042005@gmail.com','minhreader','$2a$10$j0J0VfE/MKmq9kvYI4O8Lec/aTcT0YFoV0qmQyV7m.wVHk6M1/uRy','hanoi','Lê Tuấn Minh','READER','ACTIVE'),(33,'0000055555','x@gmail.com','minhreader1','$2a$10$lXav7febRxg6kd.bv5vHn.hjnrVAkUhPf1NAXZp9URuc4movDlqwm','f','x','READER','ACTIVE');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-30  0:18:08
