import mongodb from "mongodb";

// TODO: injectDB, addGame, getPublicGames, getGamesByUserID

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

    static async addGame(user, game) {
        
    }

    static async getPublicGames() {

    }

    static async getGamesByUserID(user, game) {

    }

}