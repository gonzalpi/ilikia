
-- usuario
insert into usuario values
    -- personal de salud
    ('dab', 'Dante Antonio Bocanegra', '2001-09-12'),
    ('ajh', 'Ana Josefina Hernández', '2000-05-26'),
    ('fjm', 'Fernando José Miramontes', '1989-01-15'),
    -- médico responsable
    ('pog', 'Paloma Olivia Guadarrama', '1998-07-31'),
    -- administrador
    ('mrl', 'Martha Rocío Luján','1980-08-21'),
    -- paciente
    ('afp', 'Alfonso Florencio Preciado', '1956-08-19'),
    ('let', 'Luisa Emilia Tolentino', '1956-05-28'),
    ('git', 'Gabriela Irene Tolentino', '1955-03-29'),
    ('ndy', 'Nadia Doria Yáñez', '1952-05-9-12'),
    ('plt', 'Patricio Luciano Tress', '1952-01-23'),
    ('rss', 'Román Santos Sullivan', '1951-12-31'),
    ('mar', 'María Anastasia Rosario', '1951-11-06'),
    ('fsk', 'Fulgencio Silverio Kirchner', '1948-11-27'),
    ('gar', 'Garrett Andrew Ralphson', '1947-06-17'),
    ('jjq', 'José Javier Quirino', '1945-02-01');

-- institucion
insert into institucion values (1, 'Casa de Santa María');

-- administrador
insert into administrador values ('mrl', 1, 'password');

-- tipo_de_examen
insert into tipo_de_examen values (1, 'Examen mínimo de estado mental');

-- rol
insert into rol values
    (1, 'Médico responsable'),
    (2, 'Personal de salud');

-- paciente
insert into paciente values
    ('afp', 1, 'Florencia Lucía Preciado'),
    ('let', 1, 'Martín Andrés Tolentino'),
    ('git', 1, 'Martín Andrés Tolentino'),
    ('ndy', 1, 'Adrián Adán Flores'),
    ('plt', 1, 'Alejandro Edward Tress'),
    ('rss', 1, 'Jonacio Homero Sullivan'),
    ('mar', 1, 'Flor Guadalupe Domínguez'),
    ('fsk', 1, 'Rosa María Kirchner'),
    ('gar', 1, 'Anne Marie Mayflower');

-- personal_salud
insert into personal_salud values
    ('dab', '12001236', 'dante@ilikia.com', '+52 669 365 9918', 2),
    ('ajh', '11659855', 'ana.josefina@ilikia.com', '+52 33 9823 4510', 2),
    ('fjm', '11264323', 'fj.miramon@ilikia.com', '+52 33 2623 1613', 2),
    ('pog', '11256397', 'paloma@ilikia.com', '+52 81 3622 1201', 1);

-- atiende
insert into atiende values
    -- todos son atendidos por el mismo médico responsable
    ('pog', 'afp'),
    ('pog', 'let'),
    ('pog', 'git'),
    ('pog', 'ndy'),
    ('pog', 'plt'),
    ('pog', 'rss'),
    ('pog', 'mar'),
    ('pog', 'fsk'),
    ('pog', 'gar'),
    -- cada quien es atendido por un personal de salud
    ('dab', 'afp'),
    ('ajh', 'let'),
    ('ajh', 'git'),
    ('dab', 'ndy'),
    ('fjm', 'plt'),
    ('ajh', 'rss'),
    ('fjm', 'mar'),
    ('fjm', 'fsk'),
    ('fjm', 'gar');

-- examen
insert into examen
    (usuario_personal, usuario_paciente, usuario_medico, tipo, fecha, total,
    cat_1, cat_2, cat_3, cat_4, cat_5, cat_6, cat_7, cat_8) -- cat_9, cat_10
    values
    ('dab', 'afp', 'pog', 1, '2022-04-27', 30, 10, 3, 5, 5, 3, 1, 3, 1),
    ('ajh', 'let', 'pog', 1, '2022-04-29', 20, 6, 2, 4, 5, 2, 0, 0, 1),
    ('ajh', 'git', 'pog', 1, '2022-04-30', 16, 9, 1, 1, 2, 0, 1, 2, 0),
    ('dab', 'ndy', 'pog', 1, '2022-05-02', 24, 7, 3, 5, 1, 3, 1, 3, 1),
    ('fjm', 'plt', 'pog', 1, '2022-05-03', 12, 2, 1, 2, 4, 1, 0, 1, 1),
    ('ajh', 'rss', 'pog', 1, '2022-05-03', 17, 9, 1, 4, 0, 1, 0, 2, 0);

-- pertenece
insert into pertenece values
    ('dab', 1),
    ('ajh', 1),
    ('fjm', 1),
    ('pog', 1);

-- REMEMBER THERE'S A STASH IN SERVER