interface FetchUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: FetchUserAddress;
  phone: string;
  website: string;
  company: FetchUserCompany;
}

interface FetchUserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: FetchUserAddressGeo;
}

interface FetchUserAddressGeo {
  lat: number;
  lng: number;
}

interface FetchUserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export {
  FetchUser
}
