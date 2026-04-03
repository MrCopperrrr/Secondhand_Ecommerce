import { checkSchema } from "express-validator";

export const createProductValidator = checkSchema({
    name: {
        notEmpty: true,
        isString: true,
        trim: true,
    },
    price: {
        isNumeric: true,
        custom: {
            options: (value) => {
                if (value < 0) throw new Error('Giá không được âm')
                return true
              }
        },
    },
    category: {
        notEmpty: true
    }
}, ['body'])