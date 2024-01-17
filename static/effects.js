let links = document.getElementsByTagName("a");

let sub = document.getElementsByTagName("sub")[0];
let sub_text = sub.innerHTML;
let idx = 0;

sub.innerHTML = "";

const typeOut = () => {
    if (idx < sub_text.length) {
        sub.innerHTML += sub_text.charAt(idx);
        idx++;
        setTimeout(typeOut, 120);
    }
}

typeOut();


for (let i = 0; i < links.length; i++) {
    let link = links[i];
    // console.log(link.style);
    if (link.id === "card-link") {
        continue;
    }

    link.addEventListener("mouseover", function () {this.style.color = 'red'});
    link.addEventListener("mouseout", function () {this.style.color = 'white'});
}