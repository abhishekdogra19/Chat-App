interface Userobj {
  id?: string;
  _id?: string;
  email: string;
  name: string;
  pic: string;
}

export const getSender = (loggedUser: Userobj, users: Userobj[]) => {
  return loggedUser && users[0]._id === loggedUser.id
    ? users[1].name
    : users[0].name;
};
