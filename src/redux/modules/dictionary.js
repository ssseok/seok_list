import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";

// ** 초깃값 설정 **
const initialState = { is_loaded: false, list: [] };

// ** Actions **
const LOAD = "dictionary/LOAD";
const CREATE = "dictionary/CREATE";
const DELETE = "dictionary/DELETE";
const UPDATE = "dictionary/UPDATE";
const COMPLETION = "dictionary/COMPLETION";

// ** Action Creators **
export function loadDictionary(dictionary_list) {
  return {
    type: LOAD,
    dictionary_list,
  };
}

export function createDictionary(dictionary_info) {
  return {
    type: CREATE,
    dictionary_info,
  };
}

export function deleteDictionary(dictionary_index) {
  return {
    type: DELETE,
    dictionary_index,
  };
}

export function updateDictionary(dictionary_list, dictionary_index) {
  return {
    type: UPDATE,
    dictionary_list,
    dictionary_index,
  };
}

export function completionDictionary(dictionary_list, dictionary_index) {
  return {
    type: COMPLETION,
    dictionary_list,
    dictionary_index,
  };
}

// ** Middlewares **
export const loadDictionaryFB = () => {
  // firestore의 데이터 store에 넣기
  return async function (dispatch) {
    const dictionary_data = await getDocs(collection(db, "dictionary"));
    // collection의 데이터 싹 다 불러오기

    let dictionary_list = [];

    dictionary_data.forEach((doc) => {
      dictionary_list.push({ id: doc.id, ...doc.data() });
      // === dictionary_list.push(doc.data());
    });

    dispatch(loadDictionary(dictionary_list));
  };
};

export const createDictionaryFB = (dictionary) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "dictionary"), dictionary);

    const dictionary_data = { id: docRef, ...dictionary };

    dispatch(createDictionary(dictionary_data));
  };
};

export const deleteDictionaryFB = (dictionary_id) => {
  return async function (dispatch, getState) {
    if (!dictionary_id) {
      window.alert("아이디가 없습니다.");
      return;
    }

    const docRef = doc(db, "dictionary", dictionary_id);
    // 어떤 걸 삭제 할 지 document를 집어온다.

    await deleteDoc(docRef);

    const _dictionary_list = getState().dictionary;
    // firestore의 데이터를 다 불러온다.

    const dictionary_index = _dictionary_list.list.findIndex((d) => {
      return d.id === dictionary_id;
    });

    dispatch(deleteDictionary(dictionary_index));
  };
};

export const updateDictionaryFB = (dictionary_list) => {
  return async function (dispatch, getState) {
    if (!dictionary_list.id) {
      window.alert("아이디가 없습니다.");
      return;
    }

    const docRef = doc(db, "dictionary", dictionary_list.id);
    // 어떤 걸 수정 할 지 document를 집어온다.

    await updateDoc(docRef, {
      word: dictionary_list.word,
      explanation: dictionary_list.explanation,
      example: dictionary_list.example,
      memory: dictionary_list.memory,
    });
    // firestore의 값을 수정한다.

    // const dictionary_data = (await getDoc(docRef)).data()
    // dogRef는 document 타입으로 참조값이기 때문에 await(getDoc(docRef)).data()를 사용해서 dictionary collection에서 수정된 데이터를 불러왔다.

    const _dictionary_list = getState().dictionary;
    // firestore의 데이터를 다 불러온다.

    const dictionary_index = _dictionary_list.list.findIndex((d) => {
      return d.id === dictionary_list.id;
    });

    dispatch(updateDictionary(dictionary_list, dictionary_index));
  };
};

export const completionDictionaryFB = (dictionary_list) => {
  return async function (dispatch, getState) {
    if (!dictionary_list.id) {
      window.alert("아이디가 없습니다.");
      return;
    }

    const docRef = doc(db, "dictionary", dictionary_list.id);
    // 어떤 걸 완료 할 지 document를 집어온다.

    await updateDoc(docRef, {
      word: dictionary_list.word,
      explanation: dictionary_list.explanation,
      example: dictionary_list.example,
      memory: dictionary_list.memory,
    });
    // firestore의 값을 수정한다.

    // const dictionary_data = (await getDoc(docRef)).data()
    // dogRef는 document 타입으로 참조값이기 때문에 await(getDoc(docRef)).data()를 사용해서 dictionary collection에서 수정된 데이터를 불러왔다.

    const _dictionary_list = getState().dictionary;
    // firestore의 데이터를 다 불러온다.

    const dictionary_index = _dictionary_list.list.findIndex((d) => {
      return d.id === dictionary_list.id;
    });

    dispatch(completionDictionary(dictionary_list, dictionary_index));
  };
};

// ** Reducer **
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // 불러오기 기능
    case "dictionary/LOAD":
      return { list: action.dictionary_list, is_loaded: true };

    // 추가 기능
    case "dictionary/CREATE":
      const new_dictionary_list = {
        is_loaded: state.is_loaded,
        list: [...state.list],
      };

      return new_dictionary_list;

    // 삭제 기능
    case "dictionary/DELETE":
      const new_dictionary_delete = [];
      for (let i = 0; i < state.length; i++) {
        if (i !== action.dictionary_index) {
          new_dictionary_delete.push(state[i]);
        }
      }

      return { ...state, list: new_dictionary_delete };

    // 수정 기능
    case "dictionary/UPDATE":
      const new_dictionary_update = state.list.map((item, index) => {
        if (action.dictionary_index == index) {
          item.word = action.dictionary_list.word;
          item.explanation = action.dictionary_list.explanation;
          item.example = action.dictionary_list.example;
        } else {
          return item;
        }
        return item;
      });

      return { ...state, list: new_dictionary_update };

    // 완료 기능
    case "dictionary/COMPLETION":
      const new_dictionary_completion = state.list.map((item, index) => {
        if (action.dictionary_index == index) {
          item.word = action.dictionary_list.word;
          item.explanation = action.dictionary_list.explanation;
          item.example = action.dictionary_list.example;
          item.memory = action.dictionary_list.memory;
        } else {
          return item;
        }
        return item;
      });

      console.log(new_dictionary_completion);

      return { ...state, list: new_dictionary_completion };

    // do reducer stuff
    default:
      return state;
  }
}
