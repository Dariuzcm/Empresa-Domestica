'use strict'
const Contract=use('App/Models/Contract')
const Employee= use('App/Models/Employee')
const Service = use('App/Models/Service')
class ContractController {
    async makeContract({request,session,response}){
        const employ= await Employee.query().orderBy('enCola','asc').first()
        const contract = await Contract.create({
            client_name: request.input('client_name'),
            client_address:request.input('client_address'),
            petition_date:request.input('petition_date'),
            id_employ: employ.id
                })
                try {
                    await user.save()
                    session.flash({
                        notification: {
                            type: 'success',
                            message: 'Compra Registrada exitosamente el dia '+contract.petition_date+' llegara el Siguente Empleado:'
                        }
                    })
                } catch (error) {
                    session.flash({
                        notification: {
                            type: 'danger',
                            message: 'Algo va mal:' + error,
                            contract: contract.toJSON()
                        }
                    })
                    return response.redirect('/service/contract/', { 
                        employ: employ.toJSON(), 
                        date: petition_date ,
                        service: service.toJSON()
                    })
        
                }

    }
}

module.exports = ContractController
