const AstroData = require('../db/models/AstroData')
const axiosDefault = require('axios').default
const axios = axiosDefault.create({
    baseURL: 'https://api.nasa.gov/',
  });
const path = require('path')
const download = require('image-downloader')



class AstroService {
    getData = async (date) => {
        try {

            let checkIfDataExists = await AstroData.findOne({date})
            if(checkIfDataExists){
                return checkIfDataExists
            }
            let response = await axios.get('planetary/apod',{
                params:{
                    api_key:'DEMO_KEY',
                    date:date
                }
            })
            // save image
            if(response.data.media_type == "image"){
                let savedPath = await this.saveImage(response.data.url,path.parse(response.data.url).base)
                response.data.url = savedPath
            }
            // store in db
            let savedData = await AstroData.create(response.data)
            return savedData

        }
        catch (err) {
            console.log(err);
            throw err
        }
    }

    saveImage = async(imageUrl,imageName)=>{
        try{
        const options = {
            url: imageUrl,
            dest: `uploads/website/${imageName}`          
          }
          await download.image(options)
          return `uploads/website/${imageName}`
        }
        catch(err){
            throw err
        }
    }

   


}

module.exports = new AstroService()