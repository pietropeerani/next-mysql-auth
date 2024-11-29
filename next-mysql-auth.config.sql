-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Nov 26, 2024 alle 21:40
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `next-mysql-auth`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `password`
--

CREATE TABLE `password` (
  `salt_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `salt` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dump dei dati per la tabella `password`
--

INSERT INTO `password` (`salt_id`, `user_id`, `salt`) VALUES
('4a952e08-9ae9-11ef-9190-c0e434396493', 'db3c8d70-2796-4a30-b50b-597d903b4861', '$2b$10$NP4D2PNxjGaqxuqMn3wmue'),
('8e235fe8-ac25-11ef-b641-c0e434396493', '0aa4e434-045e-40f8-923b-25d4e94d8fbc', '$2b$10$apPSuBB6z8vNAsnFcv.U6u');

-- --------------------------------------------------------

--
-- Struttura della tabella `reset_tocken`
--

CREATE TABLE `reset_tocken` (
  `request_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `token_value` varchar(255) NOT NULL,
  `tocken_status` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tocken_status`))
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `session`
--

CREATE TABLE `session` (
  `session_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `login_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_activity` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`user_id`, `name`, `username`, `email`, `password`, `created_at`) VALUES
('0aa4e434-045e-40f8-923b-25d4e94d8fbc', 'pietro', 'pietro', 'pietro.peerani@gmail.com', '$2b$10$apPSuBB6z8vNAsnFcv.U6uKRN9.UWbqBDpjqkEez/zjCpvfG5l9oK', '2024-11-26 20:40:16'),
('db3c8d70-2796-4a30-b50b-597d903b4861', '', 'marco', 'marco.rossi@gmail.com', '$2b$10$NP4D2PNxjGaqxuqMn3wmueXONuJsfkEug.fKB5ktHVv3u4VLm9btK', '2024-11-04 21:56:25');

--
-- Trigger `users`
--
DELIMITER $$
CREATE TRIGGER `insert_password` AFTER INSERT ON `users` FOR EACH ROW INSERT INTO password (salt_id, user_id) VALUES(UUID(), NEW.user_id)
$$
DELIMITER ;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `password`
--
ALTER TABLE `password`
  ADD PRIMARY KEY (`salt_id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
