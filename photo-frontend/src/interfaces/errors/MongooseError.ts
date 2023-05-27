export interface MongooseError {
  data: {
    [key: string]: {message: string}
  }
}