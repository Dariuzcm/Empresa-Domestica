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
    
Route.get('login',({view})=>{return view.render('user.login')})    
Route.post('login','UserController.login')


