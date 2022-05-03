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
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `usuario` varchar(10) NOT NULL,
  `id_institucion` varchar(10) DEFAULT NULL,
  `clave` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atiende`
--

CREATE TABLE `atiende` (
  `usuario_personal` varchar(10) DEFAULT NULL,
  `usuario_paciente` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examen`
--

CREATE TABLE `examen` (
  `usuario_personal` varchar(10) NOT NULL,
  `usuario_paciente` varchar(10) NOT NULL,
  `usuario_medico` varchar(10) NOT NULL,
  `tipo` int(11) NOT NULL,
  `total` int(11) DEFAULT NULL,
  `resultado_categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `institucion`
--

CREATE TABLE `institucion` (
  `id_institucion` varchar(10) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `usuario` varchar(10) NOT NULL,
  `id_institucion` varchar(10) DEFAULT NULL,
  `cuidador_principal` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_salud`
--

CREATE TABLE `personal_salud` (
  `usuario` varchar(10) NOT NULL,
  `cedula` varchar(8) DEFAULT NULL,
  `correo_e` varchar(20) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pertenece`
--

CREATE TABLE `pertenece` (
  `usuario_personal` varchar(10) DEFAULT NULL,
  `id_institucion` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado_por_categoria`
--

CREATE TABLE `resultado_por_categoria` (
  `resultado_categoria_id` int(11) NOT NULL,
  `categoria_1` int(11) DEFAULT NULL,
  `categoria_2` int(11) DEFAULT NULL,
  `categoria_3` int(11) DEFAULT NULL,
  `categoria_4` int(11) DEFAULT NULL,
  `categoria_5` int(11) DEFAULT NULL,
  `categoria_6` int(11) DEFAULT NULL,
  `categoria_7` int(11) DEFAULT NULL,
  `categoria_8` int(11) DEFAULT NULL,
  `categoria_9` int(11) DEFAULT NULL,
  `categoria_10` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `rol` int(11) NOT NULL,
  `tipo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_de_examen`
--

CREATE TABLE `tipo_de_examen` (
  `tipo` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usuario` varchar(10) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`usuario`),
  ADD KEY `id_institucion` (`id_institucion`);

--
-- Indices de la tabla `atiende`
--
ALTER TABLE `atiende`
  ADD KEY `usuario_paciente` (`usuario_paciente`),
  ADD KEY `usuario_personal` (`usuario_personal`);

--
-- Indices de la tabla `examen`
--
ALTER TABLE `examen`
  ADD PRIMARY KEY (`usuario_personal`,`usuario_paciente`,`usuario_medico`,`tipo`),
  ADD KEY `usuario_paciente` (`usuario_paciente`),
  ADD KEY `usuario_medico` (`usuario_medico`),
  ADD KEY `tipo` (`tipo`),
  ADD KEY `resultado_categoria_id` (`resultado_categoria_id`);

--
-- Indices de la tabla `institucion`
--
ALTER TABLE `institucion`
  ADD PRIMARY KEY (`id_institucion`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`usuario`),
  ADD KEY `id_institucion` (`id_institucion`);

--
-- Indices de la tabla `personal_salud`
--
ALTER TABLE `personal_salud`
  ADD PRIMARY KEY (`usuario`),
  ADD KEY `rol` (`rol`);

--
-- Indices de la tabla `pertenece`
--
ALTER TABLE `pertenece`
  ADD KEY `id_institucion` (`id_institucion`),
  ADD KEY `usuario_personal` (`usuario_personal`);

--
-- Indices de la tabla `resultado_por_categoria`
--
ALTER TABLE `resultado_por_categoria`
  ADD PRIMARY KEY (`resultado_categoria_id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`rol`);

--
-- Indices de la tabla `tipo_de_examen`
--
ALTER TABLE `tipo_de_examen`
  ADD PRIMARY KEY (`tipo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuario`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`id_institucion`) REFERENCES `institucion` (`id_institucion`),
  ADD CONSTRAINT `administrador_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`);

--
-- Filtros para la tabla `atiende`
--
ALTER TABLE `atiende`
  ADD CONSTRAINT `atiende_ibfk_1` FOREIGN KEY (`usuario_paciente`) REFERENCES `paciente` (`usuario`),
  ADD CONSTRAINT `atiende_ibfk_2` FOREIGN KEY (`usuario_personal`) REFERENCES `personal_salud` (`usuario`);

--
-- Filtros para la tabla `examen`
--
ALTER TABLE `examen`
  ADD CONSTRAINT `examen_ibfk_1` FOREIGN KEY (`usuario_paciente`) REFERENCES `paciente` (`usuario`),
  ADD CONSTRAINT `examen_ibfk_2` FOREIGN KEY (`usuario_personal`) REFERENCES `personal_salud` (`usuario`),
  ADD CONSTRAINT `examen_ibfk_3` FOREIGN KEY (`usuario_medico`) REFERENCES `personal_salud` (`usuario`),
  ADD CONSTRAINT `examen_ibfk_4` FOREIGN KEY (`tipo`) REFERENCES `tipo_de_examen` (`tipo`),
  ADD CONSTRAINT `examen_ibfk_5` FOREIGN KEY (`resultado_categoria_id`) REFERENCES `resultado_por_categoria` (`resultado_categoria_id`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_institucion`) REFERENCES `institucion` (`id_institucion`),
  ADD CONSTRAINT `paciente_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`);

--
-- Filtros para la tabla `personal_salud`
--
ALTER TABLE `personal_salud`
  ADD CONSTRAINT `personal_salud_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `rol` (`rol`),
  ADD CONSTRAINT `personal_salud_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`);

--
-- Filtros para la tabla `pertenece`
--
ALTER TABLE `pertenece`
  ADD CONSTRAINT `pertenece_ibfk_1` FOREIGN KEY (`id_institucion`) REFERENCES `institucion` (`id_institucion`),
  ADD CONSTRAINT `pertenece_ibfk_2` FOREIGN KEY (`usuario_personal`) REFERENCES `personal_salud` (`usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
