const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

// Configuración de la base de datos
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

// Registro de un nuevo usuario
app.post('/register', async (req, res) => {
    const { name, lastname, phone, email, password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO Users (name, lastname, phone, email, password) VALUES (?, ?, ?, ?, ?)',
            [name, lastname, phone, email, password]
        );
        connection.end();
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login de un usuario
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT * FROM Users WHERE email = ? AND password = ?',
            [email, password]
        );
        connection.end();

        if (rows.length > 0) {
            res.status(200).json({ message: 'Login exitoso', user: rows[0] });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Editar un usuario existente
app.put('/edit', async (req, res) => {
    const { name, lastname, phone, email, password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'UPDATE Users SET name = ?, lastname = ?, phone = ?, password = ? WHERE email = ?',
            [name, lastname, phone, password, email]
        );
        connection.end();

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un usuario
app.delete('/delete', async (req, res) => {
    const { email } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'DELETE FROM Users WHERE email = ?',
            [email]
        );
        connection.end();

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login admins
app.post('/adminLogin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT * FROM Admins WHERE email = ? AND password = ?',
            [email, password]
        );
        connection.end();

        if (rows.length > 0) {
            res.status(200).json({ message: 'Login exitoso', user: rows[0] });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Añadir estado del menú
app.post('/addState', async (req, res) => {
    const { name } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO MenuStates (name) VALUES (?)',
            [name]
        );
        connection.end();
        res.status(201).json({ message: 'Estado creado exitosamente', state: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Actualizar estado del menú
app.post('/updateState', async (req, res) => {
    const { id, name } = req.body;
    console.log(JSON.stringify(req.body));
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'UPDATE MenuStates SET name = ? WHERE id = ?',
            [name, id]
        );
        connection.end();

        // Enviar una respuesta en caso de éxito
        res.status(200).json({ message: 'Estado actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Eliminar estado del menú
app.post('/deleteState', async (req, res) => {
    console.log(JSON.stringify(req.body))
    const { id } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'DELETE FROM MenuStates WHERE id = ?',
            [id]
        );
        connection.end();
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Estado eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Muestra los estados del menu
app.post('/getMenuStates', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'SELECT * FROM MenuStates'
        );
        connection.end();
        res.status(200).json({ states: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//Añadir item del menú
app.post('/addMenu', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO Menu (name, description, price) VALUES (?,?,?)',
            [name, description, price]
        );
        connection.end();
        res.status(201).json({ message: 'Item del menú creado exitosamente', state: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Actualizar item del menú
app.put('/updateMenu', async (req, res) => {
    const { id, name, description, price, state } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'UPDATE Menu SET name = ? , description = ?, price = ?, state = ? WHERE id = ?',
            [name, description, price, state, id]
        );
        connection.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Eliminar item del menú
app.delete('/deleteMenu', async (req, res) => {
    const { id } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'DELETE FROM Menu WHERE id = ?',
            [id]
        );
        connection.end();
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Item del menú eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Item no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Añadir estado de la orden
app.post('/addOrderState', async (req, res) => {
    const { name } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO OrderStates (name) VALUES (?)',
            [name]
        );
        connection.end();
        res.status(201).json({ message: 'Estado creado exitosamente', state: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Actualizar estado de la orden
app.put('/updateOrderState', async (req, res) => {
    const { id, name } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'UPDATE OrderStates SET name = ? WHERE id = ?',
            [name, id]
        );
        connection.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Eliminar estado de la orden
app.delete('/deleteOrderState', async (req, res) => {
    const { id } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'DELETE FROM OrderStates WHERE id = ?',
            [id]
        );
        connection.end();
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Estado eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/orderStates', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'SELECT * FROM OrderStates'
        );
        connection.end();
        res.status(200).json({ states: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


// Registro de la reserva
app.post('/registerReservation', async (req, res) => {
    const { idUser, date, time, partySize } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO Reservations (idUser, date, time, partySize) VALUES (?, ?, ?, ?)',
            [idUser, date, time, partySize]
        );
        connection.end();
        res.status(201).json({ message: 'Reserva registrada exitosamente', reservation: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar reserva
app.delete('/deleteReservation', async (req, res) => {
    const { id } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'DELETE FROM Reservations WHERE id = ?',
            [id]
        );
        connection.end();

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Reserva eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
