-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 26-04-2022 a las 17:08:27
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Ilikia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Administrador`
--

CREATE TABLE `Administrador` (
  `usuario` varchar(10) NOT NULL,
  `idInstitucion` varchar(10) DEFAULT NULL,
  `clave` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Atiende`
--

CREATE TABLE `Atiende` (
  `usuarioPersonal` varchar(10) DEFAULT NULL,
  `usuarioPaciente` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Examen`
--

CREATE TABLE `Examen` (
  `usuarioPersonal` varchar(10) NOT NULL,
  `usuarioPaciente` varchar(10) NOT NULL,
  `usuarioMedico` varchar(10) NOT NULL,
  `tipo` int(11) NOT NULL,
  `total` int(11) DEFAULT NULL,
  `resultadoCategoriaID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Institucion`
--

CREATE TABLE `Institucion` (
  `idInstitucion` varchar(10) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Paciente`
--

CREATE TABLE `Paciente` (
  `usuario` varchar(10) NOT NULL,
  `idInstitucion` varchar(10) DEFAULT NULL,
  `cuidadorPrincipal` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PersonalSalud`
--

CREATE TABLE `PersonalSalud` (
  `usuario` varchar(10) NOT NULL,
  `cedula` varchar(8) DEFAULT NULL,
  `correoElectronico` varchar(20) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `roles` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pertenece`
--

CREATE TABLE `Pertenece` (
  `usuarioPersonal` varchar(10) DEFAULT NULL,
  `idInstitucion` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ResultadoPorCategoria`
--

CREATE TABLE `ResultadoPorCategoria` (
  `resultadoCategoriaID` int(11) NOT NULL,
  `categoria1` int(11) DEFAULT NULL,
  `categoria2` int(11) DEFAULT NULL,
  `categoria3` int(11) DEFAULT NULL,
  `categoria4` int(11) DEFAULT NULL,
  `categoria5` int(11) DEFAULT NULL,
  `categoria6` int(11) DEFAULT NULL,
  `categoria7` int(11) DEFAULT NULL,
  `categoria8` int(11) DEFAULT NULL,
  `categoria9` int(11) DEFAULT NULL,
  `categoria10` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Roles`
--

CREATE TABLE `Roles` (
  `roles` int(11) NOT NULL,
  `tipo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TipoDeExamen`
--

CREATE TABLE `TipoDeExamen` (
  `tipo` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `usuario` varchar(10) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `fechaDeNacimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Administrador`
--
ALTER TABLE `Administrador`
  ADD PRIMARY KEY (`usuario`),
  ADD KEY `idInstitucion` (`idInstitucion`);

--
-- Indices de la tabla `Atiende`
--
ALTER TABLE `Atiende`
  ADD KEY `usuarioPaciente` (`usuarioPaciente`),
  ADD KEY `usuarioPersonal` (`usuarioPersonal`);

--
-- Indices de la tabla `Examen`
--
ALTER TABLE `Examen`
  ADD PRIMARY KEY (`usuarioPersonal`,`usuarioPaciente`,`usuarioMedico`,`tipo`),
  ADD KEY `usuarioPaciente` (`usuarioPaciente`),
  ADD KEY `usuarioMedico` (`usuarioMedico`),
  ADD KEY `tipo` (`tipo`),
  ADD KEY `resultadoCategoriaID` (`resultadoCategoriaID`);

--
-- Indices de la tabla `Institucion`
--
ALTER TABLE `Institucion`
  ADD PRIMARY KEY (`idInstitucion`);

--
-- Indices de la tabla `Paciente`
--
ALTER TABLE `Paciente`
  ADD PRIMARY KEY (`usuario`),
  ADD KEY `idInstitucion` (`idInstitucion`);

--
-- Indices de la tabla `PersonalSalud`
--
ALTER TABLE `PersonalSalud`
  ADD PRIMARY KEY (`usuario`),
  ADD KEY `roles` (`roles`);

--
-- Indices de la tabla `Pertenece`
--
ALTER TABLE `Pertenece`
  ADD KEY `idInstitucion` (`idInstitucion`),
  ADD KEY `usuarioPersonal` (`usuarioPersonal`);

--
-- Indices de la tabla `ResultadoPorCategoria`
--
ALTER TABLE `ResultadoPorCategoria`
  ADD PRIMARY KEY (`resultadoCategoriaID`);

--
-- Indices de la tabla `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`roles`);

--
-- Indices de la tabla `TipoDeExamen`
--
ALTER TABLE `TipoDeExamen`
  ADD PRIMARY KEY (`tipo`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`usuario`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Administrador`
--
ALTER TABLE `Administrador`
  ADD CONSTRAINT `Administrador_ibfk_1` FOREIGN KEY (`idInstitucion`) REFERENCES `Institucion` (`idInstitucion`),
  ADD CONSTRAINT `Administrador_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `Usuario` (`usuario`);

--
-- Filtros para la tabla `Atiende`
--
ALTER TABLE `Atiende`
  ADD CONSTRAINT `Atiende_ibfk_1` FOREIGN KEY (`usuarioPaciente`) REFERENCES `Paciente` (`usuario`),
  ADD CONSTRAINT `Atiende_ibfk_2` FOREIGN KEY (`usuarioPersonal`) REFERENCES `PersonalSalud` (`usuario`);

--
-- Filtros para la tabla `Examen`
--
ALTER TABLE `Examen`
  ADD CONSTRAINT `Examen_ibfk_1` FOREIGN KEY (`usuarioPaciente`) REFERENCES `Paciente` (`usuario`),
  ADD CONSTRAINT `Examen_ibfk_2` FOREIGN KEY (`usuarioPersonal`) REFERENCES `PersonalSalud` (`usuario`),
  ADD CONSTRAINT `Examen_ibfk_3` FOREIGN KEY (`usuarioMedico`) REFERENCES `PersonalSalud` (`usuario`),
  ADD CONSTRAINT `Examen_ibfk_4` FOREIGN KEY (`tipo`) REFERENCES `TipoDeExamen` (`tipo`),
  ADD CONSTRAINT `Examen_ibfk_5` FOREIGN KEY (`resultadoCategoriaID`) REFERENCES `ResultadoPorCategoria` (`resultadoCategoriaID`);

--
-- Filtros para la tabla `Paciente`
--
ALTER TABLE `Paciente`
  ADD CONSTRAINT `Paciente_ibfk_1` FOREIGN KEY (`idInstitucion`) REFERENCES `Institucion` (`idInstitucion`),
  ADD CONSTRAINT `Paciente_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `Usuario` (`usuario`);

--
-- Filtros para la tabla `PersonalSalud`
--
ALTER TABLE `PersonalSalud`
  ADD CONSTRAINT `PersonalSalud_ibfk_1` FOREIGN KEY (`roles`) REFERENCES `Roles` (`roles`),
  ADD CONSTRAINT `PersonalSalud_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `Usuario` (`usuario`);

--
-- Filtros para la tabla `Pertenece`
--
ALTER TABLE `Pertenece`
  ADD CONSTRAINT `Pertenece_ibfk_1` FOREIGN KEY (`idInstitucion`) REFERENCES `Institucion` (`idInstitucion`),
  ADD CONSTRAINT `Pertenece_ibfk_2` FOREIGN KEY (`usuarioPersonal`) REFERENCES `PersonalSalud` (`usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
