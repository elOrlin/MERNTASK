const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')
const {validationResult} = require('express-validator');

exports.crearTarea = async (req, res) => {

    const errores = validationResult(req);

    if(!errores.isEmpty() ){
       return res.status(400).json({errores: errores.array() })
    }

    //extraer el proyecto y comprobar si existe
    const {proyecto} = req.body;

    try{
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto){
            return res.status(400).json('Proyecto no encontrado')
        }

    //revisar si el proyecto actual pertenece al usuario autenticado
      if(existeProyecto.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg: 'No autorizado'})
     }

     //Creamos la tarea
     const tarea = new Tarea(req.body)

     await tarea.save()
     res.json({tarea})

    }catch(error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }
 
}

exports.obtenerTarea = async (req, res) => {

    try{
        const {proyecto} = req.query;

        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto){
            return res.status(400).json('Proyecto no encontrado')
        }

    //revisar si el proyecto actual pertenece al usuario autenticado
      if(existeProyecto.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg: 'No autorizado'})
     }

     //Obtener tareas por proyecto
     const tarea = await Tarea.find({proyecto}).sort({creado: -1});
     res.json({tarea})

    }catch(error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}   

exports.actualizarTarea = async (req, res) => {
    try{
        const {proyecto, nombre, estado} = req.body;

        let tarea = await Tarea.findById(req.params.id)

        if(!tarea){
            res.status(404).json({msg: 'No existe esa tarea'})
        }

        const existeProyecto = await Proyecto.findById(proyecto)

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
         }

        //Crear proyecto con la nueva informacion
        const nuevaTarea = {};
        if(nombre) nuevaTarea.nombre = nombre;
        if(estado) nuevaTarea.estado = estado;

        //guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true})
        res.json({tarea})

    }catch(error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//eliminar tareas
exports.eliminarTarea = async (req, res) => {
    try{
        const {proyecto} = req.query;

        let tarea = await Tarea.findById(req.params.id)

        if(!tarea){
            res.status(404).json({msg: 'No existe esa tarea'})
        }

        const existeProyecto = await Proyecto.findById(proyecto)

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
         }

         //Eliminar tarea
         await Tarea.findByIdAndRemove({_id: req.params.id})
         res.json({msg: 'Tarea eliminada'})

    }catch(error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}