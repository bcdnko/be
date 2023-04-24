export type JsonValue = string | number | boolean | JsonObject | JsonArray;

export interface JsonObject {
  [x: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> { }
