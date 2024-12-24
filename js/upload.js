function reportInfo(vars, showType = false) {
    if (showType === true) console.log(typeof vars);
    console.log(vars);
}

function addImg(ele, content) {
    var myDIV = document.querySelector(ele);
    var newContent = document.createElement('div');
    newContent.innerHTML = content;

    while (newContent.firstChild) {
        myDIV.appendChild(newContent.firstChild);
    }
}

var feedback = function(res) {
    reportInfo(res, true); // Logs the response and its type
    if (res.success === true) {
        // Get the secure link
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        
        // Add success styling to the status element
        document.querySelector('.status').classList.add('bg-success');
        
        // Set the link in the input field with ID 'imgLink'
        var imgLinkInput = document.getElementById('imgLink');
        if (imgLinkInput) {
            imgLinkInput.value = get_link; // Set the value of the input field to the link
        } else {
            console.error("Input field with ID 'imgLink' not found.");
        }
        
        // Optionally, display the image below the input field for preview
        var content = '<img class="img" alt="Imgur-Upload" src="' + get_link + '"/>';
        addImg('.status', content);
    }
};


new Imgur({
    clientid: 'd4fcd1602b1dd56', //You can change this ClientID
    callback: feedback
});
