-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2023 a las 03:32:17
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `scaloneta12`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `procEstadistica1` ()  NO SQL BEGIN

/*futbolistas activos*/
DECLARE futbolistas int;

select count(*) into futbolistas
from futbolista 
where activo = 1;


SELECT futbolistas;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `procEstadistica2` ()  NO SQL BEGIN

SELECT f.idFutbolista, f.nombre, f.apellido, f.posicion, fc.dorsal, fc.esCapitan, fc.esTitular
FROM futbolista f
INNER JOIN futbolistaconvocatoria fc
ON f.idFutbolista = fc.futbolista
WHERE fc.convocatoria = convocatoria;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `procEstadistica3` ()  NO SQL BEGIN


/*convocatorias realizadas*/
DECLARE convocatorias int;

select count(*) into convocatorias
from convocatoria;

SELECT convocatorias;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `convocatoria`
--

CREATE TABLE `convocatoria` (
  `idConvocatoria` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `rival` int(11) NOT NULL,
  `golesRecibidos` int(11) DEFAULT NULL,
  `golesConvertidos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `convocatoria`
--

INSERT INTO `convocatoria` (`idConvocatoria`, `fecha`, `rival`, `golesRecibidos`, `golesConvertidos`) VALUES
(3, '2023-11-03', 0, 2, 2),
(11, '2023-11-18', 1, 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `futbolista`
--

CREATE TABLE `futbolista` (
  `idFutbolista` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `posicion` tinyint(1) NOT NULL,
  `apodo` varchar(50) DEFAULT NULL,
  `foto` varchar(50) DEFAULT NULL,
  `pieHabil` tinyint(1) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `futbolista`
--

INSERT INTO `futbolista` (`idFutbolista`, `dni`, `nombre`, `apellido`, `posicion`, `apodo`, `foto`, `pieHabil`, `activo`) VALUES
(1, 30000001, 'Emiliano', 'Martinez', 0, 'Dibu', NULL, 0, 1),
(2, 30000002, 'Franco', 'Armani', 0, 'Franquito', NULL, 1, 1),
(9, 30000003, 'Nahuel', 'Molina', 1, 'Nahu', NULL, 0, 1),
(107, 30000004, 'Cristian', 'Romero', 1, 'Cuti', NULL, 1, 1),
(108, 30000005, 'Nicolas', 'Otamendi', 1, NULL, NULL, 1, 1),
(109, 30000006, 'Nicolas', 'Tagliafico', 1, NULL, NULL, 0, 1),
(112, 30000007, 'Marcos', 'Acuña', 1, 'Huevo', NULL, 0, 1),
(113, 30000008, 'Gonzalo', 'Montiel', 1, NULL, NULL, 1, 1),
(114, 30000009, 'German', 'Pezzela', 1, NULL, NULL, 1, 1),
(115, 30000010, 'Lisandro', 'Martinez', 1, NULL, NULL, 1, 1),
(116, 30000011, 'Juan', 'Foyth', 1, NULL, NULL, 0, 1),
(117, 30000012, 'De Paul', 'Rodrigo', 2, NULL, NULL, 1, 1),
(118, 30000013, 'Enzo', 'Fernandez', 2, NULL, NULL, 1, 1),
(119, 30000014, 'Alexis', 'Mac Allister', 2, NULL, NULL, 1, 1),
(120, 30000015, 'Leandro', 'Paredes', 2, NULL, NULL, 1, 1),
(121, 30000016, 'Guido', 'Rodriguez', 2, NULL, NULL, 1, 1),
(122, 30000017, 'Ezequiel', 'Palacios', 2, NULL, NULL, 1, 1),
(123, 30000018, 'Alejandro', 'Gomez', 2, 'Papu', NULL, 0, 1),
(124, 30000019, 'Lionel', 'Messi', 3, 'La Pulga', NULL, 1, 1),
(125, 30000020, 'Julian', 'Alvarez', 3, 'La Araña', NULL, 0, 1),
(126, 30000021, 'Angel', 'Di Maria', 3, 'Fideo', NULL, 1, 1),
(127, 30000022, 'Lautaro', 'Martinez', 3, 'Toro', NULL, 0, 1),
(128, 30000023, 'Paulo', 'Dybala', 3, NULL, NULL, 1, 1),
(129, 30000024, 'Angel', 'Correa', 3, NULL, NULL, 0, 1),
(130, 30000025, 'Thiago', 'Almada', 3, NULL, NULL, 0, 1),
(131, 30000026, 'Alejandro', 'Garnacho', 3, NULL, NULL, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `futbolistaconvocatoria`
--

CREATE TABLE `futbolistaconvocatoria` (
  `idFutbolistaConvocatoria` int(11) NOT NULL,
  `futbolista` int(11) NOT NULL,
  `convocatoria` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `dorsal` tinyint(2) NOT NULL,
  `esCapitan` tinyint(1) NOT NULL DEFAULT 0,
  `esTitular` tinyint(1) NOT NULL DEFAULT 0,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `futbolistaconvocatoria`
--

INSERT INTO `futbolistaconvocatoria` (`idFutbolistaConvocatoria`, `futbolista`, `convocatoria`, `fecha`, `dorsal`, `esCapitan`, `esTitular`, `activo`) VALUES
(456, 118, 3, '2023-11-19', 13, 0, 1, 1),
(457, 117, 3, '2023-11-19', 12, 0, 1, 1),
(458, 116, 3, '2023-11-19', 11, 0, 1, 1),
(459, 115, 3, '2023-11-19', 10, 0, 1, 1),
(460, 114, 3, '2023-11-19', 9, 0, 1, 1),
(461, 113, 3, '2023-11-19', 8, 0, 1, 1),
(462, 112, 3, '2023-11-19', 7, 0, 1, 1),
(463, 109, 3, '2023-11-19', 6, 0, 1, 1),
(464, 108, 3, '2023-11-19', 5, 0, 1, 1),
(465, 107, 3, '2023-11-19', 4, 0, 1, 1),
(466, 9, 3, '2023-11-19', 3, 1, 0, 1),
(467, 2, 3, '2023-11-19', 2, 0, 0, 1),
(468, 1, 3, '2023-11-19', 1, 0, 1, 1),
(469, 1, 11, '2023-11-19', 0, 0, 0, 1),
(470, 2, 11, '2023-11-19', 1, 0, 0, 1),
(471, 9, 11, '2023-11-19', 2, 0, 0, 1),
(472, 107, 11, '2023-11-19', 3, 0, 0, 1),
(473, 108, 11, '2023-11-19', 4, 0, 0, 1),
(474, 109, 11, '2023-11-19', 5, 0, 0, 1),
(475, 112, 11, '2023-11-19', 6, 0, 0, 1),
(476, 113, 11, '2023-11-19', 7, 0, 0, 1),
(477, 114, 11, '2023-11-19', 8, 0, 0, 1),
(478, 115, 11, '2023-11-19', 9, 0, 0, 1),
(479, 116, 11, '2023-11-19', 10, 0, 0, 1),
(480, 117, 11, '2023-11-19', 11, 0, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rival`
--

CREATE TABLE `rival` (
  `idRival` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `rival`
--

INSERT INTO `rival` (`idRival`, `nombre`, `activo`) VALUES
(0, 'Uruguay', 1),
(1, 'Brasil', 1),
(2, 'Chile', 1),
(3, 'Paraguay', 1),
(4, 'Peru', 1),
(5, 'Venezuela', 1),
(6, 'Colombia', 1),
(7, 'Ecuador', 1),
(8, 'Bolivia', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `tipoUsuario` tinyint(1) NOT NULL DEFAULT 1,
  `correoElectronico` varchar(255) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `tipoUsuario`, `correoElectronico`, `clave`, `nombre`, `apellido`, `activo`) VALUES
(0, 0, 'presidente@correo.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Chiqui', 'Tapia', 1),
(1, 1, 'entrenador@correo.com', '481f6cc0511143ccdd7e2d1b1b94faf0a700a8b49cd13922a70b5ae28acaa8c5', 'Lionel', 'Scaloni', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `convocatoria`
--
ALTER TABLE `convocatoria`
  ADD PRIMARY KEY (`idConvocatoria`),
  ADD KEY `convocatoria_fk0` (`rival`);

--
-- Indices de la tabla `futbolista`
--
ALTER TABLE `futbolista`
  ADD PRIMARY KEY (`idFutbolista`);

--
-- Indices de la tabla `futbolistaconvocatoria`
--
ALTER TABLE `futbolistaconvocatoria`
  ADD PRIMARY KEY (`idFutbolistaConvocatoria`),
  ADD KEY `futbolistaConvocatoria_fk0` (`futbolista`),
  ADD KEY `futbolistaConvocatoria_fk1` (`convocatoria`);

--
-- Indices de la tabla `rival`
--
ALTER TABLE `rival`
  ADD PRIMARY KEY (`idRival`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `correoElectronico` (`correoElectronico`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `convocatoria`
--
ALTER TABLE `convocatoria`
  MODIFY `idConvocatoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `futbolista`
--
ALTER TABLE `futbolista`
  MODIFY `idFutbolista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=207;

--
-- AUTO_INCREMENT de la tabla `futbolistaconvocatoria`
--
ALTER TABLE `futbolistaconvocatoria`
  MODIFY `idFutbolistaConvocatoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=481;

--
-- AUTO_INCREMENT de la tabla `rival`
--
ALTER TABLE `rival`
  MODIFY `idRival` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `convocatoria`
--
ALTER TABLE `convocatoria`
  ADD CONSTRAINT `convocatoria_fk0` FOREIGN KEY (`rival`) REFERENCES `rival` (`idRival`);

--
-- Filtros para la tabla `futbolistaconvocatoria`
--
ALTER TABLE `futbolistaconvocatoria`
  ADD CONSTRAINT `futbolistaConvocatoria_fk0` FOREIGN KEY (`futbolista`) REFERENCES `futbolista` (`idFutbolista`),
  ADD CONSTRAINT `futbolistaConvocatoria_fk1` FOREIGN KEY (`convocatoria`) REFERENCES `convocatoria` (`idConvocatoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
