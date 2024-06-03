import { Router } from 'express';
import pool from '../database.js';


const suscripRouter = Router();

suscripRouter.get('/list_suscrip', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM suscripcion');
        res.render('suscripcion/list_suscrip', { suscripcion: result })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



suscripRouter.get('/add_suscrip', (req, res) => {
    res.render('suscripcion/add_suscrip', { value: req.query.value, suscription_type: req.query.suscription_type });
    
});

suscripRouter.post('/add_suscrip', async (req, res) => {
    
    try {

        const { Nombre, correo, Precio, tipo } = req.body;
        let newSuscribir = {        
            Nombre, correo, Precio, tipo
        }
        
        await pool.query('INSERT INTO suscripcion SET ?', [newSuscribir]);
        res.json({ redirectUrl: '/list_suscrip' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

suscripRouter.get('/edit_suscrip/:id', async(req,res) => {
    try{
        const{id} = req.params
        
        const [suscribir] = await pool.query('SELECT * FROM suscripcion WHERE id = ?', [id]);
        
        const suscribirEdit = suscribir[0];
        res.render('subscriptions/edit_suscrip',{suscribir: suscribirEdit});

    }catch(error){
        res.status(500).json({message: error.message});
    };
});

suscripRouter.post('/edit_suscrip/:id', async(req,res) => {
    try{
        const{id} = req.params
        const{Nombre, correo, Precio, tipo} = req.body
        
        let editSuscriber =  {
            Nombre, correo, Precio, tipo
            }
        
        await pool.query('UPDATE suscribers SET ? WHERE id = ?', [editSuscriber,id]);
        res.redirect('/list_suscrip');

    }catch(error){
        res.status(500).json({message: error.message});
    }
});

suscripRouter.get('/delete_suscrip/:id', async(req,res) => {
    try{
        const {id} = req.params
        await pool.query('DELETE FROM suscripcion WHERE id=?', [id]);
        res.redirect('/list_suscrip');
    }catch(error){
        res.status(500).json({message: error.message});
    };
});

export default suscripRouter;