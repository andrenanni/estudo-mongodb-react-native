const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB Atlas
const connectionString = 'mongodb+srv://nanni-etec:nanni-etec@cluster0.gfsbd.mongodb.net/dbReactNative?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(connectionString, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => console.log('MongoDB conectado'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Definir um modelo de dados
const ItemSchema = new mongoose.Schema({
        name: String
    }, {
        collection: 'Usuarios'
    }
);

const Item = mongoose.model('Item', ItemSchema);

// Rota para adicionar item
app.post('/items', async (req, res) => {
   const { name } = req.body;
   const newItem = new Item({ name });
   await newItem.save();
   res.json(newItem);
});

// Rota para listar itens
app.get('/items', async (req, res) => {
   const items = await Item.find();
   res.json(items);
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Servidor rodando na porta ${PORT}`);
});