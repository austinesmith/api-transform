import { FetchUserModel } from './interfaces/fetch-user';
import { PostUsersModel } from './interfaces/post-user';
import { transformUsers } from './transform-service';
const axios = require('axios').default; // provides autocomplete

/* globals */
const SOURCE_URL : string = 'https://jsonplaceholder.typicode.com/users';
const DESTINATION_URL : string = 'https://postman-echo.com/post';
const USERNAME : string = "austin@papiocloud.com";
const PASSWORD : string = "password";
const OUTPUT_TYPE : string = "Json";

/* get data */
const getUsers = async () : Promise<FetchUserModel[]> => {
  const result = await axios.get(SOURCE_URL);
  return result.data;
}

/* post data */
const postUsers = async (transformResult : PostUsersModel) => {
  const result = await axios.post(DESTINATION_URL, transformResult);
  return result;
}

/* transform data */
function transformData(fetchData : FetchUserModel[]) : PostUsersModel {
  return transformUsers(fetchData, USERNAME, PASSWORD, OUTPUT_TYPE);
}

/* main flow of the script: get -> transform -> post */
async function main() {
  const response : FetchUserModel[] = await getUsers();
  const result : PostUsersModel = transformData(response);
  const verdict = await postUsers(result);
  console.log(verdict.data);
}

/* script */
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
