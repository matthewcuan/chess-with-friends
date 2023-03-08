import mongodb from "mongodb";
const objectID = (id) => new mongodb.ObjectId(id);

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

    static async getPublicGames() {
      try {
        console.log("attempting to get public games");
        const cursor = games.find({ type: "public" });
        return await cursor.toArray();
      } catch (e) {
        console.log("user not found")
        console.error(`Unable to find user: ${e}`)
        return { error: e }
      }
    }

    static async getUserGames(player) {
      try {
        console.log("attempting to get user games");
        const cursor = games.find({ players: player });
        return await cursor.toArray();
      } catch (e) {
        console.log("games not found")
        console.error(`Unable to find games: ${e}`)
        return { error: e }
      }
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
    
    static async getGame(id) {
      try {
        console.log("attempting to get game")
        return await games.findOne({ _id: objectID(`${id}`) })
      } catch (e) {
        console.log("game not found")
        console.error(`Unable to find game: ${e}`)
        return { error: e }
      }
    }

    // static async getGame(titleId) {
    //   try {
    //     console.log("getting")
    //     return await games.findOne({ title: titleId })
    //   } catch (e) {
    //     console.error(`Unable to get review: ${e}`)
    //     return { error: e }
    //   }
    // }

    static async updateGame(game, title) {
      try {
        const updateResponse = await games.updateOne(
          { _id: objectID(game) },
          { $set: { title: title } }
        )
        return updateResponse
      } catch (e) {
        console.error(`Unable to update game: ${e}`)
        return { error: e }
      }
    }

    static async deleteGame(gameId) {
      try {
        const deleteGame = await games.deleteOne({
          _id: objectID(gameId)
        })
  
        return deleteGame
      } catch (e) {
        console.error(`Unable to delete game: ${e}`)
        return { error: e }
      }
    }


}