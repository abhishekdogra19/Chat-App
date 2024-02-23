interface Userobj {
  _id: string;
  email: string;
  name: string;
  pic: string;
}

export const getSender = (loggedUser: Userobj | null, users: Userobj[]) => {
  if (!loggedUser) return;
  const id = loggedUser._id;
  return loggedUser && users[0]._id === id ? users[1].name : users[0].name;
};
export const getSenderFull = (loggedUser: Userobj | null, users: Userobj[]) => {
  if (!loggedUser) return;
  const id = loggedUser._id;
  return loggedUser && users[0]._id === id ? users[1] : users[0];
};
