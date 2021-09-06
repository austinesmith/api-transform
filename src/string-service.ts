// this module provides helper methods for string manipulations specific to
// the data transform
import zipState from 'zip-state';

// removes titles, one letter words, and returns the first word
export function refineFirstName(rawString : string) : string {
    return refineName(rawString).split(' ')[0];
}

// removes titles, one letter words, and returns the last word
export function refineLastName(rawString : string) : string {
    return refineName(rawString).split(' ')[(refineName(rawString).split(' ').length)-1];;
}

// calculates state by zip, then consolidates address, city, state, and zip
export function composeAddress(streetAddress: string, cityName: string, zipCode : string, ) : string {
    zipCode = zipCode.replace(/[^0-9\d\s']/gi, ' ').split(" ")[0];
    const stateName = (zipState(zipCode) == null)  ? "n/a" : zipState(zipCode);
    return streetAddress + ", " + cityName + ", " + stateName + ", " + zipCode;
}

// removes all symbols that aren't numbers, then finds first occurence of 10-11 length number
export function refinePhoneNumber(rawString : string) : string {
    var phoneString : string = rawString.replace(/[^0-9\d\s']/gi, '');
    var phoneStrings : string[] = phoneString.split(" ");
    for (let i=0; i<phoneStrings.length; i++) {
        if (phoneStrings[i].length == 10) {
          phoneString = phoneStrings[i]; break;
        } else if (phoneStrings[i].length == 11 && (phoneStrings[i].charAt(0) == '0' || phoneStrings[i].charAt(0) == '1')) {
          phoneString = phoneStrings[i].substring(1); break;
        }
    }
    return phoneString;
}

// common logic behind refineFirstName and refineLastName
function refineName(rawString : string) : string {
    // remove common honorific titles
    var nameString : string = rawString.replace(/^Mr\.|Mrs\.|Ms\./, '').trim();

    // if there are more than two names remove all one letter words
    if (nameString.split(" ").length > 2)
        nameString = nameString.replace(/\W*\b\w{1,1}\b/, "").trim();

    return nameString;
}