function debounce({seconds,...rest}) {
    let timer;
    console.log(btn);
    timer = setTimeout(function send() {
        let btn = document.getElementsByClassName("validcode")[0];
        btn.value = "再次发送"
        console.log(btn);
    },seconds)
}