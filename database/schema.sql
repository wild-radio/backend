CREATE TABLE Sistema (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	identificacao TEXT NOT NULL,
    numeroSerie TEXT NOT NULL
);
CREATE UNIQUE INDEX index_sistema ON Sistema(id);
CREATE UNIQUE INDEX index_sistema_numeroSerie ON Sistema(numeroSerie);

CREATE TABLE Camera (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    idSistema INTEGER NOT NULL,
    principal INTEGER NOT NULL,
    FOREIGN KEY(idSistema) REFERENCES Sistema(id)
);
CREATE UNIQUE INDEX index_camera ON Camera(id);

CREATE TABLE Configuracao (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    idCamera INTEGER NOT NULL,
    ativa INTEGER NOT NULL,
    temporizador INTEGER NOT NULL,
    presenca INTEGER NOT NULL,
    horizontal INTEGER NOT NULL,
    vertical INTEGER NOT NULL,
    FOREIGN KEY(idCamera) REFERENCES Camera(id)
);
CREATE UNIQUE INDEX index_configuracao ON Configuracao(id);

CREATE TABLE Catalogo (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
);
CREATE UNIQUE INDEX index_catalogo ON Catalogo(id);

CREATE TABLE Foto (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    idCamera INTEGER NOT NULL,
    idCatalogo INTEGER,
    dataHoraCaptura INTEGER NOT NULL,
    conteudo BLOB NOT NULL,
    FOREIGN KEY(idCamera) REFERENCES Camera(id),
    FOREIGN KEY(idCatalogo) REFERENCES Catalogo(id)
    		ON DELETE CASCADE ON UPDATE NO ACTION
);
CREATE UNIQUE INDEX index_foto ON Foto(id);

INSERT INTO Sistema (id, identificacao, numeroSerie) VALUES (1, 'Sistema 1', 'WR0001');

INSERT INTO Camera (id, idSistema, principal) VALUES (1, 1, 1);
INSERT INTO Camera (id, idSistema, principal) VALUES (2, 1, 0);

INSERT INTO Configuracao (id, idCamera, ativa, temporizador, presenca, horizontal, vertical) VALUES (1, 1, 0, 0, 0, 0, 0);
INSERT INTO Configuracao (id, idCamera, ativa, temporizador, presenca, horizontal, vertical) VALUES (2, 2, 0, 0, 0, 0, 0);
