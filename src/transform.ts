import { AxiosResponse, AxiosError } from 'axios';
import { FetchUser } from './interfaces/fetch';
import { SendDataWrapper, SendDataUser } from './interfaces/post';
import { refineFirstName, refineLastName, composeAddress, refinePhoneNumber } from './string-service';
const axios = require('axios').default; // provides autocomplete

// globals
const SOURCE_URL : string = 'https://jsonplaceholder.typicode.com/users';
const DESTINATION_URL : string = ' https://dev.app.homecarepulse.com/Primary/?FlowId=7423bd80-cddb-11ea-9160-326dddd3e106&Action=api';
const USERNAME : string = "austin@papiocloud.com";
const PASSWORD : string = "Xibo4174@";
const OUTPUT_TYPE : string = "Json";

// fetch data

//async function getUsers() {
//  return await axios.get(`${SOURCE_URL}/users`)
//  .then((res: { data: User[]; }) => res.data)
//};

// get users
// async function fetchUsers() : Promise<FetchUser[]> {
//   const response = await axios.get(`${SOURCE_URL}/users`);
//   return response.data;
// }

// get data
const fetchUsers = async () : Promise<FetchUser[]> => {
  const result = await axios.get(`${SOURCE_URL}`);

  // console.log(result.ok);
  // console.log(result.status);
  // if (!result.ok) {
  //   throw Error("Error fetching from source");
  // }
  return result.data;
}

// post data
const sendResults = async (transformResult : SendDataWrapper) => {
  const result = await axios.post(`${DESTINATION_URL}`, transformResult);
  
  // console.log(result.ok);
  // if (!result.ok) {
  //   throw Error("Error posting to destination");
  // }
  return result;
}

// transform data
function transformData(fetchData : FetchUser[]) : SendDataWrapper {

  // declare array of users to send
  let updatedUsers: Array<SendDataUser> = [];

  // add each fetch data user to array
  for (let i=0; i<fetchData.length; i++) {

    // first create new user object with refined data
    var currentUser : SendDataUser = {
      first_name: refineFirstName(fetchData[i]['name']),
      last_name: refineLastName(fetchData[i]['name']),
      company_name: fetchData[i]['company']['name'],
      company_full_address: composeAddress(fetchData[i]['address']['street'], fetchData[i]['address']['city'], fetchData[i]['address']['zipcode']),
      website: fetchData[i]['website'],
      phone: refinePhoneNumber(fetchData[i]['phone'])
    }

    // then add user to array
    updatedUsers.push(currentUser);
  }
  // create user array wrapper
  const sendData : SendDataWrapper = {
    userid: `${USERNAME}`,
    password: `${PASSWORD}`,
    outputtype: `${OUTPUT_TYPE}`,
    users: updatedUsers
  }
  return sendData;
}

// 3 send results
// async function uploadResults(resultObject: SendDataWrapper) {
//   const response : AxiosResponse = await axios({
//     method: "put",
//     url: `${DESTINATION_URL}/users`,
//     data: resultObject
//   }).then((response : AxiosResponse) => {
//   })
//   .catch((error : AxiosError) => {
//     //console.log(error);
//   });
//   //console.log(JSON.stringify(resultObject));
// }

// send results
// const sendResults = async (transformResults : SendDataWrapper) => {
//   try {
//     // const result = await axios.put(`${DEST_URL}/users`);
//     const result = axios({
//       method: 'post',
//       url: `${DESTINATION_URL}/users`,
//       data: transformResults
//     });
//     // result.ok will return true boolean 200-209
//     console.log(result.ok);
//     console.log(result.status);
//     return result;
//   } catch (err) {
//     console.error(err);
//   }
// }

// const sendData = async (transformResult : SendDataWrapper) =>
// {
//   const result = await axios.post(`${DESTINATION_URL}/users`, transformResult)
//   .then(result => {
//     console.log(`statusCode: ${res.status}`)
//     console.log(res)
//   })
//   .catch(error => {
//     console.error(error)
//   })
// }

// send results

// main flow of the script: get -> transform -> post
async function main() {
  const response : FetchUser[] = await fetchUsers();
  const result : SendDataWrapper = transformData(response);
  const verdict = await sendResults(result);
  console.log(verdict.data);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
