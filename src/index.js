/* -------------------------- importar dependencias ------------------------- */

import express from 'express'


/* ----------------------------- Inicializacion ----------------------------- */

const app = express();

/* --------------------------------- setting -------------------------------- */

app.set('port', process.env.PORT || 3000 )

/* ------------------------------- Middlewares ------------------------------ */

/* --------------------------------- routes --------------------------------- */

/* ------------------------------ Public files ------------------------------ */

/* ------------------------------- Run server ------------------------------- */

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});