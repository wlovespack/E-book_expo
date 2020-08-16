import {AsyncStorage} from 'react-native';

const endPoint = "http://192.168.43.45/bookHub/books.json";

export async function searchHub(searchValue, type) {
  //do the search algorithm to prepare Array
  function searchEngine(storeInfo) {
    if (type == "search") {
      let array = [];
      storeInfo.map((i) => {
        const key = i.key.toLowerCase();
        const text = searchValue.toLowerCase();
        if (text.search(" ") + 1) {
          const textArray = text.split(" ");
          let ok = true;
          textArray.map((value) => {
            if (value) {
              if (!(key.search(":" + value + ":") + 1)) {
                ok = false;
              }
            }
          });
          if (ok) {
            array.push(i);
          }
        } else {
          if (key.search(":" + text + ":") + 1) {
            array.push(i);
          }
        }
      });
      return array;
    } else if (type == "random") {
      function extract() {
        let array = [];
        let x = 0;
        storeInfo.map((i) => {
          if (Math.random() < 1 / storeInfo.length && x <= 10) {
            array.push(i);
            x++;
          }
        });
        if (array[0]) {
          return array;
        } else {
          return extract();
        }
      }
      return extract();
    } else if (type == "all") {
      return storeInfo;
    } else {
    }
  }
  // async function getData() {
  //   const DB = await Storage.getItem('DB');

  // }
  const { value: value_1, DATA } = await validateDB();
  if (value_1) {
    return searchEngine(DATA.storeInfo);
  }
  else {
    return getStore().then(e => {
      return searchEngine(e.storeInfo);
    });
  }
}

function getStore() {
  return (
    fetch(endPoint)
      .then((e) => e.json())
      //return the array
      .then((DATA) => {
        AsyncStorage.setItem(
          "DB",
          JSON.stringify({
            time: new Date().getTime(),
            storeInfo: DATA.storeInfo,
            recommend: DATA.recommend,
          })
        );
        return DATA;
      })
  );
}

async function validateDB() {
  const DB = await AsyncStorage.getItem("DB");
  if (DB) {
    const data = JSON.parse(DB);
    const Time = new Date().getTime() - data.time;
    if (Time < 2016000) {
      return { value: true, DATA: data };
    }
    else {
      return { value: false, DATA: null };
    }
  }
  else {
    return { value: false, DATA: null };
  }
}

export async function getRecommendation() {
  const { value, DATA } = await validateDB();
  if (value) {
    return DATA.recommend;
  }
  else {
    return getStore().then(e => {
      return e.recommend;
    });
  }
}