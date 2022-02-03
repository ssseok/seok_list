import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDictionaryFB,
  deleteDictionaryFB,
  completionDictionaryFB,
} from "./redux/modules/dictionary";
// → 패키지 import

import seokImg from "./seokb.png";
import Button from "@material-ui/core/Button";
// → 머테리얼 UI import

// ** 자식 컴포넌트 - List **
const List = (props) => {
  let dictionary_list = useSelector((state) => state.dictionary);
  // redux 데이터 불러오기
  let msg = props.msg;
  // 부모 state에서 받아온 msg
  let userInfo;
  // 부모 state에서 받아온 msg를 기준으로
  // 모두 보여 줄 지 외운 단어만 보여 줄 지 안외운 단어만 보여줄 지에 대한 데이터를 담는 변수

  let dispatch = useDispatch();
  let history = useHistory();

  // msg를 기준으로 userInfo에 들어가는 데이터를 변환한다.
  if (msg === "all") {
    // 모든 단어 출력
    userInfo = dictionary_list.list;
  } else if (msg === "completion") {
    // 외운 단어만 출력
    userInfo = dictionary_list.list.filter((item) => {
      return item.memory;
    });
  } else if (msg === "unCompletion") {
    // 안외운 단어만 출력
    userInfo = dictionary_list.list.filter((item) => {
      return !item.memory;
    });
  }

  // 삭제 기능 함수
  const deleteBtn = (index) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      dispatch(deleteDictionaryFB(userInfo[index].id));
      dispatch(loadDictionaryFB());
    }
  };

  // 완료 기능 함수
  const completionBtn = (index) => {
    const idDate = userInfo[index].id;
    const wordData = userInfo[index].word;
    const exmplationData = userInfo[index].explanation;
    const exampleData = userInfo[index].example;

    dispatch(
      completionDictionaryFB({
        id: idDate,
        word: wordData,
        explanation: exmplationData,
        example: exampleData,
        memory: true,
      })
    );
    dispatch(loadDictionaryFB());
    history.push("/");
  };

  // useEffect
  // 처음 컴포넌트가 생성 되었을 때 fireStore의 데이터를 불러오고
  // userInfo(redux)의 데이터가 바뀌면 다시 fireStore에서 데이터를 불러온다.
  React.useEffect(() => {
    // async 쓰는 방법도 있음
    dispatch(loadDictionaryFB());
  }, []); // userInfo 넣으면 무한로딩이 일어나서, 데이터를 너무 잡아먹음

  return (
    <Container>
      {userInfo.length != 0 ? (
        userInfo.map((item, index) => {
          return (
            <Card
              key={index}
              style={
                item.memory
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "white" }
              }
            >
              <SubTitle>[Word]</SubTitle>
              <Text>{item.word}</Text>
              <SubTitle>[Explanation]</SubTitle>
              <Text>{item.explanation}</Text>
              <SubTitle>[Example]</SubTitle>
              <Text>{item.example}</Text>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  size="medium"
                  style={
                    item.memory
                      ? { display: "none" }
                      : {
                          color: "#FFD700",
                          marginRight: "1%",
                          fontWeight: "bold",
                        }
                  }
                  onClick={() => {
                    completionBtn(index);
                  }}
                >
                  완료
                </Button>
                <Button
                  size="medium"
                  style={{
                    color: "#FA8072",
                    marginRight: "1%",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    deleteBtn(index);
                  }}
                >
                  삭제
                </Button>
                <Button
                  size="medium"
                  style={{ color: "#4682B4", fontWeight: "bold" }}
                  onClick={() => {
                    history.push({
                      pathname: "/updateWord",
                      state: {
                        index: index,
                        word: item.word,
                        explanation: item.explanation,
                        example: item.example,
                        memory: item.memory,
                      },
                    });
                  }}
                >
                  수정
                </Button>
              </div>
            </Card>
          );
        })
      ) : (
        <NullCard>
          <img src={seokImg}></img>
          <div>
            아직 아무도
            <br />
            작성하지 않았어요!😄
          </div>
        </NullCard>
      )}
    </Container>
  );
};

// styled-components
const Container = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 500px;
`;

const Card = styled.div`
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  width: 400px;
  height: 260px;
  margin: auto;
  padding-left: 5%;
  text-align: left;
  margin-bottom: 5%;
  padding-top: 1%;
  font-size: 15px;
`;

const NullCard = styled.div`
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  width: 400px;
  height: 270px;
  margin: auto;
  padding-left: 5%;
  text-align: left;
  margin-bottom: 5%;
  font-size: 15px;
  margin-top: 100px;

  display: flex;

  & img {
    margin: 5%;
    margin-left: 0px;
    margin-bottom: 50px;
  }

  & div {
    margin-top: 100px;
  }
`;

const SubTitle = styled.p`
  font-size: 12px;
  font-weight: bold;
`;

const Text = styled.p`
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default List;
