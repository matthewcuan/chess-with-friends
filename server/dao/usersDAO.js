import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectID

let users
// TODO: addUser, getUser, getAllUsers

export default class UsersDAO {
    static async injectDB(conn) {
      if (users) {
        return
      }
      try {
        users = await conn.db("chess").collection("users")
      } catch (e) { 
       console.error(`Unable to establish collection handles in userDAO: ${e}`)
      }
    }

    static async addUser(user, password) {
      try {
        const userDoc = {
          user: user,
          password: password
        }
        console.log("adding user")
        return await users.insertOne(userDoc)
      } catch (e) {
        console.error(`Unable to add user: ${e}`)
        return { error: e }
      }
    }

    static async getUser(user) {
      try {
        console.log("attempting to find user")
        return await users.findOne({ user: user })
      } catch (e) {
        console.log("user not found")
        console.error(`Unable to find user: ${e}`)
        return { error: e }
      }
    }

    static async updateUser(user, password) {
      try {
        const updateResponse = await users.updateOne(
          { user: user },
          { $set: { password: password } }
        )
        return updateResponse
      } catch (e) {
        console.error(`Unable to update user: ${e}`)
        return { error: e }
      }
    }

}