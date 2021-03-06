'use strict'
const Hash = use('Hash')
const User = use('App/Models/User')

class UserController {
    async getForm({ view }) {
        return view.render('user.registration')
    }
    async getEditionForm({ view, params }) {
        const user = await User.query().where('id', params.id).fetch()
        return view.render('user.edition', { user: user.toJSON() })
    }
    async UserList({ view }) {
        const user = await User.all()
        if(await User.getCount()>0)
         return view.render('user.userList', { users: user.toJSON(), flag:true })
        else 
        return view.render('user.userList', { users: user.toJSON(), flag:false })
    }
    //----------------------------Login----------------
    async login({ request, auth, session, response }) {
        const email = request.input('email')
        const password = request.input('password')
        const { remember } = request.all()
   
        const user = await User.query()
            .where('email',email)
            .first()
        if(user){
            const passwordVerified = await Hash.verify(password, user.password)
           
            if (passwordVerified) {
                await auth.remember(!!remember).login(user)
                return response.route('/')
            }
        }
            session.flash({
                notification: {
                    type: 'danger',
                    message: 'Error al ingresar con usuario ' + email + ' no existe o contraseña es incorrecta',
                }
            })
            
        
        return response.route('login')

    }

    async logout({ response, auth }) {
        await auth.logout()
        response.redirect('/')
    }
    //-------------Registro----------------------
    async registry({ request, session, response }) {
        const { username, email, password } = request.all()
        var user
        try {
            user = await User.create({
                username: username,
                email: email,
                password: password
            })
        } catch (error) {
            session.flash({
                notification: {
                    type: 'warning',
                    message: 'Usuario : <strong>' + username + '</strong> ya existe',
                }
            })
            return response.redirect('back')
        }

        try {
            await user.save()
            session.flash({
                notification: {
                    type: 'success',
                    message: 'Usuario Registrado exitosamente'
                }
            })
        } catch (error) {
            session.flash({
                notification: {
                    type: 'danger',
                    message: 'Algo va mal:' + error,
                }
            })
            return response.redirect('back', { user: user.toJSON() })

        }
        return response.redirect('back')
    }
    //--------------update
    async update({ request, response, session, params }) {
        const user = await User.find(params.id)
        user.username = request.input('username')
        user.email = request.input('email')
        user.password = request.input('password')
        try {
            await user.save()
            session.flash({
                notification: {
                    type: 'success',
                    message: 'Usuario Actualizado exitosamente'
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
        return response.redirect('/usuarios/list')
    }
    async destroy({ response, params, session }) {
        const user = await User.find(params.id)
        await user.delete()
        session.flash({
            notification: {
                type: 'warning',
                message: '<strong>Usuario Eliminado<strong>'
            }
        })
        return response.redirect('back')

    }


}

module.exports = UserController
