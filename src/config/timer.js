export const timer = (func) =>
  setTimeout(() => {
    func()
  }, 3000)
