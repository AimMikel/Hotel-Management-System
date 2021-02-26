-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 21, 2021 at 07:29 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

-- Created by: Aim Mikel.
-- Contact: 0703929108.

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `HOTEL`
--

CREATE DATABASE IF NOT EXISTS HOTEL;

USE HOTEL;

-- --------------------------------------------------------

--
-- Table structure for table `FOODS`
--

CREATE TABLE `FOODS` (
  `FOOD_ID` varchar(35) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `DESCRIPTION` varchar(400) NOT NULL,
  `PRICE` double(10,2) NOT NULL,
  `ADDED_ON` bigint(15) NOT NULL,
  `COVER` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `FOODS`
--

INSERT INTO `FOODS` (`FOOD_ID`, `NAME`, `DESCRIPTION`, `PRICE`, `ADDED_ON`, `COVER`) VALUES
('1b1a1d2dc5eb3608e6696e8fcf7e5862', 'oc+XtOL290+1ggG839o2', 'ptyavKXS90+5mwugnvE1p2m1KPowhsr8Zp7mRCRuzJyThX6su42XAds=', 600.00, 1613807740, 'iIzG6rX2tGfn2Avg3Idr5UrsfKxk0ZfuG96/EnksudjSmDCE'),
('1d4992701e30305c19dcf37d22bc4fb0', 'qc+Tv+uzh2+xgQ==', 'ptyavKXS90i3zyG0nvkh4k63bcQ4gsA=', 350.00, 1613817575, 'jNvCvLyj7mG0i17l245ish3hevVk0My9GI3pE3l86N7Sgi6Grg=='),
('3e8a09cb645a6726b8d09f67b335b879', 'vtiYvfD6uQ==', 'qMiatqXDsm23mge8nvw69U8=', 330.00, 1613929994, '34nHu7WjsTSy3Qrlh41lvx+/ffFg15i5H9+6EHctuo/Sgi6Grg=='),
('6cf90e5d9a3372bfb2434aecabbe3f37', 'vciYvOn8oGai', 'qM+Tqe2zhHa+iQK9ydshp22rIvl0t8a5DK3mQi0q+Q==', 110.00, 1613809542, 'it/FuLyq5DKzig3iiIxm5ki/ePA12pq6Fdi9RCV+6dbSgi6Grg=='),
('752b7d36d36784b7aef81912f692f271', 'oNmTtOLm90C4jgin3w==', '352mtuTnsiOfiU6c2ts94F75DPoww+20TZvuUyg=', 60.00, 1613910319, '1o7D77aksTfkiQvijo5h4kroeqY1052/HtO5FyV2vorSmDCE'),
('8677ca39e4290e9f73abf19bdeecce43', 'oMSXt+SzlGu/gg8=', 'utWfqaXapCORz1252Z4c4QufP/0xh46RSYr7', 330.00, 1613831983, 'iNjF47Dx5zDk3F/riY1r4hvgKaUw1pzoT927EiAss4/Sgi6Grg=='),
('a8ae1dcded9b7dbbda7420dd54fd3de0', 'vNiS+tf8pGY=', 'vNiS+tf8pGajzye/ztEh8069bdImjMP8ZYXrTiA=', 1200.00, 1613809663, 'iozB7Lfw7zGxjlbqiYwy40/hL6MyhsruHtjsEiAqvdjSgi6Grg=='),
('acfced9e37d604992b082b0256d4c192', 'vtSYsfyznXa5jAs=', 'vtSYsaXZomqzik6UzNE+p221IuMxkQ==', 550.00, 1613807904, '3d7OuLyg42Hpig/kjYxnshLrK6Yy1Ji+HNq7RHkou97Sgi6Grg=='),
('ae2d67357b243f7d8782b303d9c8553e', 'vNiS+tL6uW21nQe3zQ==', 'udSYv6XVpWy9zzy32p4V60SuKOY=', 780.00, 1613807809, 'jYqV6r2k4zvoiQq0ht02sxLuevFs0sy5TtK8H3Mrv9jSgi6Grg=='),
('b0d47ef8c6a031274840031fafeef12b', 'u9qXtuyzhHa7mgOz', 'r52nr+Tho2aizyW1nvE1p36+LPg9w++ySMvcUio7548=', 150.00, 1613886703, '3InCvOD25GLm3V2zio024xPqfPcxgJi6To+7RSQouorSgi6Grg=='),
('de640fe7342b8056d615288888c4dc07', 'vtSMoOSzn2K8iQ==', 'ptyavKXS91O5lRSz', 330.00, 1613853703, '3ITA6ren4DWy3VrrjYkwtki7KfFk0Zm4GIjrFHl2vNjSgi6Grg==');

-- --------------------------------------------------------

--
-- Table structure for table `ORDERS`
--

CREATE TABLE `ORDERS` (
  `ORDER_ID` varchar(35) NOT NULL,
  `USER_ID` varchar(35) NOT NULL,
  `FOOD_ID` varchar(35) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `ROOM` varchar(50) NOT NULL,
  `TABLE` varchar(50) NOT NULL,
  `SIMILAR` varchar(35) NOT NULL,
  `TIMESTAMP` bigint(15) NOT NULL,
  `STATUS` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ORDERS`
--

INSERT INTO `ORDERS` (`ORDER_ID`, `USER_ID`, `FOOD_ID`, `QUANTITY`, `ROOM`, `TABLE`, `SIMILAR`, `TIMESTAMP`, `STATUS`) VALUES
('2c2dbad32d9381a165909f3cd0ece469', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', '1b1a1d2dc5eb3608e6696e8fcf7e5862', 1, 'qc+Zr+v390W8gAGg', 'uow=', 'f2d2bb8ab04b2558329552da24abbd07', 1613919946, 0),
('2d8d51cc42045a551db0a75f7ef37108', '8a5de2fbbf0d7dc22b504088c05c66fd', 'ae2d67357b243f7d8782b303d9c8553e', 1, 'qc+Zr+v390W8gAGg', 'uow=', 'd7c6a172f2baef0348416dad97b36eb3', 1613931865, 1),
('395329093913ceb868b2498e476ad18a', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'de640fe7342b8056d615288888c4dc07', 3, 'qc+Zr+v390W8gAGg', 'uow=', '7c4fe3fd4d4da7ad1e47c3c5610f8d40', 1613919905, 0),
('3a55f85811cb0bdabc98db7d8cf49c0e', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'ae2d67357b243f7d8782b303d9c8553e', 1, 'qc+Zr+v390W8gAGg', 'uow=', '0ec955b7e6aa6de5a1d3d14a308a63c1', 1613919986, 1),
('40f5fb7f9ff198208b3da2cc2a50affb', '8a5de2fbbf0d7dc22b504088c05c66fd', '3e8a09cb645a6726b8d09f67b335b879', 1, 'qc+Zr+v390W8gAGg', 'uow=', 'd7c6a172f2baef0348416dad97b36eb3', 1613931865, 1),
('4fda4ba261c124a86e428e6cbba6439c', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', '8677ca39e4290e9f73abf19bdeecce43', 1, 'qc+Zr+v390W8gAGg', 'uow=', 'f2d2bb8ab04b2558329552da24abbd07', 1613919946, 0),
('511d548ede134e2319cfa886834ef265', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'a8ae1dcded9b7dbbda7420dd54fd3de0', 1, 'qc+Zr+v390W8gAGg', 'uow=', '0ec955b7e6aa6de5a1d3d14a308a63c1', 1613919986, 1),
('6b2fcb2ed97fd839d43ca2fd76fb869f', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'a8ae1dcded9b7dbbda7420dd54fd3de0', 2, 'qc+Zr+v390W8gAGg', 'uow=', '8071b6bbe3c7fc974101af3b0e757932', 1613926554, 1),
('86172ba8d0dba7dddb8d86ba2b959b9e', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'b0d47ef8c6a031274840031fafeef12b', 1, 'qc+Zr+v390W8gAGg', 'uow=', '8071b6bbe3c7fc974101af3b0e757932', 1613926554, 1),
('89d66e5e5544ff4ab8cfc637da34f9f2', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'ae2d67357b243f7d8782b303d9c8553e', 1, 'qc+Zr+v390W8gAGg', 'uow=', 'f2d2bb8ab04b2558329552da24abbd07', 1613919946, 0),
('8daf252a566c847e3824794947075aa7', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'de640fe7342b8056d615288888c4dc07', 1, 'qc+Zr+v390W8gAGg', 'uow=', '8071b6bbe3c7fc974101af3b0e757932', 1613926554, 1),
('92adc6d04f60f8a5e354c138fb7dff3c', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', '1b1a1d2dc5eb3608e6696e8fcf7e5862', 1, 'qc+Zr+v390W8gAGg', 'uow=', '8071b6bbe3c7fc974101af3b0e757932', 1613926554, 1),
('a8a6e2864262245c28bd3f1a5dbd3f75', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'acfced9e37d604992b082b0256d4c192', 1, 'qc+Zr+v390W8gAGg', 'uow=', '8071b6bbe3c7fc974101af3b0e757932', 1613926554, 1),
('cd77d288fd37c4211acdea2b26feec3f', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'b0d47ef8c6a031274840031fafeef12b', 1, 'vdiVtev390W8gAGg', 'uo4=', 'e3dca31fa23209b8e8532a671b834d7a', 1613927680, 1),
('d975b7a242156c443bf132548a2bb4f5', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'acfced9e37d604992b082b0256d4c192', 1, 'qc+Zr+v390W8gAGg', 'uow=', 'f2d2bb8ab04b2558329552da24abbd07', 1613919946, 0),
('e09805495fe4185b4d7f6801a83098fb', '8a5de2fbbf0d7dc22b504088c05c66fd', '6cf90e5d9a3372bfb2434aecabbe3f37', 1, 'qc+Zr+v390W8gAGg', 'uow=', 'd7c6a172f2baef0348416dad97b36eb3', 1613931865, 1),
('e67ab857c54b6bd644250abec2b8a5d2', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'ae2d67357b243f7d8782b303d9c8553e', 1, 'qc+Zr+v390W8gAGg', 'uow=', '8071b6bbe3c7fc974101af3b0e757932', 1613926554, 1),
('ea19d0bc64bd53cb1512e38133ee4181', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', '3e8a09cb645a6726b8d09f67b335b879', 3, 'qc+Zr+v390W8gAGg', 'uow=', '54610ef0ab15d7baee0ded82b61cf841', 1613931044, 0),
('f9b89cd4c191d83330aba560df3cda3f', 'ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'b0d47ef8c6a031274840031fafeef12b', 2, 'qc+Zr+v390W8gAGg', 'uow=', '7c4fe3fd4d4da7ad1e47c3c5610f8d40', 1613919905, 0);

-- --------------------------------------------------------

--
-- Table structure for table `PROFILES`
--

CREATE TABLE `PROFILES` (
  `USER_ID` varchar(35) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `USERNAME` varchar(100) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `PASSWORD` varchar(100) NOT NULL,
  `JOINED` bigint(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PROFILES`
--

INSERT INTO `PROFILES` (`USER_ID`, `NAME`, `USERNAME`, `EMAIL`, `PASSWORD`, `JOINED`) VALUES
('51df754d97a80f2994f74502d612a623', 'r9Sb+sj6vGa8', 'o9Sdv+n/', 'o9Sdv+n/l3qxhwG9kN086g==', '50lXN3RU4Q.66', 1613312469),
('8a5de2fbbf0d7dc22b504088c05c66fd', 'pNybv/azkGyjgwe82Q==', 'pNybv/Y=', 'pNybv/bTrmK4gAH83dE+', '50G00zPrdGTVg', 1613931768),
('ba0b1d4b5389dc82a1f8fd35e9bf2b4e', 'r9Sb+sj6vGa8', 'o9Sdv+k=', 'o9Sdv+nTrmK4gAH83dE+', '50lXN3RU4Q.66', 1613312117);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `FOODS`
--
ALTER TABLE `FOODS`
  ADD PRIMARY KEY (`FOOD_ID`);

--
-- Indexes for table `ORDERS`
--
ALTER TABLE `ORDERS`
  ADD PRIMARY KEY (`ORDER_ID`),
  ADD KEY `USER_ID` (`USER_ID`),
  ADD KEY `FOOD_ID` (`FOOD_ID`);

--
-- Indexes for table `PROFILES`
--
ALTER TABLE `PROFILES`
  ADD PRIMARY KEY (`USER_ID`),
  ADD UNIQUE KEY `USERNAME` (`USERNAME`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ORDERS`
--
ALTER TABLE `ORDERS`
  ADD CONSTRAINT `ORDERS_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `PROFILES` (`USER_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `ORDERS_ibfk_2` FOREIGN KEY (`FOOD_ID`) REFERENCES `FOODS` (`FOOD_ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
