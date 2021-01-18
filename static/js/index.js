encode.onclick = async (e) => {
    let response = await fetch('/encode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'payload': document.getElementById("input").value}),
    })
    let text = await response.text();
    document.getElementById("output").value = text
    if (text.length > 0 && !text.includes("error")){
        document.getElementById('output').setAttribute("class", "textarea is-success")
    }else{
        document.getElementById('output').setAttribute("class", "textarea is-danger")
    }
}

decode.onclick = async (e) => {
    let response = await fetch('/decode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'payload': document.getElementById("input").value})
    })
    let text = await response.text();
    document.getElementById("output").value = text
    if (text.length > 0 && !text.includes("error")) {
        document.getElementById('output').setAttribute("class", "textarea is-warning")
    }else{
        document.getElementById('output').setAttribute("class", "textarea is-danger")
    }
}

function prettyPrint() {
    var ugly = document.getElementById('output').value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('output').value = pretty;
    document.getElementById('output').setAttribute("class", "textarea is-success")
}