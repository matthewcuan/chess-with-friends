import mongodb from "mongodb";

// TODO: addGame, getPublicGames, getGamesByUserID

export default class GamesDAO {
    static async injectDB(conn) {
        if (reviews) {
          return
        }
        try {
          reviews = await conn.db("reviews").collection("reviews")
        } catch (e) {
          console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
      }

    static async getPublicGames() {

    }

    static async getUserGames(user, game) {

    }

    static async addGame(user, game) {
        // *attributes* 
        // saved: [public, private]
        // players: user ids of both players
        // history: array of fens

    }
    
    static async getGame(user, game) {
        
    }
    static async updateGame(user, game) {
        
    }

    static async deleteGame(user, game) {
        
    }


}