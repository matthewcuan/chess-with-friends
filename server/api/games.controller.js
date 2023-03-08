import GamesDAO from "../dao/gamesDAO.js";

export default class GamesController {
    // gets all publicly saved games (public tag)
    // to be displayed on login page
    static async apiGetPublicGames(req, res, next) {
        try {
            let games = await GamesDAO.getPublicGames()
            if (!games) {
              res.status(404).json({ error: "Not found" })
              return
            }
            res.json(games)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
    
    // gets all users and publicly saved games
    // to be displayed on user home page
    static async apiGetUserGames(req, res, next) {

    }
    
    // posts/saves recently played game
    // option for public or private save
    static async apiPostGame(req, res, next) {
        try {
            const title = req.body.title
            const type = req.body.type
            const players = req.body.players
            const history = req.body.history
            console.log('title', title)
            const reviewResponse = await GamesDAO.addGame(
                title,
                type,
                players,
                history
            )
            res.json({ status: "success" })     
        } catch (e) {
            res.status(500).json({ error: e.message })
        } 
    }
    
    // gets a single game
    // to be displayed when accessing saved game
    static async apiGetGame(req, res, next) {
        try {
            let id = req.params.id || {}
            let game = await GamesDAO.getGame(id)
            console.log(id)
            if (!game) {
              res.status(404).json({ error: "Not found" })
              return
            }
            res.json(game)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
    
    // updates game description
    static async apiUpdateGame(req, res, next) {

    }

    // deletes game from db
    static async apiDeleteGame(req, res, next) {

    }

}