const express = require('express');

//importe a conexao do banco
const db = require('../../db/connect/connectDB').db;

class CreateRoutes {   
    constructor({ entity }) {
        this.router = express.Router();
        this.entity = entity;
        this.dataBase = db.getRepository(this.entity)

        return this;
    };
    
    get(url) {
        this.router.get(url, async (req,res) => {
            const data = await this.dataBase.find();
            res.json(data);
        });

        return this;
    };

    getById(url) {
        const id = url.replace(/[\/:]/g, "");
        this.router.get(url, async (req,res) => {
            const data = await this.dataBase.findOneBy({id: req.params.id});
            res.json(data);
        });

        return this;
    };

    post(url) {
        this.router.post(url, async (req,res) => {
            const data = await this.dataBase.create(req.body);
            const saveData = await this.dataBase.save(data);
            return res.send(saveData);
        });

        return this;
    };

    delete(url) {
        const param = url.replace(/[\/:]/g, "");
        this.router.delete(url, async (req,res) => {
            const op = await this.dataBase.delete({ [param]: req.params.param });
            res.send(op)
        });

        return this;
    };

    put(url) {
        const param = url.replace(/[\/:]/g, "");
        this.router.put(url, async (req,res) => {
            const data = await this.dataBase.findOneBy({ [param]: req.params.param });
            const saveMerge = this.dataBase.save(this.dataBase.merge(data, req.body))
        });

        return this;
    };
};

module.exports = CreateRoutes;
