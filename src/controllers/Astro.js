const AstroService = require('../services/Astro')
const moment = require('moment')

class AstroController {
    getData = async(req,res)=>{
        try{
        let inputDate = req.query.date || moment().format('YYYY-MM-DD')
        let data = await AstroService.getData(inputDate)
        res.render('astro',{data})
        }
        catch(err){
            res.json({error:err})
        }
    }

}

module.exports = new AstroController()