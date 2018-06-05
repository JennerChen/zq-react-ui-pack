import { decorate, invokedWithArgs } from "./util";
import { action, extendObservable } from "mobx";

function getDecorator(withArgs, lockName) {
  return (target, key, descriptor) => {
    if (!withArgs) {
      lockName = `__${Math.random()
        .toString(32)
        .slice(2, 8)}`;
    }
    const fn = descriptor.value;

    if (withArgs && typeof target[lockName] !== "boolean") {
      extendObservable(target, {
        [lockName]: false
      });
    }

    return {
      ...descriptor,
      /**
       * @param params { * }
       * @return {undefined | Promise}
       */
      @action
      value(...params) {
        if (this[lockName]) {
          return undefined;
        }
        let result = fn.apply(this, [...params]);
        if (result instanceof Promise) {
          action(`${lockName}-lock`, () => {
            this[lockName] = true;
          })();
          return result
            .then(
              action(`${lockName}-unlock`, res => {
                this[lockName] = false;
                return Promise.resolve(res);
              })
            )
            .catch(
              action(`${lockName}-unlock`, e => {
                this[lockName] = false;
                return Promise.reject(e);
              })
            );
        } else {
          return result;
        }
      }
    };
  };
}

export const onlyOneReq = function(lockName) {
  const withArgs = invokedWithArgs(arguments);
  const decorator = getDecorator(withArgs, lockName);
  return decorate(withArgs, decorator, arguments);
};
