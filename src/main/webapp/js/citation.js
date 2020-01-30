function getApaAuthor(authors, editors, organization) {
    while (authors.startsWith(" ")) authors = authors.substr(1);
    while (editors.startsWith(" ")) editors = editors.substr(1);
    while (organization.startsWith(" ")) organization = organization.substr(1);

    //author
    var authorList = authors.split(",");
    var editorsList = editors.split(",");
    var organizationList = organization.split(",");
    var authorFinalList = [];

    for (var i in authorList) {
        var a = authorList[i];
        if (a === "") continue;

        while (a.startsWith(" ")) a = a.substr(1);
        var tmp = a.split(" ");
        if (tmp.length >= 2) {
            a = tmp[tmp.length - 1] + ", "
            for (var i = 0; i < tmp.length - 2; i++) {
                a += tmp[i][0].toUpperCase() + ". ";
            }
            a += tmp[tmp.length - 2][0].toUpperCase() + ".";
        }
        authorFinalList.push(a);
    }

    for (var i in editorsList) {
        var a = editorsList[i];
        if (a === "") continue;

        while (a.startsWith(" ")) a = a.substr(1);
        var tmp = a.split(" ");
        if (tmp.length == 3) {
            a = tmp[2] + ", " +
                tmp[0][0].toUpperCase() + ". " +
                tmp[1][0].toUpperCase() + ".";
        }
        if (tmp.length == 2) {
            a = tmp[1] + ", " +
                tmp[0][0].toUpperCase() + ".";
        }
        a += " (Eds.)."
        authorFinalList.push(a);
    }

    for (var i in organizationList) {
        var a = organizationList[i];
        if (a === "") continue;

        while (a.startsWith(" ")) a = a.substr(1);
        a += ". "
        authorFinalList.push(a);
    }

    var authorFinal = "";
    if (authorFinalList.length > 1) {
        for (var i = 0; i < authorFinalList.length - 1; i++) {
            authorFinal += ", " + authorFinalList[i];
        }
        authorFinal += ", & " + authorFinalList[authorFinalList.length - 1];
        authorFinal = authorFinal.substr(2) + " ";

    } else {
        authorFinal = authorFinalList[0] + " ";
    }

    return authorFinal
}

function getMonth(month) {
    switch (month) {
        case "1": case "01": return "January";
        case "2": case "02": return "February";
        case "3": case "03": return "March";
        case "4": case "04": return "April";
        case "5": case "05": return "May";
        case "6": case "06": return "June";
        case "7": case "07": return "July";
        case "8": case "08": return "August";
        case "9": case "09": return "September";
        case "10": return "October";
        case "11": return "November";
        case "12": return "December";
    }
}

function getApaBook(authors, editors, organization, title, year, edition, publisher, url) {
    while (title.startsWith(" ")) title = title.substr(1);
    while (publisher.startsWith(" ")) publisher = publisher.substr(1);
    while (url.startsWith(" ")) url = url.substr(1);

    var authorFinal = getApaAuthor(authors, editors, organization);

    //year
    if (year !== "")
        year = "(" + year + "). ";

    //title
    if (title !== "") {
        //edition
        if (edition !== "") {
            switch (edition[edition.length - 1]) {
                case "1":
                    edition = " (" + edition + "st ed.)";
                    break;
                case "2":
                    edition = " (" + edition + "nd ed.)";
                    break;
                case "3":
                    edition = " (" + edition + "rd ed.)";
                    break;
                default:
                    edition = " (" + edition + "th ed.)";
            }
            edition += ". "
        } else title += ". "
    }

    //publisher
    if (publisher !== "")
        publisher = publisher + ". ";

    //url
    if (url !== "")
        url = "Retrieved from " + url + ".";

    if (authorFinal.toString() === "undefined " ||
        title == "" ||
        year == "" ||
        (publisher == "" && url == "")
    )
        return "Please type in more information!"
    return authorFinal + year + "<em>" + title + "</em>" + edition + publisher + url;
}

function getApaSite(authors, organization, title, date, siteName, url, retrieved) {
    while (title.startsWith(" ")) title = title.substr(1);
    while (siteName.startsWith(" ")) siteName = siteName.substr(1);
    while (url.startsWith(" ")) url = url.substr(1);

    var authorFinal = getApaAuthor(authors, "", organization);

    //title
    if (title !== "") {
        if (title[title.length - 1] !== "?") title += "."
        title += " "
    }

    //date of pub/up
    if (date !== "") {
        var d = date.split("/");
        if (d.length == 2) {
            date = "(" + d[1] + ", " + getMonth(d[0]) + "). ";
        } else {
            date = "(" + d[2] + ", " + getMonth(d[1]) + " " + d[0] + "). ";
            date = date.replace(" 0", " ")
        }

    } else date = "(n.d.). ";

    //publisher
    if (siteName !== "")
        siteName = siteName + ". ";

    //retrieved
    if (retrieved !== "") {
        var r = retrieved.split("/");

        retrieved = "Retrieved " + getMonth(r[1]) + " " + r[0] + " " + r[2] + ", ";
        retrieved = retrieved.replace(" 0", " ")
        url = "from " + url;
    } else {
        url
    }

    if (authorFinal.toString() === "undefined " ||
        title == "" ||
        url == "" || url == "from "
    )
        return "Please type in more information!"
    return authorFinal + date + "<em>" + title + "</em>" + siteName + retrieved + url;
}
function copyToClip(str) {
    function listener(e) {
        e.clipboardData.setData("text/html", str);
        e.clipboardData.setData("text/plain", str);
        e.preventDefault();
    }

    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    document.getElementById("tt_copy_text").innerHTML = "Copied!";
};

function reset() {
    document.getElementById("tt_copy_text").innerHTML = "Copy";
}


