interface FetchUserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  address: FetchUserModelAddress;
  phone: string;
  website: string;
  company: FetchUserModelCompany;
}

interface FetchUserModelAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: FetchUserModelAddressGeo;
}

interface FetchUserModelAddressGeo {
  lat: number;
  lng: number;
}

interface FetchUserModelCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export {
  FetchUserModel
}
