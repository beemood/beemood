export type JsonArray = Array<JsonValue>;

export type JsonValue =
  | string
  | number
  | boolean
  | JsonObject
  | JsonArray
  | null;

export type JsonObject = {
  [key: string]: JsonValue;
};
