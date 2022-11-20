import React, { useEffect, useState } from 'react';

import { s, types } from './';

import { Context } from './Context';

//import { decode, getBoardsById } from './LocalApi';
import { createBoard, createUser, decode, getBoardsById, getUsers, signIn } from './LocalApi';
import BasicModal from './ModalCreateUser';
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
//console.log(decode());
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
  const [toggleModal, setToggleModal] = useState(false);
  useEffect(() => {
    void getBoardsById(decode() as string).then((solve) => {
      setAllBoardsById(solve ? solve : [{ title: 'Hello!', users: ['First Description!'] }]);
    });
  }, []);
  return (
    <Context.Provider value={{ toggleModal, setToggleModal }}>
      <div className={s.container} data-testid={dataTestId}>
        <BasicModal />
        {allBoardsById.map((item, index) => (
          <div key={index}>
            <div>
              <p className={s.container}>{item.title}</p>
              <p className={s.container}>{item.users}</p>
            </div>
          </div>
        ))}
      </div>
    </Context.Provider>
  );
};

export default Board;
