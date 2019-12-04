const Store = () => {
  let events = new Map();
  let users = new Map();
  let currentUser = {
    id: '',
    pw: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    events: [],
  };

  const addUser = u => {
    const userObj = {
      id: u.id,
      pw: u.pw,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      gender: u.gender,
      events: [],
    };

    users.set(u.id, userObj);
  };

  const checkAddUser = u => {
    let returnVal = false;

    if (users.get(u.user_id) === undefined) {
      const userObj = {
        id: u.user_id,
        pw: u.password,
        firstName: u.first_name,
        lastName: u.last_name,
        email: u.email,
        gender: u.gender,
        events: [],
      };
      users.set(u.user_id, userObj);
      returnVal = true;
    }
    return returnVal;
  };

  const checkUserCredentials = u => {
    let returnVal = false;
    const user = users.get(u.user_id);
    if (user !== undefined) {
      if (u.password.match(user.pw) !== null) {
        returnVal = true;
      }
    }
    return returnVal;
  };

  const setAdminUser = () => {
    const userObj = {
      id: 'admin',
      pw: '123',
      firstName: 'Sys',
      lastName: 'Admin',
      email: 'admin@foo.com',
      gender: 'male',
    };
    addUser(userObj);
  };

  const setMockUsers = numberOfUsers => {
    for (let i = 1; i <= numberOfUsers; i++) {
      let userObj = {
        id: 'user' + i,
        pw: '123',
        firstName: 'First' + i,
        lastName: 'Last' + i,
        email: 'user' + i + '@foo.com',
        gender: i % 2 ? 'male' : 'female',
        events: [],
      };
      users.set(userObj.id, userObj);
    }
  };

  const isAdmin = user => {
    return user.id === 'admin';
  };

  const setCurrentUser = u => {
    return users.get(u.user_id);
  };

  const addEvent = e => {
    events.set(e.name, e);
  };

  const getEvent = name => {
    return events.get(name);
  };

  const subscribeEvent = (user, event) => {
    user.events.push(event);
  };

  const stakeBar = count => {};

  const store = {
    isAdmin: isAdmin,
    setAdminUser: setAdminUser,
    addUser: addUser,
    checkAddUser: checkAddUser,
    checkUserCredentials: checkUserCredentials,
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    setMockUsers: setMockUsers,
    addEvent: addEvent,
    getEvent: getEvent,
    subscribeEvent: subscribeEvent,
    events: events,
    users: users,
    stakeBar: stakeBar,
  };

  return store;
};

export default Store;
