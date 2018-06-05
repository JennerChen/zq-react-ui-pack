export function invokedWithArgs(args) {
  return (
    args.length !== 3 ||
    typeof args[0] !== "object" ||
    typeof args[1] !== "string" ||
    typeof args[2] !== "object"
  );
}

export function decorate(withArgs, decorator, args) {
  return withArgs ? decorator : decorator(...args);
}
