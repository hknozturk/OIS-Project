-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: ois
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Address`
--

DROP TABLE IF EXISTS `Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Address` (
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `street_name` varchar(255) DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` VALUES ('Belgium','Brussels',12,'Rue de la loi',1050,1),('Belgium','Brussels',10,'Avenue de la couronne',1040,2);
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Department`
--

DROP TABLE IF EXISTS `Department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Department` (
  `hospital_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`hospital_id`,`name`),
  CONSTRAINT `hospital_fk` FOREIGN KEY (`hospital_id`) REFERENCES `Hospital` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Department`
--

LOCK TABLES `Department` WRITE;
/*!40000 ALTER TABLE `Department` DISABLE KEYS */;
INSERT INTO `Department` VALUES (1,'Cardiology');
/*!40000 ALTER TABLE `Department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Disease`
--

DROP TABLE IF EXISTS `Disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Disease` (
  `DOID_ID` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Disease`
--

LOCK TABLES `Disease` WRITE;
/*!40000 ALTER TABLE `Disease` DISABLE KEYS */;
/*!40000 ALTER TABLE `Disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Doctor`
--

DROP TABLE IF EXISTS `Doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Doctor` (
  `INAMI` int(11) NOT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`INAMI`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Doctor`
--

LOCK TABLES `Doctor` WRITE;
/*!40000 ALTER TABLE `Doctor` DISABLE KEYS */;
INSERT INTO `Doctor` VALUES (1,'Smith','Jhon'),(765765,'Blabliblou','Blala');
/*!40000 ALTER TABLE `Doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Drug`
--

DROP TABLE IF EXISTS `Drug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Drug` (
  `INN` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `INN_UNIQUE` (`INN`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Drug`
--

LOCK TABLES `Drug` WRITE;
/*!40000 ALTER TABLE `Drug` DISABLE KEYS */;
INSERT INTO `Drug` VALUES (897987,'Antibiotic',1);
/*!40000 ALTER TABLE `Drug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Heals`
--

DROP TABLE IF EXISTS `Heals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Heals` (
  `disease_id` int(11) NOT NULL,
  `INN` int(11) NOT NULL,
  PRIMARY KEY (`disease_id`,`INN`),
  KEY `fk_Heals_1_idx` (`INN`),
  CONSTRAINT `disease_fk` FOREIGN KEY (`disease_id`) REFERENCES `Disease` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Heals_1` FOREIGN KEY (`INN`) REFERENCES `Drug` (`INN`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Heals`
--

LOCK TABLES `Heals` WRITE;
/*!40000 ALTER TABLE `Heals` DISABLE KEYS */;
/*!40000 ALTER TABLE `Heals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Health_condition`
--

DROP TABLE IF EXISTS `Health_condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Health_condition` (
  `user_id` int(11) NOT NULL,
  `severity` int(11) DEFAULT NULL,
  `date` datetime NOT NULL,
  `symp_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`date`),
  CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Health_condition`
--

LOCK TABLES `Health_condition` WRITE;
/*!40000 ALTER TABLE `Health_condition` DISABLE KEYS */;
INSERT INTO `Health_condition` VALUES (1,10,'2018-12-18 13:17:17','http://purl.obolibrary.org/obo/SYMP_0000462');
/*!40000 ALTER TABLE `Health_condition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hospital`
--

DROP TABLE IF EXISTS `Hospital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hospital` (
  `name` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hospital`
--

LOCK TABLES `Hospital` WRITE;
/*!40000 ALTER TABLE `Hospital` DISABLE KEYS */;
INSERT INTO `Hospital` VALUES ('Erasme',1),('Delta',2);
/*!40000 ALTER TABLE `Hospital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hospital_location`
--

DROP TABLE IF EXISTS `Hospital_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hospital_location` (
  `hospital_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`hospital_id`,`address_id`),
  KEY `fk_Hospital_location_2_idx` (`address_id`),
  CONSTRAINT `fk_Hospital_location_1` FOREIGN KEY (`hospital_id`) REFERENCES `Hospital` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Hospital_location_2` FOREIGN KEY (`address_id`) REFERENCES `Address` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hospital_location`
--

LOCK TABLES `Hospital_location` WRITE;
/*!40000 ALTER TABLE `Hospital_location` DISABLE KEYS */;
INSERT INTO `Hospital_location` VALUES (1,2),(2,1);
/*!40000 ALTER TABLE `Hospital_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Is_a_common_consequence`
--

DROP TABLE IF EXISTS `Is_a_common_consequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Is_a_common_consequence` (
  `symp1_id` varchar(255) NOT NULL,
  `symp2_id` varchar(255) NOT NULL,
  PRIMARY KEY (`symp1_id`,`symp2_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Is_a_common_consequence`
--

LOCK TABLES `Is_a_common_consequence` WRITE;
/*!40000 ALTER TABLE `Is_a_common_consequence` DISABLE KEYS */;
INSERT INTO `Is_a_common_consequence` VALUES ('http://purl.obolibrary.org/obo/SYMP_0000183 ','http://purl.obolibrary.org/obo/SYMP_0000461'),('http://purl.obolibrary.org/obo/SYMP_0000336','http://purl.obolibrary.org/obo/SYMP_0000462'),('http://purl.obolibrary.org/obo/SYMP_0000473','http://purl.obolibrary.org/obo/SYMP_0000459');
/*!40000 ALTER TABLE `Is_a_common_consequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Suffers_from`
--

DROP TABLE IF EXISTS `Suffers_from`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Suffers_from` (
  `user_id` int(11) NOT NULL,
  `disease_id` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`disease_id`),
  CONSTRAINT `fk_Suffers_from_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Suffers_from`
--

LOCK TABLES `Suffers_from` WRITE;
/*!40000 ALTER TABLE `Suffers_from` DISABLE KEYS */;
INSERT INTO `Suffers_from` VALUES (1,'http://purl.obolibrary.org/obo/DOID_0040002');
/*!40000 ALTER TABLE `Suffers_from` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Symptom`
--

DROP TABLE IF EXISTS `Symptom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Symptom` (
  `SYMP_ID` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Symptom`
--

LOCK TABLES `Symptom` WRITE;
/*!40000 ALTER TABLE `Symptom` DISABLE KEYS */;
/*!40000 ALTER TABLE `Symptom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_location`
--

DROP TABLE IF EXISTS `User_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_location` (
  `user_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`address_id`),
  KEY `fk_User_location_2_idx` (`address_id`),
  CONSTRAINT `fk_User_location_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_location_2` FOREIGN KEY (`address_id`) REFERENCES `Address` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_location`
--

LOCK TABLES `User_location` WRITE;
/*!40000 ALTER TABLE `User_location` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Works`
--

DROP TABLE IF EXISTS `Works`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Works` (
  `doctor_INAMI` int(11) NOT NULL,
  `hospital_id` int(11) DEFAULT NULL,
  `department_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_INAMI`),
  KEY `fk_Works_2_idx` (`hospital_id`),
  KEY `fk_Works_3_idx` (`department_name`),
  CONSTRAINT `fk_Works_1` FOREIGN KEY (`doctor_INAMI`) REFERENCES `Doctor` (`INAMI`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Works_2` FOREIGN KEY (`hospital_id`) REFERENCES `Hospital` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Works`
--

LOCK TABLES `Works` WRITE;
/*!40000 ALTER TABLE `Works` DISABLE KEYS */;
INSERT INTO `Works` VALUES (1,1,'Cardiology');
/*!40000 ALTER TABLE `Works` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int(3) NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `height` int(3) NOT NULL,
  `weight` int(3) NOT NULL,
  `blood_type` enum('0 Rh+','0 Rh-','A Rh+','A Rh-','B Rh+','B Rh-','AB Rh+','AB Rh-') DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('hkn.ozturk.94@gmail.com','Hakan','Ozturk','$2b$10$aYWz57bKU9eMXr3nABJkMeYA2ElTYWU8wEEVlVKXm6ofgFL9v063O',24,'male',183,74,'0 Rh+',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-12 18:35:14
