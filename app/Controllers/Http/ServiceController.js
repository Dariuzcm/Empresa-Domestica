'use strict'
const Service= use('App/Models/Service')
class ServiceController {
    async getServices({view}){
        const service = await Service.all()
      
        if(await Service.getCount() >0){
            return view.render('service.list',{services: service.toJSON(), flag:true })
        }else
            return view.render('service.list',{services: service.toJSON(), flag:false })
    }
 
    async getEditService({view, params}){
        const service= await Service.query()
                .where('id', params.id)
                .fetch()
            return view.render('service.edit',{service:service.toJSON()})

    }
    async AddService({request,response,session}){
        const service = Service.create({
            name: request.input('name'),
            description: request.input('description'),
            price: request.input('price'),
        })
        try {
            await service.save()
            session.flash({
                notification:{
                    type: 'success',
                    message: 'Servicio Registrado Exitosamente',
                }
            })
        } catch (error) {
            session.flash({
                notification:{
                    type: 'danger',
                    message: 'Algo va mal: '+error,
                    service: service.toJSON()
                }
            })
            return response.redirect('back')
        }
        return response.redirect('/servicios/list')
    }

    async update({ request, response, session, params }) {
        const service = await Service.find(params.id)
        service.name = request.input('name')
        service.description= request.input('description')
        service.price=request.input('price')
        try {
            await service.save()
            session.flash({
                notification:{
                    type: 'success',
                    message: 'Servicio Actualizado Exitosamente',
                }
            })
        } catch (error) {
            session.flash({
                notification:{
                    type: 'danger',
                    message: 'Algo va mal: '+error,
                    service: service.toJSON()
                }
            })
            return response.redirect('back')
        }
        return response.redirect('/servicios/list')
    }
    async index({view}){
        const nameService= await Service.query()
        .select('name','id')
        .fetch()
        return view.render('index',{nameService: nameService.toJSON()})
    }
}
module.exports = ServiceController
