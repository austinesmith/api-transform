interface SendDataWrapper {
    userid: string;
    password: string;
    outputtype: string;
    users: SendDataUser[];
}

interface SendDataUser {
    first_name: string;
    last_name: string;
    company_name: string;
    company_full_address: string;
    website: string;
    phone: string;
}

export {
    SendDataWrapper,
    SendDataUser
}