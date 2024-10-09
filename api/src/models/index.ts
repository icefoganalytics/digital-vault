import db from "@/db/db-client"

// Models
import User from "@/models/user"

db.addModels([
  User,
])

// Lazy load scopes
User.establishScopes()

export {
  User,
}

// Special db instance will all models loaded
export default db
