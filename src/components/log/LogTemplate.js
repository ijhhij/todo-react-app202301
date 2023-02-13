import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
// css 로딩
//import './css/LogTemplate.css';
//import LogHeader from './LogHeader';
import axios from 'axios';

import LogInput from './LogInput';

import { BASE_URL, TODO } from '../../config/host-config';

import { getToken } from '../util/login-util';

const LogTemplate = () => {
  
  const API_BASE_URL = BASE_URL;
  const ACCESS_TOKEN = getToken();

  // log api데이터
  const [logs, setLogs] = useState([]);

  const headerInfo = {
    'content-type': 'application/json' 
    , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
  };

  // 할 일 등록 서버 요청
  const addLog = (log) => {

    fetch(API_BASE_URL, {
        method: 'POST',
        headers: headerInfo,
        body: JSON.stringify(log),
        enctype: 'multipart/form-data',
        //body: FormData,
    })
    .then(res => res.json())
    .then(result => {
        setLogs(result.logs);
    });

  //   axios.post(API_BASE_URL,{
  //     //request
  //     body: JSON.stringify(log),
  //   }).then(function (response) {
  //     // response Action
  //     setLogs(logs);
  //  })
  };

  // 할 일 삭제 요청 처리
  
  // + editable 을 통한 삭제 권한 추가
  const deleteLog = (id) => {

    fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: headerInfo
    })
    .then(res => res.json())
    .then(result => {
        setLogs(result.logs);
    });
  };

  // 할 일 수정 요청 처리

  // + editable 을 통한 수정 권한 추가
  const updateLog = log => {

    fetch(`${API_BASE_URL}/${log.id}`, {
        method: 'PUT',
        headers: headerInfo,
        body: JSON.stringify(log)
    })
    .then(res => res.json())
    .then(result => {
        setLogs(result.logs);
    });
  };

  return (
    <>
      <LogInput add={addLog} />
    </>
  );
};

export default LogTemplate;