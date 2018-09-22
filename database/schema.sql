CREATE TABLE Sistema (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	identificacao TEXT NOT NULL
);

CREATE TABLE Camera (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    idSistema INTEGER NOT NULL,
    principal INTEGER NOT NULL,
    ligada INTEGER NOT NULL,
    FOREIGN KEY(idSistema) REFERENCES Sistema(id)
);

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

CREATE TABLE Catalogo (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
);

CREATE TABLE Foto (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    idCamera INTEGER NOT NULL,
    idCatalogo INTEGER NOT NULL,
    dataHoraCaptura INTEGER NOT NULL,
    conteudo BLOB,
    FOREIGN KEY(idCamera) REFERENCES Camera(id),
    FOREIGN KEY(idCatalogo) REFERENCES Catalogo(id)
    		ON DELETE CASCADE ON UPDATE NO ACTION
);

INSERT INTO Sistema (id, identificacao) VALUES(1, 'Sistema 1');

INSERT INTO Camera (id, idSistema, principal, ligada) VALUES(1, 1, 1, 0);
INSERT INTO Camera (id, idSistema, principal, ligada) VALUES(2, 1, 1, 0);

INSERT INTO Configuracao (id, idCamera, ativa, temporizador, presenca, horizontal, vertical) VALUES (1, 1, 0, 0, 0, 0, 0);
INSERT INTO Configuracao (id, idCamera, ativa, temporizador, presenca, horizontal, vertical) VALUES (2, 2, 0, 0, 0, 0, 0);
