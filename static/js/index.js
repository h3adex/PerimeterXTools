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

getPC.onclick = async (e) => {
    var values = ["uuid", "tag", "ft"]
    var results = []

    values.forEach(function (val){
        if (document.getElementById(val).value === ""){
            document.getElementById(val).setAttribute("class", "input is-danger")
        }else{
            document.getElementById(val).setAttribute("class", "input is-success")
            results.push(document.getElementById(val).value)
        }
    })

    try {
        var payload = JSON.parse(document.getElementById('output').value);
    }
    catch (e){
        document.getElementById('output').setAttribute("class", "textarea is-danger")
    }

    if (results.length === values.length && payload.length > 0) {
        let response = await fetch('/pc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'payload': JSON.stringify(payload), 'uuid': results[0], 'tag': results[1], 'ft': results[2]})
        })
        let text = await response.text();
        if (text.length > 1){
            document.getElementById("pcResult").value = text
        }
    }
}


function prettyPrint() {
    var ugly = document.getElementById('output').value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('output').value = pretty;
    document.getElementById('output').setAttribute("class", "textarea is-success")
}