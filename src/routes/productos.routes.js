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

export default router;