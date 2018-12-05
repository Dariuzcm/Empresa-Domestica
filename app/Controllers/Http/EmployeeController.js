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
    async EmployeeList({params, view}){

    }
}

module.exports = EmployeeController
