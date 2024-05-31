import { Router } from 'express';
import pool from '../database.js'

const router = Router();

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

export default router;