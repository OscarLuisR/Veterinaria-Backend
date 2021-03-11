const conn = require('../database/db');

/* 
const faker = require('faker');

let newMascota;

for (let index = 1; index <= 200; index++) {
    newMascota = new conn.model('Mascotas')({
        nombre: faker.name.firstName(),
        descripcion: faker.lorem.paragraph()
    });    
    
    const results = await newMascota.save();

    // console.log(faker.name.firstName(), faker.lorem.paragraph())
}

res.send('500 REGISTROS CREADOS');
*/

const mascotasCtrl = {};

mascotasCtrl.getMascotas = async (req, res) => {
    try {
        const { page, paginationMin, paginationMax } = req.query;
        
        let max = 0, min = 0;
        let pagination = [];
        
        let results = await conn.model('Mascotas').paginate({}, {select: '-createdAt -updatedAt', limit: 10, page});

        if (parseInt(paginationMin) > 0 && parseInt(paginationMax) > 0) {
            if ( results.totalPages <= 10 ){
                min = 1;
                max = results.totalPages;
            }else {
                if ( parseInt(page) >= parseInt(paginationMin) && parseInt(page) <= parseInt(paginationMax) ) {
                    min = parseInt(paginationMin);
                    max = parseInt(paginationMax);
                }else if (parseInt(page) > parseInt(paginationMax)) {
                    min = (parseInt(page) - 10 + 1);
                    max = parseInt(page);
                }else if (parseInt(page) < parseInt(paginationMin)) {
                    min = parseInt(page);
                    max = (parseInt(page) + 10) - 1;
                }
            }
            
            for (let index = min; index <= max; index++) {
                pagination.push(index);            
            }
        }
        
        let resultado = ({
            docs: results.docs,
            totalDocs: results.totalDocs,
            limit: results.limit,
            totalPages: results.totalPages,
            page: results.page,
            pagingCounter: results.pagingCounter,
            hasPrevPage: results.hasPrevPage,
            hasNextPage: results.hasNextPage,
            prevPage: results.prevPage,
            nextPage: results.nextPage,
            pagination: pagination
        });

        res.status(200).json({ status: 200, error: false, message: '', results: resultado});        

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

mascotasCtrl.getMascotaId = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await conn.model('Mascotas').findById({_id: id}, {createdAt: 0, updatedAt: 0});

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

mascotasCtrl.createMascota = async (req, res) => {  
    try {
        const newMascota = conn.model('Mascotas')(req.body);

        const results = await newMascota.save();
        
        res.status(200).json({ status: 200, error: false, message: '', results: {_id: results._id, nombre: results.nombre, descripcion: results.descripcion}});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }    
};

mascotasCtrl.updateMascota = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await conn.model('Mascotas').findByIdAndUpdate({_id: id}, req.body, {new: true, fields: '-createdAt -updatedAt'});

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }  
};

mascotasCtrl.deleteMascota = async (req, res) => {
    const { id } = req.params;

    try {        
        const results = await conn.model('Mascotas').findByIdAndDelete({_id: id}, {select: '_id nombre descripcion'});

        res.status(200).json({ status: 200, error: false, message: '', results});
        
    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = mascotasCtrl;