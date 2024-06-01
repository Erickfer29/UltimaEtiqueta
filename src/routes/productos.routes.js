import { Router } from 'express';
import pool from '../database.js'
import multer from 'multer';
import path from 'path'

const router = Router();


const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {                          //Mayor o = 0 y Menor que 1
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({storage})

router.get('/add', (req, res)=>{
    res.render('productos/add')
});

router.post('/add', upload.single('file') , async (req, res)=>{
    try {
        const { nombre, Descripcion, Precio, CantidadStock, Talla, Color, Categoria } = req.body
        let newProducto = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            newProducto = { imagen, nombre, Descripcion, Precio, CantidadStock, Talla, Color, Categoria }

        }else{
            newProducto = { nombre, Descripcion, Precio, CantidadStock, Talla, Color, Categoria }
        }

        await pool.query('INSERT INTO productos SET ?', [newProducto]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/list', async(req, res) =>{
    try{
        const [result] = await pool.query('SELECT * FROM productos');
        res.render('productos/list', {productos: result})

    }catch (error){
        res.status(500).json({message: error.message});
    }
});

router.get('/delete/:id_producto', async (req, res) => {
    try {
        const { id_producto } = req.params
        await pool.query('DELETE FROM productos WHERE id_producto = ?', [id_producto]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/edit/:id_producto', async (req, res)=>{
    try {
        const {id_producto} = req.params
        const [producto] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [id_producto]);
        const productoEdit = producto[0]
        res.render('productos/edit', { producto: productoEdit })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/edit/:id_producto', async (req, res)=>{
    try {
        const {id_producto} = req.params
        const {nombre, Descripcion, Precio, CantidadStock, Talla, Color, Categoria}  = req.body
        const editProducto = {
            nombre, Descripcion, Precio, CantidadStock, Talla, Color, Categoria
                            }

        await pool.query('UPDATE productos SET ? WHERE id_producto = ?', [editProducto, id_producto]);
        res.redirect('/list');

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;