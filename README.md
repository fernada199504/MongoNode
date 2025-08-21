Backend – MongoNode




Backend desarrollado con Node.js, Express y MongoDB para manejar usuarios, roles, categorías, posts y comentarios.

🚀 Tecnologías

Node.js

Express

MongoDB (Mongoose)

Dotenv

Bcrypt.js

JSON Web Token (JWT)

Cors

📂 Estructura de carpetas
MongoNode/
│
├─ backend/
│  ├─ controllers/      
│  │   ├─ authController.js         # Login y registro
│  │   ├─ usuariosController.js     # CRUD de usuarios
│  │   ├─ postController.js
│  │   ├─ commentController.js
│  │   └─ categoryController.js
│  │
│  ├─ middlewares/      
│  │   └─ authMiddleware.js        # auth e isAdmin
│  │
│  ├─ models/           
│  │   ├─ Usuario.js
│  │   ├─ Post.js
│  │   ├─ Comment.js
│  │   └─ Category.js
│  │
│  ├─ routes/           
│  │   ├─ auth.js                  # Rutas de login/registro
│  │   ├─ usuarios.js              # CRUD de usuarios
│  │   ├─ posts.js
│  │   ├─ comments.js
│  │   └─ categories.js
│  │
│  ├─ .env              
│  ├─ .gitignore
│  └─ app.js                       # Archivo principal del servidor
│
└─ package.json

⚙️ Instalación

Clonar el repositorio:

git clone https://github.com/fernada199504/MongoNode
cd MongoNode/backend


Instalar dependencias:

npm install


Crear archivo .env en la raíz del backend con tus variables de entorno:

PORT=5000
MONGO_URI=<TU_URI_DE_MONGODB>
JWT_SECRET=<TU_SECRETO_JWT>


Levantar el servidor:

npm run dev


Salida esperada:

Servidor escuchando en puerto 5000
✅ MongoDB conectado
Autenticación y Roles

🔐 Autenticación y Roles

Usuarios: admin y usuario

JWT usado para proteger rutas

Middleware:

auth → verifica token válido

isAdmin → solo usuarios con rol admin pueden crear/borrar categorías

📌 Endpoints

Método	Ruta	Descripción
POST	/api/usuario/ 	Registrar usuario
POST	/api/auth/login	Login y obtención de token JWT


Usuarios (CRUD)
Método	Ruta	Descripción	Rol
GET	/api/usuarios	Listar todos los usuarios	Admin
GET	/api/usuarios/:id	Obtener usuario por ID	Auth
PUT	/api/usuarios/:id	Actualizar usuario	Admin o mismo usuario
DELETE	/api/usuarios/:id	Eliminar usuario	Admin

Categories
Método	Ruta	Descripción	Rol
POST	/api/categories	Crear categoría	Admin
GET	/api/categories	Listar categorías	Todos
DELETE	/api/categories/:id	Eliminar categoría	Admin

Posts
Método	Ruta	Descripción	Rol
POST	/api/posts	Crear post	Auth
GET	/api/posts	Listar posts	Todos
GET	/api/posts/:id	Obtener post por id	Todos
PUT	/api/posts/:id	Actualizar post	Autor/Admin
DELETE	/api/posts/:id	Eliminar post	Autor/Admin

Comments
Método	Ruta	Descripción	Rol
POST	/api/comments	Crear comentario	Auth
GET	/api/comments/post/:postId	Listar comentarios por post	Todos
DELETE	/api/comments/:id	Eliminar comentario	Autor/Admin

📌 Notas importantes

Las contraseñas se almacenan encriptadas con bcrypt.

Los endpoints protegidos requieren token JWT válido.


Las rutas de administración (eliminar usuarios, crear/borrar categorías) requieren rol admin.

📖 Autor

  Fernanda Nuñez



