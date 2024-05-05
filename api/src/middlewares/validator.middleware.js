import { createError } from '../useful/error.js'

// The schema and also the middleware variables must be passed as parameters.
export const validateSchema = (schema) => (req, res, next) => {
  // If validation with the schema fails, the server goes down. To better handle that situation you have to use try - catch, as shown in the code to handle errors.
  try {
    schema.parse(req.body)
    next()
  } catch (err) {
    // When the scheme fails, it returns an error, which has a peculiar form. The best way to handle the above errors is as shown in the code.
    // Returning the errors.
    // return next(createError(400, `${err.errors.map((error) => error.message)}!`))
    return next(createError(400, `${err.errors[0].message}!`))
  }
}
