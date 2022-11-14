import React, { useEffect, useState } from 'react';

import { s, types } from './';

import { decode, getBoardsById } from './LocalApi';
//import { createBoard, createUser, decode, getBoardsById, getUsers, signIn } from './LocalApi';
//import { s, types } from './';
//void createUser({
// name: 'Mida q',
// login: 'Molodai',
// password: 'fudzam',
//});
//void signIn({
//login: 'Molodai',
//password: 'fudzam',
//});
//const solution = void getUsers().then((solve) => {
//console.log(solve);
//});

//const createB = void createBoard({
//// title: 'hiMaan3',
// owner: decode() as string,
//users: ['Che Tam'],
//});
//const boardById = void getBoardsById(decode() as string).then((solve) => {
//  console.log(solve);
//});

const Board = function ({ dataTestId }: types.BoardProps) {
  const [allBoardsById, setAllBoardsById] = useState([{ title: 'Hello!', users: ['First Description!'] }]);

  useEffect(() => {
    void getBoardsById(decode() as string).then((solve) => {
      setAllBoardsById(solve ? solve : [{ title: 'Hello!', users: ['First Description!'] }]);
    });
  }, []);
  return (
    <div className={s.container} data-testid={dataTestId}>
      {allBoardsById.map((item, index) => (
        <div key={index}>
          <div>
            <p className={s.container}>{item.title}</p>
            <p className={s.container}>{item.users}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
