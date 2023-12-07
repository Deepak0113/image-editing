import { databaseFunctionTest } from "./database.test";
import { imageToHashTesting } from "./imageToHash.test";
import { mongoDBTesting } from "./mongoDb.test";

imageToHashTesting();
databaseFunctionTest();
mongoDBTesting();
