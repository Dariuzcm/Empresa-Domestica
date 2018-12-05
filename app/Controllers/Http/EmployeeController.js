'use strict'
const Employee = use('App/Models/Employee')

class EmployeeController {

    async addEmployee({request, session, response}){
        const  {name,address,email,phone,adscription,borningDate}=request.all()
        const employee= await Employee.create({
           name: name,
           address: address,
           email: email,
           phone: phone,
           adscription: adscription,
           borningDate:borningDate
        })
        try {
            await employee.save()
           
        } catch (error) {
            session.flash({
                notification:{
                    type: 'danger',
                    message: 'Algo va mal: '+error,
                    employee: employee.toJSON()
                }
            })
            return response.redirect('back')
        }
        return response.redirect('/employee/list')
    }
    async EmployeeList({view}){
        const employee= await Employee.all()
        return view.render('employee.list',{employees: employee.toJSON()})
    }
    async getEmployee({params,view}){
        const employee= await Employee.query().where('id',params.id).fetch()
        return view.render('employee.edit',{employees: employee.toJSON()})

    }
    async update({ request, response, session, params }) {

        const employee = await Employee.find(params.id)
        employee.name = request.input('name')
        employee.email = request.input('email')
        employee.phone = request.input('phone')
        employee.address = request.input('address')
        employee.adscription = request.input('adscription')
        employee.borningDate = request.input('borningDate')
        try {
            await employee.save()
            session.flash({
                notification: {
                    type: 'success',
                    message: 'Empleado Actualizado exitosamente'
                }
            })
        } catch (error) {
            session.flash({
                notification: {
                    type: 'danger',
                    message: 'Algo va mal:' + error,
                }
            })
            console.log(error)
            return response.redirect('back')
        }
        return response.redirect('/empleados/list')
    }
    async destroy({ response, params, session }) {
        const employee = await Employee.find(params.id)
        await employee.delete()
        session.flash({
            notification: {
                type: 'warning',
                message: '<strong>Empleado Eliminado<strong>'
            }
        })
        return response.redirect('/empleados/list')
    }
}

module.exports = EmployeeController
