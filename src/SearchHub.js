export function searchHub(v){
    //request for json

    //do the search algorithm to prepare Array

    //return the array

    return fetch("http://192.168.43.45/bookHub/books.js")
    // .then(e=>JSON.parse(e))
    .then(e=>{
        // console.log(JSON.stringify(Blob.text(e._bodyInit._data)))
       console.log(JSON.stringify(e))
        return [{ img: require("./../assets/english.png"),size:2.1 },
               { img: require("./../assets/math11.png"),size:6.5 },]
    }).catch(err=>console.log(err))
    
}