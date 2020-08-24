import React from "react";
import {
  Text,
  View,
  TouchableNativeFeedback,
  ImageBackground,
  Button,
  AsyncStorage,
  ToastAndroid
} from "react-native";
import * as FileSystem from "expo-file-system";
import Context from "../../Context";

function BookCard({
  changeDownloadCount,
  img,
  file,
  lookForBook,
  s,
  existingBooks,
  setExistingBooks,
  props,
}) {
  const { theme, lang,Refresh } = React.useContext(Context);
  const [hide, setHide] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [size, setSize] = React.useState(
    file.size < 10
      ? file.size.toString().slice(0, 3)
      : file.size.toString().slice(0, 4)
  );
  const [bookExists, setBookExists] = React.useState(
    lookForBook(img + file.url)
  );
    console.log(progress,size)
  const changeHide = (v) => {
    if (!bookExists) {
      setHide(v);
      setTimeout(() => setHide(false), 4000);
    } else {
      ToastAndroid.showWithGravityAndOffset(
        lang.toast_pull,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        95
      );
        props.navigation.navigate(lang.menu_item_2);
    }
  };
  const storeBook = (uriFile, uriImg) => {
    const book = {
      id: img + file.url,
      file: uriFile,
      img: uriImg,
    };
    if (!bookExists) {
      AsyncStorage.getItem("books")
        .then((e) => {
          if (e) {
            let result = JSON.parse(e);
            result.push(book);
            AsyncStorage.setItem("books", JSON.stringify(result));
          } else {
            AsyncStorage.setItem("books", JSON.stringify([book]));
          }
        })
        .catch((e) => console.log(e));
    } else {
      console.log("NOT saving file it already exists");
    }
    setExistingBooks([...existingBooks, book.id]);
    setBookExists(true);
  };

  const changeDownloading = async () => {
    setDownloading(true);
    const callback = (downloadProgress) => {
      setProgress(downloadProgress.totalBytesWritten / 1000000);
    };
    if (!bookExists) {
      const fileName = file.url.split("/");
      changeDownloadCount(fileName[fileName.length - 1]);
      const downloadResumableFile = FileSystem.createDownloadResumable(
        file.url,
        FileSystem.documentDirectory + fileName[fileName.length - 1],
        {},
        callback
      );

      const imgName = img.split("/");
      const downloadResumableImg = FileSystem.createDownloadResumable(
        img,
        FileSystem.documentDirectory + imgName[imgName.length - 1]
      );

      try {
        const uriFile = await downloadResumableFile.downloadAsync();
        const uriImg = await downloadResumableImg.downloadAsync();
        storeBook(uriFile.uri, uriImg.uri);
        changeDownloadCount(fileName[fileName.length - 1],false)
        console.log("finished downloading image and file" + uriFile.uri + "*******" + uriImg.uri);
      } catch (e) {
        ToastAndroid.showWithGravityAndOffset(
          "Download is not available! Failed to connect to server",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          95
          );
          Refresh();
        }
      } else {
        console.log("NOT downloading file it already Exists");
      }
    };
    
  return (
    <TouchableNativeFeedback onPress={() => changeHide(true)}>
      <View style={[s.block, { borderColor: theme.item_border }]}>
        <ImageBackground
          source={{ uri: img }}
          style={{ width: 100 + "%", height: 100 + "%" }}
        >
          {downloading && !bookExists ? (
            <View style={s.bottom}>
              <Text style={s.mb}>
                {fixNumber(progress)} / {fixNumber(size)} Mb
              </Text>
              <Text style={s.percent}>
                {Math.floor((progress * 100) / size)}%
              </Text>
              <View style={s.progCon}>
                <View
                  style={[s.prog, { width: (progress * 100) / size + "%" }]}
                />
              </View>
            </View>
          ) : (
            <View />
          )}
          {!hide && !downloading && !bookExists ? (
            <View style={s.bottom}>
              <Text style={s.size}>{size} Mb</Text>
              <Button
                style={s.download}
                title={lang.store_download}
                color={theme.button}
                disabled={bookExists}
                onPress={() => changeDownloading()}
              />
            </View>
          ) : (
            <View />
          )}
          {bookExists && !hide ? (
            <View style={s.bottom}>
              <Text style={s.already}>{lang.store_tap}</Text>
            </View>
          ) : (
            <View />
          )}
        </ImageBackground>
      </View>
    </TouchableNativeFeedback>
  );
}

const fixNumber = (num) => {
  if (num) {
    const numString = Math.floor(num).toString();
    const numSplit = num.toString().split(".");
    if (numSplit[1]) {
      return numString + "." + numSplit[1].slice(0, 1);
    } else {
      return numString;
    }
  }
  return 0;
};

export default BookCard;
