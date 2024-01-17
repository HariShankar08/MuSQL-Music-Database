document.getElementById("minute-filter").addEventListener("click", () => {
    if (document.getElementById("minute-filter").checked) {
        document.getElementById("minutes").disabled = false;
    } else {
        document.getElementById("minutes").value = "";
        document.getElementById("minutes").disabled = true;
    }
});
const search = () => {
    let query = document.getElementById("query").value;
    console.log(query)
    let explicitFlag = document.getElementById("allow-explicit").checked;
    let minutes = document.getElementById("minutes").value;

    if (minutes === "") {
        minutes = Number.MAX_SAFE_INTEGER;
    } else {
        minutes *= 60000;
    }

    let allowExplicitStr = "";
    if (explicitFlag) {
        allowExplicitStr = "explicit";
    }


    document.getElementById("query").disabled = true;
    fetch(`https://itunes.apple.com/search?media=music&term=${encodeURIComponent(query)}`, {})
        .then(response => response.json())
        .then(res => {
            const responseDiv = document.getElementById("query-result");
            responseDiv.innerHTML = "";


            if (res == undefined) {
                responseDiv.innerHTML = `<div id="res-box">
                                            <p>No results found.</p>
                                        </div>`
            } else {
                let resString = '';
                // console.log(res['results'][0]);
                let nItems = 0;
                for (let i=0; i<res['results'].length; i++) {
                    let data = res['results'][i];
                    if (data['trackTimeMillis'] <= minutes && (allowExplicitStr === "explicit" || data['trackExplicitness'] !== 'explicit')) {
                        resString += `<div id="res-box">
                                            <div style="width:100px; display: inline-block">
                                                <img id="res-img" src="${data['artworkUrl100']}" />
                                            </div>
                                            <div style="display: inline-block; margin:75px">
                                                <p>${data['trackName']} - ${data['artistName']}<br />${data['collectionName']}</p>
                                                <audio id="preview-audio" controls>
                                                    <source src="${data['previewUrl']}" type="audio/mp4">
                                                    Your browser does not support the audio element.
                                                </audio>
                                            </div>
                                        </div>`;
                        nItems += 1;
                        if (nItems >= 10) {
                            break;
                        }
                    }

                }
                if (resString === "") {
                    responseDiv.innerHTML = `<div id="res-box">
                                                <p>No results found.</p>
                                            </div>`
                } else {
                    responseDiv.innerHTML  = resString;
                }
            }
        });

    document.getElementById("query").disabled = false;
    document.getElementById("query").value = "";
};

