'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index')
//--------------login-------------------
Route.group(()=>{
    Route.get('register','UserController.getForm')
    Route.post('register','UserController.registry')
    Route.get('list','UserController.UserList')
    Route.get('edit/:id','UserController.getEditionForm')
    Route.put('edit/:id','UserController.update')
    Route.delete('list/:id','UserController.destroy')
}).prefix('usuarios')
    
Route.get('admin',({view})=>{return view.render('user.login')})    
Route.post('admin','UserController.login')
Route.get('logout','UserController.logout')

//--------Employees---------------
Route.group(()=>{
    Route.get('list','EmployeeController.EmployeeList')   
    Route.post('register','EmployeeController.addEmployee') 
    Route.get('register',({view})=>{return view.render('employee.empform')}) 
    Route.get('edit/:id','EmployeeController.getEmployee')
    Route.put('edit/:id','EmployeeController.update')
    Route.delete('list/:id','EmployeeController.destroy')
}).prefix('empleados')
//------------Services-------------------
Route.group(()=>{
    Route.get('list','ServiceController.getServices')
    Route.post('register','ServiceController.AddService') 
    Route.get('register',({view})=>{return view.render('service.form')}) 
    Route.get('edit/:id','ServiceController.getEditService')
    Route.put('edit/:id','ServiceController.update')
    Route.delete('list/:id','ServiceController.destroy')
}).prefix('servicios')