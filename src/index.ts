import { AxiosResponse, AxiosError } from 'axios';
import { FetchUser } from './interfaces/fetch';
import { SendDataWrapper, SendDataUser } from './interfaces/post';
import { refineFirstName, refineLastName, composeAddress, refinePhoneNumber } from './string-service';
const axios = require('axios').default; // provides autocomplete

// globals
const SOURCE_URL : string = 'https://jsonplaceholder.typicode.com';
const DESTINATION_URL : string = 'https://jsonplaceholder.typicode.com';

// 1 fetch data

//async function getUsers() {
//  return await axios.get(`${SOURCE_URL}/users`)
//  .then((res: { data: User[]; }) => res.data)
//};

// get users
async function fetchUsers() : Promise<FetchUser[]> {
  const response = await axios.get(`${SOURCE_URL}/users`);
  return response.data;
}

// 2 transform data
function transformData(fetchData : FetchUser[]) : SendDataWrapper {
  // declare array of users to send
  let updatedUsers: Array<SendDataUser> = [];

  // add each fetch data user to send array
  for (let i=0; i<fetchData.length; i++) {
    // create new user object with refined data
    var currentUser : SendDataUser = {
      first_name: refineFirstName(fetchData[i]['name']),
      last_name: refineLastName(fetchData[i]['name']),
      company_name: fetchData[i]['company']['name'],
      company_full_address: composeAddress(
        fetchData[i]['address']['street'], 
        fetchData[i]['address']['city'], 
        fetchData[i]['address']['zipcode']
        ),
      website: fetchData[i]['website'],
      phone: refinePhoneNumber(fetchData[i]['phone'])
    }
    // add user to array
    updatedUsers.push(currentUser);
    //console.log(nameString.split(' ')[0]);
    //console.log(nameString.split(' ')[(nameString.split(' ').length)-1])
    //console.log();
  }
  // create user array wrapper
  const sendData : SendDataWrapper = {
    userid: 'austin@papiocloud.com',
    password: 'secret',
    outputtype: 'Json',
    users: updatedUsers
  }
  return sendData;
}

// 3 send results
async function uploadResults(resultObject: SendDataWrapper) {
  const response : AxiosResponse = await axios({
    method: "put",
    url: `${DESTINATION_URL}/users`,
    data: resultObject
  }).then((response : AxiosResponse) => {
  })
  .catch((error : AxiosError) => {
    //console.log(error);
  });
  //console.log(JSON.stringify(resultObject));
}

// send results
const sendResults = async (transformResults : SendDataWrapper) => {
  try {
    // const result = await axios.put(`${DEST_URL}/users`);
    const result = axios({
      method: 'post',
      url: `${DESTINATION_URL}/users`,
      data: transformResults
    });
    // result.ok will return true boolean 200-209
    //console.log(result.ok);
    //console.log(result.status);
    return result;
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const response : FetchUser[] = await fetchUsers();
  //console.log(response);
  const results : SendDataWrapper = transformData(response);
  // uploadResults(results);
  sendResults(results).then((data) => console.log(data.ok));
  //console.log( results );
  //console.log( results['data'] );
  //console.log(results);
}

main();
