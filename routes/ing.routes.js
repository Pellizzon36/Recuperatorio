import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const fileIngredientes = await readFile('./ingredientes.json', 'utf-8')
const ingData = JSON.parse(fileIngredientes)

const  router = Router()

//solicitudes con el método GET para consultar datos.

router.get('/:id', (req, res)=>{
    const IngID = req.params.id
    const result = ingData.find(e => e.id == IngID)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json(`${IngID} no se encuentra`)
    }
})

//solicitudes con el método POST para consultar datos.

router.post('/nombre',(req,res)=>{
    const name = req.body.nombre
    const result = ingData.find(e => e.nombre == name)
    
    if(result){
        res.status(200).json(`Hay ${result.cantidad} ${result.unidad} de ${result.nombre}`)
    }else{
        res.status(400).json(`${name} no existe`)
    }
})

//POST para Crear Ingredientes

router.post('/Crearingrediente', (req, res)=>{
    const ing = req.body.newing
    ingData.push(ing)
    writeFile('./ingredientes.json', JSON.stringify(ingData,null,2))
    res.status(200).json('Ingrediente Añadido')
}) 

//solicitudes con el método PUT para actualizar la Cantidad.

router.put('/cantidad/update/:nombre', (req,res)=>{
    const nombreing = req.params.nombre
    const newcant = req.body.cantidad

    try{
        const index = ingData.findIndex(e => e.nombre == nombreing)
        if(index != -1){
            ingData[index].cantidad = newcant
            writeFile('./ingredientes.json', JSON.stringify(ingData,null,2))
            res.status(200).json('El Cantidad se Actualizo Correctamente')
        }else{
            res.status(400).json('El Cantidad no se pudo actualizar')
        }
    }catch(error){
        res.send(500).json('Error en los datos')    
    }
})

export default router