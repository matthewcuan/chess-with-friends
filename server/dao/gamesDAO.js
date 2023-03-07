import mongodb from "mongodb";

const ObjectID = mongodb.ObjectID;

let games
// TODO: addGame, getPublicGames, getGamesByUserID

export default class GamesDAO {
    static async injectDB(conn) {
        if (games) {
          return
        }
        try {
          games = await conn.db("chess").collection("games")
        } catch (e) {
          console.error(`Unable to establish collection handles in gamesDAO: ${e}`)
        }
      }

    static async getPublicGames() {ß
      try {
        console.log("attempting to get public games")
        return await users.find({ type: "public" })
      } catch (e) {
        console.log("user not found")
        console.error(`Unable to find user: ${e}`)
        return { error: e }
      }ß
    }

    static async getUserGames(user, game) {

    }

    static async addGame(title, type, players, history) {
        // *attributes* 
        // saved: [public, private]
        // players: user ids of both players
        // history: array of fens
        try {
          const gameDoc = {
            title: title,
            type: type,
            players: players,
            history: history
          }
          console.log("adding game")
          return await games.insertOne(gameDoc)
        } catch (e) {
          console.error(`Unable to add game: ${e}`)
          return { error: e }
        }

    }
    
    static async getGame(user, game) {
        
    }
    static async updateGame(user, game) {
        
    }

    static async deleteGame(user, game) {
        
    }


}