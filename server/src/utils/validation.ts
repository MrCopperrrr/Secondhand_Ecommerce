import { NextFunction, Request, Response } from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema.js' 

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await validations.run(req)
        const errors= validationResult(req)
        if(errors.isEmpty()){
          return next()
        }   
    const errorsObject = errors.mapped()
    const entityError: any = {}
    for (const key in errorsObject) {
    entityError[key] = errorsObject[key].msg
    }
        res.status(422).json({
            errors: entityError
        })
    }
}