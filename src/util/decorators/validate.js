import { decorate, invokedWithArgs } from "./util";
import { action } from "mobx";
import Joi from "joi-browser";

export const validate = joiSchema => {
  if (joiSchema && !joiSchema.isJoi) {
    throw new Error("you must provide a Joi schema");
  }
  return (target, _key, descriptor) => {
    const fn = descriptor.value;
    return {
      ...descriptor,
      @action
      value(attrs) {
        let resultAttrs = {};
        for (let key in attrs) {
          if (attrs.hasOwnProperty(key)) {
            let schema = Joi.reach(joiSchema, key);
            if (schema) {
              let result = schema.validate(attrs[key]);
              if (result.error === null) {
                resultAttrs[key] = result.value;
              } else {
                return Promise.reject(result.error);
              }
            } else {
              resultAttrs[key] = attrs[key];
            }
          }
        }
        return fn.apply(this, [resultAttrs]);
      }
    };
  };
};
