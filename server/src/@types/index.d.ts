declare global{
  namespace Express {
    interface Request {
        userId: string,
    }
  }
}

export {}; // the file needs to be a module: https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html