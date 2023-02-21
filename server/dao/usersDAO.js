import mongodb from 'mongodb';

// TODO: injectDB, addUser, getUser

export default class UsersDAO {
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

    static async addUser(username, password) {
        
    }

    static async getAllUsers() {
        
    }

    static async getUser(username) {

    }

}