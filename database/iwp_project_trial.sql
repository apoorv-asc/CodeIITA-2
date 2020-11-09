-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2020 at 04:00 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iwp project trial`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `type` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `body` text DEFAULT NULL,
  `link` text DEFAULT NULL,
  `likes` int(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `piclink` text DEFAULT NULL,
  `author` text DEFAULT NULL,
  `innerhtml` text DEFAULT NULL,
  `intro` text NOT NULL,
  `date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`type`, `title`, `body`, `link`, `likes`, `id`, `piclink`, `author`, `innerhtml`, `intro`, `date`) VALUES
('written', 'Elon Musk’s 2 Rules For Learning Anything Faster', '<p>Learning is one of the overcommunicated but underleveraged tools of the common entrepreneur.<br>\r\nEveryone talks about methods of learning, but few people find realistic and authentic techniques that actually yield a net profit in the information and application categories.<br><br>\r\nElon Musk has broken through that barrier with learning techniques that have proven successful not just once, but time and time again.<br><br>\r\nA good argument could be made that Musk has leveraged his learning by becoming a disruptor. He and his companies have shifted entire industries, including the transportation sector, the energy sector, and the space sector.<br><br>\r\nHe recently announced at a press conference that his plans for his biotech company Neuralink are progressing quite nicely, hinting at yet another sector which his hands will likely shift in the coming years.<br><br>\r\nYes, Musk is a once-in-a-lifetime genius. Likely on the same levels as Nikola Tesla, Albert Einstein, Isaac Newton. He has a different way of viewing problems than the average entrepreneur.<br><br>\r\nOf course, he reads hundreds of books. He works with top-level thinkers. He has astronomical levels of funding to put towards his every whim. But that’s not what makes him a great learner.<br><br>\r\nHis learning methods aren’t that regal. In fact, his two rules for how to learn anything faster can be implemented by anyone at any time. Including you.<br><br>\r\nYou, too, can be a rocket scientist, if you wanted. Here’s how.<br></p>\r\n<br><br><br>\r\n<p style=\"font-size:30px;font-weight:600\">Identify the different parts of the tree</p>\r\n<br><p>When it comes to learning, Musk is quick to note that he believes that most people can learn more than they currently know.<br><br>\r\nWhen it comes to the average entrepreneur, Musk claims that they often don’t break through their perceived limits and try to learn beyond their current capacity. Or, as he goes on to clarify, they don’t know how to outline their information in a way that leads to further revelation.</p>\r\n<p style=\"text-align:center;font-weight:600\">Rule #1 — Make sure you’re building a tree of knowledge</p>\r\n<p>What does this mean for you practically? It helps the common entrepreneur understand that not everything is weighed with equal gravitas or importance.<br><br>\r\nWhen it comes to learning, there is a difference between material that ends up hanging from a branch and the material that makes up the base of the trunk of your tree.\r\nIt’s the periphery vs. the central.<br><br>\r\nMusk is a master of understanding what is at the core of each of the sectors his entrepreneurial ventures sit in.<br><br></p>\r\n<p style=\"font-size:30px;font-weight:800\">Exponential growth</p>\r\n<br>\r\n<p>Like any new system, it might take you a bit to get the hang of it. You might actually feel like you are learning slower than you did previously. That’s okay. What you’re actually doing is building the foundation for exponential growth.<br><br>\r\nHenry Ford once said, “If you always do what you’ve always done, you’ll always get what you’ve always got.”<br><br>\r\nIf you want to learn anything faster, try the Elon Musk approach, but be warned. You may end up becoming a rocket scientist far faster than you previously thought possible.</p>', NULL, 2, 11, 'https://miro.medium.com/max/875/1*qWiyMxttCwdDYm7YsVMiQQ.jpeg', 'Apoorv', 'true', 'Learning is one of the overcommunicated but underleveraged tools of the common entrepreneur.\r\nEveryone talks about methods of learning, but few people find realistic and authentic techniques that actually yield a net profit in the information and application categories.', '2020-10-22'),
('link', 'DE Shaw Placement Experience', 'Are you wondering which company to apply for during your placement session or how to prepare for one of the well known MNC\'s... Well if that\'s the case then DE Shaw must definitely be on your list. Do read this post as it contains almost everything you need to know about DE Shaw\'s on campus placement drive.', 'https://drive.google.com/file/d/1Xcc_P7fZnkv0Bu_sFrwfHZc6UjnzgyHp/view?usp=sharing', 2, 12, 'https://www.biginternships.com/wp-content/uploads/2018/10/D.-E.-Shaw-Internships-for-Students-2019.jpg', 'code_breaker', NULL, 'Are you wondering which company to apply for during your placement session or how to prepare for one of the well known MNC\'s... Well if that\'s the case then DE Shaw must definitely be on your list. Do read this post as it contains almost everything you need to know about DE Shaw\'s on campus placement drive.', '2020-10-23');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment` text NOT NULL,
  `author` text NOT NULL,
  `embedded` text NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment`, `author`, `embedded`, `likes`, `id`) VALUES
('Is this working', 'Apoorv', 'yEHCfRWz-EI', 3, 7);

-- --------------------------------------------------------

--
-- Table structure for table `tutorials`
--

CREATE TABLE `tutorials` (
  `id` float NOT NULL,
  `title` text DEFAULT NULL,
  `embedded` text DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  `section` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tutorials`
--

INSERT INTO `tutorials` (`id`, `title`, `embedded`, `likes`, `section`) VALUES
(1, 'What is NodeJS', 'yEHCfRWz-EI', 11, 'webdev-nodejs'),
(2, 'Installing NodeJS', 'JINE4D0Syqw', 2, 'webdev-nodejs'),
(3, 'Getting started with NodeJS', 'U5h97cFmj8I', 0, 'webdev-nodejs'),
(4, 'How NodeJS works ?', 'YSyFSnisip0', 0, 'webdev-nodejs'),
(5, 'What is NPM ? | NodeJS', 'M8nlgBQBxxo', 0, 'webdev-nodejs'),
(6, 'Modules in NodeJS', 'zKIV3A_aOkY', 0, 'webdev-nodejs'),
(6.5, 'How a student changed her study habits by setting goals and managing time', 'z7e7gtU3PHY', 0, 'webdev-nodejs'),
(7, 'fs(File System) Module in NodeJS', 'ZySsdm576wE', 0, 'webdev-nodejs'),
(9, 'Bitwise Operations tutorial #1 | XOR, Shift, Subsets', 'xXKL9YBWgCY', 0, 'algorithms'),
(10, 'C++ Bitsets in Competitive Programming', 'jqJ5s077OKo', 0, 'algorithms'),
(11, 'Binary Search tutorial (C++ and Python)', 'GU7DpgHINWQ', 0, 'algorithms'),
(12, 'DP#1: Fibonnaci, Iteration vs Recursion', 'YBSt1jYwVfU', 0, 'algorithms'),
(13, 'DP#2: Coin Change, Double Counting', '1mtvm2ubHCY', 0, 'algorithms'),
(14, 'DP#3: Line of Wines', 'pwpOC1dph6U', 0, 'algorithms'),
(15, 'Linux Setup for Competitive Programming', 'ePZEkbbf3fc', 0, 'algorithms');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `Avatar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `email`, `Avatar`) VALUES
('Apoorv', 'qwe', 'apoorvisngh1120@gmail.com', 'elyse'),
('code_breaker', 'qwe', 'code_breaker@gmail.com', 'kristy'),
('~ASC', '12345', 'apoorvsingh11@gmail.com', 'matthew.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tutorials`
--
ALTER TABLE `tutorials`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tutorials`
--
ALTER TABLE `tutorials`
  MODIFY `id` float NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
