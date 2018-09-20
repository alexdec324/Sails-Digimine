/*
SQLyog Ultimate v11.3 (64 bit)
MySQL - 10.1.21-MariaDB : Database - digimine
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`digimine` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `digimine`;

/*Table structure for table `balance` */

DROP TABLE IF EXISTS `balance`;

CREATE TABLE `balance` (
  `userid` varchar(255) DEFAULT NULL,
  `coin` varchar(255) DEFAULT NULL,
  `zcash` varchar(255) DEFAULT NULL,
  `ethereum` varchar(255) DEFAULT NULL,
  `litecoin` varchar(255) DEFAULT NULL,
  `bitcoin` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `balance` */

insert  into `balance`(`userid`,`coin`,`zcash`,`ethereum`,`litecoin`,`bitcoin`,`id`,`createdAt`,`updatedAt`) values ('1','2','24','41','5','30',1,'2017-11-09 18:33:17','2017-11-09 18:33:26');

/*Table structure for table `order` */

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `userid` varchar(255) DEFAULT NULL,
  `zcash` varchar(255) DEFAULT NULL,
  `ethereum` varchar(255) DEFAULT NULL,
  `litecoin` varchar(255) DEFAULT NULL,
  `invoice_id` varchar(255) DEFAULT NULL,
  `payment` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `order` */

insert  into `order`(`userid`,`zcash`,`ethereum`,`litecoin`,`invoice_id`,`payment`,`state`,`id`,`createdAt`,`updatedAt`) values ('1','6,0.56,168,33.04','12,0.50,9,24.50','24,0.18,3,6.88','090EF084-E864-142D-735AB92AD19B','credit-card','-100',1,'2017-11-09 18:33:51','2017-11-09 18:33:51'),('1','6,0.00,0,0.00','24,0.78,14,30.33','6,0.00,0,0.00','2C890B02-BDAF-8EF5-5A8C56ED21ED','credit-card','-100',2,'2017-11-09 18:34:03','2017-11-09 18:34:03');

/*Table structure for table `setting` */

DROP TABLE IF EXISTS `setting`;

CREATE TABLE `setting` (
  `userid` varchar(255) DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `setting` */

insert  into `setting`(`userid`,`item`,`value`,`id`,`createdAt`,`updatedAt`) values ('1','bitcoin_id','11111111111111',1,'2017-11-09 18:34:52','2017-11-09 18:34:52'),('1','ethereum_id','2222222222222',2,'2017-11-09 18:34:52','2017-11-09 18:34:52'),('1','zcash_id','3333333333333',3,'2017-11-09 18:34:52','2017-11-09 18:34:52'),('1','litecoin_id','44444444444444',4,'2017-11-09 18:34:52','2017-11-09 18:34:52');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phonenum` varchar(255) DEFAULT NULL,
  `pricing` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `verifycode` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `user` */

insert  into `user`(`username`,`email`,`password`,`firstname`,`lastname`,`address`,`phonenum`,`pricing`,`token`,`verifycode`,`state`,`id`,`createdAt`,`updatedAt`) values ('user1','user1@test.com','jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=','user1','user1','address','+44 333 2221111','1','RMGeUXVOvcZTGBYX','612869','1',1,'2017-11-09 18:30:29','2017-11-09 18:34:52'),('user2','user2@test.com','jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=','user2','user2','address','+44 222 2222222','1','UJ2dOjGGrXSnlQAz','846141','1',2,'2017-11-09 18:31:34','2017-11-09 18:31:48'),('user3','user3@test.com','jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=','user3','user3','address','+44 4444444444','1','cMCOavkPhyc3cUvo','528469','-1',3,'2017-11-09 18:32:51','2017-11-09 18:32:51'),('tom','tom@test.com','jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=','as','as','adress','+1684 22312231','1','u0ngMx5f2jhZ4g19','506765','-1',4,'2017-11-13 13:22:15','2017-11-13 13:22:15');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
