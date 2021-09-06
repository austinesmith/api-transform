import { FetchUserModel } from './interfaces/fetch-user';
import { PostUserModel, PostUserModelUser } from './interfaces/post-user';
import { transformUsers } from './transform-service';
const axios = require('axios').default; // provides autocomplete

/* globals */
const SOURCE_URL : string = 'https://jsonplaceholder.typicode.com/users';
const DESTINATION_URL : string = 'https://dev.app.homecarepulse.com/Primary/?FlowId=7423bd80-cddb-11ea-9160-326dddd3e106&Action=api';
const USERNAME : string = "austin@papiocloud.com";
const PASSWORD : string = "Xibo4174@";
const OUTPUT_TYPE : string = "Json";

/* get data */
const getUsers = async () : Promise<FetchUserModel[]> => {
  const result = await axios.get(SOURCE_URL);
  return result.data;
}

/* post data */
const postUsers = async (transformResult : PostUserModel) => {
  const result = await axios.post(DESTINATION_URL, transformResult);
  return result;
}

/* transform data */
function transformData(fetchData : FetchUserModel[]) : PostUserModel {
  return transformUsers(fetchData, USERNAME, PASSWORD, OUTPUT_TYPE);
}

/* main flow of the script: get -> transform -> post */
async function main() {
  const response : FetchUserModel[] = await getUsers();
  const result : PostUserModel = transformData(response);
  const verdict = await postUsers(result);
  console.log(verdict.data);
}

/* script */
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
