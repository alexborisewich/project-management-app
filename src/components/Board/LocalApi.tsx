import jwt_decode from 'jwt-decode';

import { BASEURL } from './LocalConstant';
import { iBoards, iCreateBoard, iDecode, iToken, iUser, iUserEntry, iUsersCount } from './localnterface';

function saveToken(token: string) {
  sessionStorage.setItem('tokenData', JSON.stringify(token));
}
export function decode() {
  const myToken = sessionStorage.getItem('tokenData');
  if (!myToken) {
    console.log('нет токена!');
    return;
  } else {
    const decoded: iDecode = jwt_decode(myToken);
    return decoded.id;
  }
}

export async function getUsers() {
  const myToken = sessionStorage.getItem('tokenData');
  if (!myToken) {
    console.log('нет токена!');
    return;
  } else {
    const res = await fetch(`${BASEURL}/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${myToken.replace(/['"]+/g, '')}`,
      },
    });
    const users = (await res.json()) as Promise<iUsersCount[]>;
    return users;
  }
}
export async function createUser(user: iUser) {
  const res = await fetch(`${BASEURL}/auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  let msg = '';
  if (res.ok) {
    msg = 'New user is created';
  } else if (res.status === 400) {
    msg = 'Something wrong';
  } else if (res.status === 409) {
    msg = 'Login already exist';
  }
  console.log(msg);
  return msg;
}

export async function signIn(user: iUserEntry) {
  const res = await fetch(`${BASEURL}/auth/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const reply = (await res.json()) as iToken;
  saveToken(reply.token);
}

export async function createBoard(boardData: iCreateBoard) {
  const myToken = sessionStorage.getItem('tokenData');
  if (!myToken) {
    console.log('нет токена!');
    return;
  } else {
    const res = await fetch(`${BASEURL}/boards`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${myToken.replace(/['"]+/g, '')}`,
      },
      body: JSON.stringify(boardData),
    });
    let msg = '';
    if (res.ok) {
      msg = 'Created board';
    } else if (res.status === 400) {
      msg = 'Something wrong';
    }
    console.log(msg);
    return msg;
  }
}

export async function getBoardsById(userId: string) {
  const myToken = sessionStorage.getItem('tokenData');
  if (!myToken) {
    console.log('нет токена!');
    return;
  } else {
    const res = await fetch(`${BASEURL}/boardsSet/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${myToken.replace(/['"]+/g, '')}`,
      },
    });
    const boards = (await res.json()) as Promise<iBoards[]>;
    console.log(boards);
    return boards;
  }
}
