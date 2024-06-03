import { Router } from 'express';
import pool from '../database.js';


const contRouter = Router();


contRouter.get('/contactanos', (req,res) => {
    res.render('aboutus/contactanos');
});

export default contRouter;