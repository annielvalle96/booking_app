// Importing the jsonwebtoken library to work with the Tokens.
import jwt from 'jsonwebtoken'

// Creating the Token with my Secret Key. This Token will expire after 1 hours.
export const createToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_TOKEN_KEY, { expiresIn: 60 * 60 * 1 }, (error, token) => { error ? reject(error) : resolve(token) })
  })
}
