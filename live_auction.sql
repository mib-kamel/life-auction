/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for life_auction
CREATE DATABASE IF NOT EXISTS `life_auction` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `life_auction`;

-- Dumping structure for table life_auction.auctions
CREATE TABLE IF NOT EXISTS `auctions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userItemID` int(11) DEFAULT NULL,
  `sellerID` int(11) DEFAULT NULL,
  `sellerName` varchar(50) DEFAULT NULL,
  `itemName` varchar(50) DEFAULT NULL,
  `itemImage` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `bestPrice` int(11) DEFAULT NULL,
  `minPrice` int(11) DEFAULT NULL,
  `winnerID` int(11) DEFAULT NULL,
  `remaining` int(11) DEFAULT NULL,
  `isLife` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_auction_user_item` (`userItemID`),
  KEY `FK_auctions_users` (`winnerID`),
  KEY `FK_auctions_users_2` (`sellerID`),
  CONSTRAINT `FK_auction_user_item` FOREIGN KEY (`userItemID`) REFERENCES `user_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_auctions_users` FOREIGN KEY (`winnerID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_auctions_users_2` FOREIGN KEY (`sellerID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- Dumping structure for table life_auction.items
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) NOT NULL DEFAULT '0',
  `img` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- Dumping structure for table life_auction.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL DEFAULT '0',
  `coins` int(11) NOT NULL DEFAULT '1000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- Dumping structure for table life_auction.user_item
CREATE TABLE IF NOT EXISTS `user_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL DEFAULT '7',
  `itemID` int(11) NOT NULL DEFAULT '1',
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_item_items` (`itemID`),
  KEY `FK_user_item_users` (`userID`),
  CONSTRAINT `FK_user_item_items` FOREIGN KEY (`itemID`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_item_users` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
