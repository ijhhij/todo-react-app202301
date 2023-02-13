import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import cn from 'classnames';
import { useAtom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import Dialog from 'axios';

const modalOpenAtom = atomWithDefault("modalOpen", false);

// import './css/LogInput.css';

const LogInput = ({ add }) => {
  
  // log-input 박스를 렌더링할지 여부
  const [open, setOpen] = useState(false);

  // 입력폼에 입력한 데이터들을 담을 상태변수
  const [log, setLog] = useState({ 
    contents: '',
  });

  // log-input 박스를 열고 닫는 클릭이벤트 핸들러
  const inputToggle = () => setOpen(!open);

  // 로그 입력 후 엔터치면 서버로 POST요청을 보내는 이벤트 핸들러
  const logAddHandler = e => {
    if (e.key === 'Enter') {

        // 입력데이터들을 읽기
        console.log(log);

        // 서버 요청 보내기
        add(log);

        // 입력끝나면 입력칸 비우기
        setLog({
            ...log,
            contents: ''
        });
    }
  };

  // 입력값을 실시간으로 상태변수 log에 저장하는 체인지이벤트 핸들러
  const contentsChangeHandler = e => {
    
     setLog({
        ...log, // 기존데이터 복사
        contents: e.target.value
     });
  };


  const stopSubmit = e => e.preventDefault(); // 자동 서브밋 중지

  return (
    <>
        { open &&
            <div className="log-input">

                <form className="insert-form" onSubmit={stopSubmit}>
                    <input 
                        type="text"
                        placeholder="로그 입력 후, 엔터를 누르세요!"
                        autoFocus
                        onKeyUp={logAddHandler}
                        onChange={contentsChangeHandler}
                        value={log.contents}
                    />
                </form>

                
            </div>
        }
        

        <button className={cn('begin-btn', {open})} onClick={inputToggle}>
            <MdAdd />
        </button>
    </>
  );
};

export default LogInput;