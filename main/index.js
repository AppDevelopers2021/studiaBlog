const hamburger = document.getElementsByClassName("nav_hamburger")[0];
const navbar = document.getElementById("navbar");
const sidenav = document.getElementById("sidenav");
const close_nav_button = document.getElementById("close_nav");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("bar_open");
    sidenav.classList.toggle("side_open");
})
close_nav_button.addEventListener("click", function () {
    hamburger.className = "nav_hamburger center";
    sidenav.className = "";
})

// 'Sticky' Navbar
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}

// Fetch Blogpost Info.
fetch('./blogpost.json').then((response) => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
}).then((data) => {
    writeConfigInfo(data);
});
fetch('./blogpost.md').then((response) => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.text();
}).then((data) => {
    writeDocumentBody(data);
});

// Set Up Config Info.
function writeConfigInfo(config) {
    document.title = config.title;
    document.getElementById("title").innerText = config.title;
    document.getElementById("subtitle").innerText = config.description;
    document.getElementById("location").innerText = config.location;
    document.getElementById("mail").href = "mailto:" + config.author.email;
    document.getElementById("author").innerText = config.author.name;
    document.getElementById("author").href = "mailto:" + config.author.email;
    document.getElementById("author_date").innerText = config.date;
}

// Write Document Body.
function writeDocumentBody(raw_blogpost) {
    document.getElementById("article").innerHTML = marked.parse(raw_blogpost);
}

// Copy Current URL to Clipboard.
function copyURLToClipboard() {
    var dummy = document.createElement("input");
    var text = location.href;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

// SHARE Api.
function share() {
    if (navigator.share) {
        navigator.share({
                title: document.title,
                url: location.href
            })
            .catch((error) => console.log('Error sharing', error));
    } else {
        var share_url = "https://www.facebook.com/sharer/sharer.php?u=" + location.href;
        window.open(share_url, '_blank');
    }
}