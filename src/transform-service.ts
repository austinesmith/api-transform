// this module provides helper methods for string manipulations specific to
// the data transform
import { FetchUserModel } from './interfaces/fetch-user';
import { PostUserModel, PostUserModelUser } from './interfaces/post-user';
import zipState from 'zip-state'; // this package enables state lookup from zipcode

/* transforms fetch JSON object into compatible post JSON object */
export function transformUsers(fetchData : FetchUserModel[], userName : string, password : string, outputType : string ) : PostUserModel {
    // declare array of users to add to wrapper
  let updatedUsers: Array<PostUserModelUser> = [];

    // add each fetch data user to array
  for (let i=0; i<fetchData.length; i++) {
      // create new user object with refined data
    let currentUser : PostUserModelUser = {
      first_name: extractFirstName(fetchData[i]['name']),
      last_name: extractLastName(fetchData[i]['name']),
      company_name: fetchData[i]['company']['name'],
      company_full_address: composeAddress(fetchData[i]['address']['street'], fetchData[i]['address']['city'], fetchData[i]['address']['zipcode']),
      website: fetchData[i]['website'],
      phone: extractPhoneNumber(fetchData[i]['phone'])
    }
      // add user to array
    updatedUsers.push(currentUser);
  }

    // create user wrapper with array
  const sendData : PostUserModel = {
    userid: userName,
    password: password,
    outputtype: outputType,
    users: updatedUsers
  }
  return sendData;
}

/* removes titles, one letter words, and returns the first word */
function extractFirstName(rawString : string) : string {
    const fullName : string = refineName(rawString);
    const names : string[] = fullName.split(' ');
    return names[0];
}

/* removes titles, one letter words, and returns the last word */
function extractLastName(rawString : string) : string {
    const fullName : string = refineName(rawString);
    const names : string[] = fullName.split(' ');
    return names[names.length-1];
}

/* common logic behind refineFirstName and refineLastName */
function refineName(rawString : string) : string {
    // remove common honorific titles
let nameString : string = rawString.replace(/^Mr\.|Mrs\.|Ms\./, '').trim();

    // if there are more than two names remove all one letter words
if (nameString.split(" ").length > 2)
    nameString = nameString.replace(/\W*\b\w{1,1}\b/, "").trim();

return nameString;
}

/* calculates state by zip, then consolidates address, city, state, and zip */
    // NOTE: requirements specify 'company_full_address' but the original JSON only includes the individuals home address
    // this assumes home address was meant
function composeAddress(streetAddress: string, cityName: string, zipCode : string, ) : string {
    const zipArray : string[] = zipCode.replace(/[^0-9\d\s']/gi, ' ').split(" ");
    const refinedZipCode = zipArray[0];
    const stateName = (zipState(refinedZipCode) == null)  ? "N/A" : zipState(refinedZipCode);
    return streetAddress + ", " + cityName + ", " + stateName + ", " + refinedZipCode;
}

/* removes all symbols that aren't numbers, then finds first occurence of 10-11 length number */
function extractPhoneNumber(rawString : string) : string {
    let phoneString : string = rawString.replace(/[^0-9\d\s']/gi, '');
    const phoneStrings : string[] = phoneString.split(" ");
    for (let i=0; i<phoneStrings.length; i++) {
        if (phoneStrings[i].length == 10) {
          phoneString = phoneStrings[i];
          break;
        } else if (phoneStrings[i].length == 11 && (phoneStrings[i].charAt(0) == '0' || phoneStrings[i].charAt(0) == '1')) {
          phoneString = phoneStrings[i].substring(1);
          break;
        }
    }
    return phoneString;
}