interface PostUsersModel {
    userid: string;
    password: string;
    outputtype: string;
    users: PostUsersModelUser[];
}

interface PostUsersModelUser {
    first_name: string;
    last_name: string;
    company_name: string;
    company_full_address: string;
    website: string;
    phone: string;
}

export {
    PostUsersModel,
    PostUsersModelUser
}