import GamesDAO from "../dao/gamesDAO";

export default class GamesController {
    // gets all publicly saved games (public tag)
    // to be displayed on login page
    static async apiGetPublicGames(req, res, next) {

    }
    
    // gets all users and publicly saved games
    // to be displayed on user home page
    static async apiGetUserGames(req, res, next) {

    }
    
    // posts/saves recently played game
    // option for public or private save
    static async apiPostGame(req, res, next) {

    }
    
    // gets a single game
    // to be displayed when accessing saved game
    static async apiGetGame(req, res, next) {

    }
    
    // updates game description
    static async apiUpdateGame(req, res, next) {

    }

    // deletes game from db
    static async apiDeleteGame(req, res, next) {

    }

}