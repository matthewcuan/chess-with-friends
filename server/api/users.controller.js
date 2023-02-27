import UsersDAO from "../dao/usersDAO.js";

export default class UserController {

    static async apiGetUser(req, res, next) {
        try {
            let id = req.params.id || {}
            let user = await UsersDAO.getUser(id)
            if (!user) {
              res.status(404).json({ error: "Not found" })
              return
            }
            res.json(user)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiPostUser(req, res, next) {
        try {
            const user = req.body.username
            const password = req.body.password
            let exists = await UsersDAO.getUser(user)
            console.log('user', user)
            if (exists) {
                console.error(`That username (${user}) already exists.`)
                res.json("user already exists")
                return ;
            }
            const reviewResponse = await UsersDAO.addUser(
                user,
                password
            )
            res.json({ status: "success" })       
        } catch (e) {
            res.status(500).json({ error: e.message })
        } 
    }       

}