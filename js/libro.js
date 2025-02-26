app.component("libro", {
    template: `
        <div>
            <h2>Gestión de Libros</h2>
            <form @submit.prevent="guardarLibro">
                <div class="mb-3">
                    <label class="form-label">Título del Libro</label>
                    <input type="text" class="form-control" v-model="libro.titulo" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Autor</label>
                    <select class="form-control" v-model="libro.autorId">
                        <option v-for="autor in autores" :key="autor.id" :value="autor.id">
                            {{ autor.nombre }}
                        </option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </form>
            <h3 class="mt-4">Lista de Libros</h3>
            <ul class="list-group">
                <li v-for="libro in libros" :key="libro.id" class="list-group-item">
                    {{ libro.titulo }} - {{ obtenerNombreAutor(libro.autorId) }}
                    <button class="btn btn-danger btn-sm float-end" @click="eliminarLibro(libro.id)">Eliminar</button>
                </li>
            </ul>
        </div>
    `,
    data() {
        return {
            libro: { titulo: "", autorId: null },
            libros: [],
            autores: []
        };
    },
    created() {
        this.cargarLibros();
        this.cargarAutores();
    },
    methods: {
        async guardarLibro() {
            if (this.libro.autorId) {
                await db.libros.add({ titulo: this.libro.titulo, autorId: this.libro.autorId });
                this.libro.titulo = "";
                this.libro.autorId = null;
                this.cargarLibros();
            } else {
                alert("Seleccione un autor");
            }
        },
        async cargarLibros() {
            this.libros = await db.libros.toArray();
        },
        async cargarAutores() {
            this.autores = await db.autores.toArray();
        },
        obtenerNombreAutor(id) {
            let autor = this.autores.find(a => a.id === id);
            return autor ? autor.nombre : "Desconocido";
        },
        async eliminarLibro(id) {
            await db.libros.delete(id);
            this.cargarLibros();
        }
    }
});
