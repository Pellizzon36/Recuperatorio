import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const fileRecetas = await readFile('./recetas.json', 'utf-8')
const recData = JSON.parse(fileRecetas)

const  router = Router()

//solicitudes con el método GET para consultar datos.

router.get('/:id', (req, res)=>{
    const RecID = req.params.id
    const result = recData.find(e => e.id == RecID)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json(`${RecID} no se encuentra`)
    }
})

//solicitudes con el método POST para consultar datos.

router.post('/nombre',(req,res)=>{
    const name = req.body.nombre

    const result = recData.find(e => e.nombre == name)
    if(result){
        res.status(200).json(`Los Ingredientes Son: ${result.ingredientes}`)
    }else{
        res.status(400).json(`${name} no existe`)
    }
})

//POST para Crear Recetas

router.post('/CrearReceta', (req, res)=>{
    const rec = req.body.newrec
    recData.push(rec)
    writeFile('./recetas.json', JSON.stringify(recData,null,2))
    res.status(200).json('Receta Añadida')
}) 

//solicitud con el método DELETE para eliminar recetas

router.delete('/recetas/delete/:receID', (req,res)=>{
    const id = req.params.receID

    try{
        const index = recData.findIndex(e => e.id == id)
        if(index != -1){
            recData.splice(index,1)
            writeFile('./recetas.json', JSON.stringify(recData,null,2))
            res.status(200).json('Se Elimino la receta')
        }else{
            res.status(400).json('La receta no se pudo Eliminar')
        }
    }catch(error){
        res.send(500).json('Error en los datos')    
    }
})

//solicitudes con el método PUT para actualizar la Cantidad.

router.put('/cantidad/update/:nombre', (req,res)=>{
    const nombrerec = req.params.nombre
    const newcant = req.body.ingredientes.cantidad
    const recid = req.body.id

    try{
        const index = recData.findIndex(e => e.nombre == nombrerec && e.ingredientes.id == recid)
        if(index != -1){
            recData[index].ingredientes.cantidad = newcant
            writeFile('./recetas.json', JSON.stringify(recData,null,2))
            res.status(200).json('El Cantidad se Actualizo Correctamente')
        }else{
            res.status(400).json('El Cantidad no se pudo actualizar')
        }
    }catch(error){
        res.send(500).json('Error en los datos')    
    }
})

export default router