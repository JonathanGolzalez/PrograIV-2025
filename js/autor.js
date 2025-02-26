app.component("autor", {
    template: `
        <div>
            <h2>Gestión de Autores</h2>
            <form @submit.prevent="guardarAutor">
                <div class="mb-3">
                    <label class="form-label">Nombre del Autor</label>
                    <input type="text" class="form-control" v-model="autor.nombre" required>
                </div>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </form>
            <h3 class="mt-4">Lista de Autores</h3>
            <ul class="list-group">
                <li v-for="autor in autores" :key="autor.id" class="list-group-item">
                    {{ autor.nombre }}
                    <button class="btn btn-danger btn-sm float-end" @click="eliminarAutor(autor.id)">Eliminar</button>
                </li>
            </ul>
        </div>
    `,
    data() {
        return {
            autor: { nombre: "" },
            autores: [],
        };
    },
    created() {
        this.cargarAutores();
    },
    methods: {
        async guardarAutor() {
            await db.autores.add({ nombre: this.autor.nombre });
            this.autor.nombre = "";
            this.cargarAutores();
        },
        async cargarAutores() {
            this.autores = await db.autores.toArray();
        },
        async eliminarAutor(id) {
            await db.autores.delete(id);
            this.cargarAutores();
        }
    }
});
