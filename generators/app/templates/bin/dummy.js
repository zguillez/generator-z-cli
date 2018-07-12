#! /usr/bin/env node
/* eslint no-unused-vars: "off", no-restricted-modules: "off" */
const db = require('./db');
/* Db.queries([
  `INSERT INTO i18n (es) VALUES ('Etapa <span>5</span>')`,
  `INSERT INTO i18n (es) VALUES ('Etapa <span>%LEAD_ID%</span>')`,
  `INSERT INTO i18n (es) VALUES ('Etapa <span>%LEAD_ID%</span>')`
]); */
/* let createPildora = (num, total) => {
  db.query(`INSERT INTO i18n (es) VALUES ('Etapa <span>${num}</span>')`).then((data) => {
    let i18nId = data.insertId;
    db.query(`INSERT INTO i18n (es) VALUES ('Texto info pildora ${num}')`).then((data) => {
      let pildoraId = data.insertId;
      db.query(`INSERT INTO pildoras (id, titulo_id, texto_id, activa) VALUES (${num}, ${i18nId}, ${pildoraId}, 1)`).then((data) => {
        if (num < total) {
          num++;
          createPildora(num, total);
        }
      });
    });
  });
}; */
// ------------------------------
// createPildora(1, 10);
