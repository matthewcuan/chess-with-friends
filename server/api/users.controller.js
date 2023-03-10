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
            const userResponse = await UsersDAO.addUser(
                user,
                password
            )

            var { error } = userResponse
            if (error) {
              res.status(400).json({ error })
            }
            
            res.json({ status: "success" })       
        } catch (e) {
            res.status(500).json({ error: e.message })
        } 
    }    
    
    static async apiUpdateUser(req, res, next) {
        try {
            const user = req.params.id
            const old_password = req.body.old_password
            const new_password = req.body.new_password
      
            const userInfo = await UsersDAO.getUser(user)
            console.log(userInfo.password);
            console.log(old_password)
            if (old_password === userInfo.password) {
                const userResponse = await UsersDAO.updateUser(
                    user,
                    new_password
                  )

                var { error } = userResponse
                if (error) {
                    res.status(400).json({ error })
                }
      
                if (userResponse.modifiedCount === 0) {
                    throw new Error(
                  "unable to update user",
                )
            }} else {
                throw new Error(
                    "incorrect password",
                )
            }
      
            res.json({ status: "success" })
          } catch (e) {
            res.status(500).json({ error: e.message })
          }
    }

}