-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 24, 2023 alle 16:58
-- Versione del server: 10.4.27-MariaDB
-- Versione PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `register_database`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `ID` int(20) NOT NULL,
  `nome_utente` varchar(128) NOT NULL,
  `nome` varchar(128) NOT NULL,
  `cognome` varchar(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `puntiClassifica` int(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`ID`, `nome_utente`, `nome`, `cognome`, `email`, `password_hash`, `puntiClassifica`) VALUES
(119929313, 'atgadg', 'paolo', 'massari', 'asdgaseg@k.com', '$2y$10$j555Y3IvjB5atFyoja6oIOaPUsDqVHmfHQX1ux4or2oVGR.CZttNm', 0),
(128391688, 'Moira44', 'Marika', 'Fuccio', 'moira44@gmail.com', '$2y$10$6p17dHE67EGmqrgSUtDD8OTZKy9UCP81W7emin/H7oFd9ZWTHcrYS', 3),
(217368871, 'fernando', 'paolo', 'massari', 'f@gmail.com', '$2y$10$X3LTY5.ggDzYWU3p4yi/f.KCtb1eYrUt5k6zedGQs1hNaT4v/tzQy', 3),
(220400525, 'pablo', 'paolo', 'massari', 'c@gmail.com', '$2y$10$zLWiJlmIwChTNQDiSKzomOj3mjpnNK2n8rmhgN7yssuPL2Quf996m', 6),
(267745201, 'romolo', 'paolo', 'massari', 'r@gmail.com', '$2y$10$ZkGT6SnwJSijrnSfkl38/.50NV4yBv2eKBm4gbG8eA0VesWdOEnKm', 0),
(285041840, 'FraAnto44', 'Francesco', 'Antori', 'prova123@gmail.com', '$2y$10$mvrWR6prTzZcgfOFLc/.C.XMmB5AKiTKbK7HRYwRLdBMfq500FWEG', 0),
(316202267, 'T1BEN', 'Bennn', 'Sulejmani', 'bennns10@gmail.com', '$2y$10$7Q1F1wK0NgJ6Hr1kaiN0HeVM.nMdaWN5.ii8KBw8VymmmF8Nb7eti', 21),
(321021159, 'ugo', 'paolo', 'massari', 'u@gmail.com', '$2y$10$pQdXsaFYOc0rJdyo6l3CnOa8U6U1IjW.3kYSrMLlEoFsTD4fWeMHi', 0),
(321163351, 'FabriMoss44', 'Fabrizio', 'Mosetti', 'fabrmoss44@gmail.com', '$2y$10$EbPbGsmpNJ1N6nBQ1boNyutxxyVXXHNg0SUom7VMwa9/tj8E57Iam', 0),
(366257414, 'PaoloMass11', 'Paolo', 'Massari', 'paolomassari@gmail.com', '$2y$10$bWXZ6uFQJe1uY0ieqNLLXeYW6v3AFWMmfRzGIlNXfWutFCbNSuuHi', 6),
(420522956, 'vvvv', 'paolo', 'massari', 'asd@h', '$2y$10$Ob6Xs4Na9kkHpi4eQJsf8eC2aGPvJXC7nYBLG7.m2fBzWKjzrvv6C', 0),
(427339982, 'heyhey', 'hey', 'hey', 'hey@gmail.com', '$2y$10$FQrueNl1nKYToYOOvmKP.uNaJ9ozsvUmdHWNzYC7qNOkJjopRbCza', 0),
(476172618, 'Maverick', 'Giulio', 'Di Gregorio', 'prova45@gmail.com', '$2y$10$MdMMZEjMZmCcBB8j2J./WeMF6ArizNUKvWgT5wpZ09yjFhJvM98ai', 24),
(490551427, 'hey2', 'hey', 'hey', 'hey2@gmail.com', '$2y$10$lutwv4dbMuI/uPcONN3zSuKH/odDNZ2AHNf7BAXUqSM9CHxR3/aoy', 0),
(533500948, 'anton', 'Prova', 'Antonio', 'a@g.com', '$2y$10$S9kX3xMPpZOHgwSZMzje4eZ1V.EbDw9rjkJ2Gk2HoeD.s.uLGan.K', 0),
(616931829, 'a', 'paolo', 'massari', 'prova45@gmail.com', '$2y$10$.sajOf2nFnnbh4LHv64TbeQ2gJt5IxanXMoItnkpLAmwaW4ZW7tsO', 0),
(628969317, 'oleeeeeben', 'Bennn', 'Sulejmani', 'bennhola44@gmail.com', '$2y$10$FcqRYXEJPtr8fESMqNP9gOxysPCngVZYDUBxeMlO/lSuvh/TJdX0W', 0),
(680654714, 'a', 'paolo', 'massari', 'prova45@gmail.com', '$2y$10$qRiwR/0h/zkk9CCgepGyNeXlzA28SbZHIlM2b5.hla0m1k0H1V.Dq', 0),
(687120276, 'Connect4', 'Connect', 'Four', 'connect4@gmail.com', '$2y$10$LKvAylyqmdPvW4mS6guTp.jL/df8s.P.EgX4svUdpQgqCvmu6Pt6K', 0),
(867524717, 'a', 'paolo', 'massari', 'prova45@gmail.com', '$2y$10$Ni7SvDNKJ.NuJkxE5xoqJO3apgi2CBYanIgyfy1.pQ/GqZZ2.PRD6', 0),
(962271182, 'd', 'paolo', 'massari', 'd@gmail.com', '$2y$10$M4e82Vx1GbmlxHdv3cUobuaxs8hAvcvRm6CkKFCMTzpd7HNV6x4A.', 0);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
