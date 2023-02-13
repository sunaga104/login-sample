const userInfo = [
  {
    id: "1",
    user_name: "test",
    password: "test",
  },
  {
    id: "2",
    user_name: "test2",
    password: "test2",
  },
];

const findUser = (userId) => {
  console.log(userId)
  console.log(userInfo)
  for (const elem of userInfo) {
    if (elem.user_name === userId) {
      return elem;
    }
  }
};

export {findUser}