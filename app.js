import firebase from  'firebase/app'
import 'firebase/storage'
import {upload} from "./upload";


const firebaseConfig = {
    apiKey: "AIzaSyAj44JX91kbZ5zDUkhhC9mOp-0AKWpkK_A",
    authDomain: "otmeisona-7.firebaseapp.com",
    projectId: "otmeisona-7",
    storageBucket: "otmeisona-7.appspot.com",
    messagingSenderId: "900608636443",
    appId: "1:900608636443:web:51d93343b82682b7ffaabe"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload('#file', {
    accept: ['.png', '.jpg', '.jpeg'],
    onUpload(files) {
        files.forEach((file) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                // const block = blocks[index].querySelector(`.preview-info-progress`)
                // block.textContent = percentage
                // block.style.width = percentage
            }, error =>  {
                console.log(error)
            }, () => {
                console.log('Complete')
            })
        })
    }
})

