import { AxiosResponse, AxiosError } from 'axios';
import { config } from 'process';
import zipState from 'zip-state';

// axios.<method> will now provide autocomplete and parameter typings
const axios = require('axios').default;

//
const SOURCE_URL : string = 'https://jsonplaceholder.typicode.com';
const DEST_URL : string = 'https://jsonplaceholder.typicode.com';

//const instance = axios.create({
//	baseURL: 'https://jsonplaceholder.typicode.com/users',
//	timeout: 30000,
//});

//const responseBody = (response: AxiosResponse) => response.data;

//fetch('https://jsonplaceholder.typicode.com/users')
//  .then(response => response.json())
//  .then(data => console.log(data));

// GET
//axios({
//    method: 'get',
//    url: 'https://jsonplaceholder.typicode.com/users',
//  });
  
// POST
//axios({
//    method: 'post',
//    url: '/login',
//    data: {
//      firstName: 'shedrack',
//      lastName: 'akintayo'
//    }
//  });
interface ServerResponse {
  data: IFetchUser;
}

interface IFetchUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    }
  }
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

interface IPostUsers {
  userid: string;
  password: string;
  outputtype: string;
  users: {
    first_name: string;
    last_name: string;
    company_name: string;
    company_full_address: string;
    website: string;
    phone: number;
  }
  // ...
}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    }
  }
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

//axios.get(`${SOURCE_URL}/users`)
//  .then((response: AxiosResponse) => {
//    (console.log('~DATA~'));
//    (console.log(response.data));
//    (console.log('~DATA~'));
//    (console.log(response.status));
//    (console.log(response.statusText));
//    (console.log(response.headers));
//    (console.log(response.config));
    //(JSON.parse(response.data));

    
//    (console.log(response.request));
//  })
//  .catch((error: AxiosError) => {
//    (console.log(error.message));
//  });
//.then((response) => {
//  console.log(response)});

//const responseData = axios.get(`${SOURCE_URL}/users`).data;
//console.log(responseData);

//const handleResponse = (response: AxiosResponse) => {
//  console.log(response.data);
//}

//axios.get(`${SOURCE_URL}/users`)
//.then(handleResponse);

// async

//const fetchUsers = async () => {
//  try {
//      const {response} = await axios.get(`${SOURCE_URL}/users`);
//      console.log(response.data);
//      return response
//  } catch (error) {
//      console.error(error);
//  }
//};

//post data
interface result {
  data: resultwrapper;
}
interface resultwrapper {
  userid: string;
  password: string;
  outputtype: string;
  users: resultusers[];
}
interface resultusers {
  first_name: string;
  last_name: string;
  company_name: string;
  company_full_address: string;
  website: string;
  phone: string;
}
//post data

//async function getUsers() {
//  return await axios.get(`${SOURCE_URL}/users`)
//  .then((res: { data: User[]; }) => res.data)
//};

async function fetchUsers() : Promise<User[]> {
  const response = await axios.get(`${SOURCE_URL}/users`);
  return response.data;
}

function transformData(entryObject : User[]) : result {
  let updatedUsers: Array<resultusers> = [];
  for (let i=0; i<entryObject.length; i++) {
    // compose name strings
      // the first word is split from the string and added as the first name
      // the final word is split from the string and added as the last name
    var nameString : string = entryObject[i]['name'];
    nameString = nameString.replace(/^Mr\.|Mrs\.|Ms\./, '').trim();
    nameString = nameString.replace(/\W*\b\w{1,1}\b/, "").trim();
    console.log(nameString);
    var firstNameString : string = nameString.split(' ')[0];
    var lastNameString : string = nameString.split(' ')[(nameString.split(' ').length)-1];
    // compose address string
      // company addresses do not exist in the original data set,
      // there is only the home address of the individual,
      // but i will assume home address is to be used for now and confirm later
    var zipCode : string = entryObject[i]['address']['zipcode'].replace(/[^0-9\d\s']/gi, ' ').split(" ")[0];
    var state : string | null = zipState(zipCode);//zipcodes.lookup(zipCode)['state'];
    console.log(zipCode);
    var companyAddressString : string = 
      entryObject[i]['address']['street'] + ", " +
      entryObject[i]['address']['city'] + ", " +
      state + ", " +
      zipCode;
    console.log(companyAddressString);
    // compose phone string
      // phone numbers should always be kept as a string, 
      // it is almost never a good idea to store a phone number as an integer
    var phoneString : string = entryObject[i]['phone'];
    phoneString = phoneString.replace(/[^0-9\d\s']/gi, '');
    var phoneStrings : string[] = phoneString.split(" ");
    for(let i=0; i<phoneStrings.length; i++) {
      if(phoneStrings[i].length == 10) {
        phoneString = phoneStrings[i];
        break;
      } else if (phoneStrings[i].length == 11 && (phoneStrings[i].charAt(0) == '0' || phoneStrings[i].charAt(0) == '1')) {
        phoneString = phoneStrings[i].substring(1);
        break;
      }
    }
    console.log(phoneString);
    // create new object and store updated values
    var current : resultusers = {
      first_name: firstNameString,
      last_name: lastNameString,
      company_name: entryObject[i]['company']['name'],
      company_full_address: companyAddressString,
      website: entryObject[i]['website'],
      phone: phoneString
    }
    console.log(nameString.split(' ')[0]);
    console.log(nameString.split(' ')[(nameString.split(' ').length)-1])
    console.log();
    updatedUsers.push(current);
  }
  let newData : resultwrapper = {
    userid: 'austin@papiocloud.com',
    password: 'secret',
    outputtype: 'Json',
    users: updatedUsers
  }
  let newJSON : result = {
    data: newData
  }
  return newJSON;
}

// post will add duplicates so put is chosen
async function uploadResults(resultObject: result) {
  const response : AxiosResponse = await axios({
    method: "put",
    url: `${DEST_URL}/users`,
    data: resultObject
  }).then((response : AxiosResponse) => {
  })
  .catch((error : AxiosError) => {
    //console.log(error);
  });
  //console.log(JSON.stringify(resultObject));
}

const sendResults = async (transformResults : result) => {
  try {
    // const result = await axios.put(`${DEST_URL}/users`);
    const result = axios({
      method: 'post',
      url: `${DEST_URL}/users`,
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
  const response : User[] = await fetchUsers();
  const results : result = transformData(response);
  // uploadResults(results);
  sendResults(results).then((data) => console.log(data.ok));

  //console.log( results );
  //console.log( results['data'] );
  //console.log(results);
}

main();
