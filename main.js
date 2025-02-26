const { createApp } = Vue;
const db = new Dexie("db_codigo_estudiante");

db.version(1).stores({
    autores: "++id, nombre",
    libros: "++id, titulo, autorId"
});

const app = createApp({
    data() {
        return {
            forms: {
                autor: { mostrar: false },
                libro: { mostrar: false }
            }
        };
    },
    methods: {
        abrirFormulario(componente) {
            Object.keys(this.forms).forEach(key => {
                this.forms[key].mostrar = false;
            });
            this.forms[componente].mostrar = true;
        }
    }
});

app.mount("#app");
