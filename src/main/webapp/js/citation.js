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
            a = tmp[tmp.length - 1][0].toUpperCase() + tmp[tmp.length - 1].substr(1) + ", "
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
        case "1":
        case "01":
            return "January";
        case "2":
        case "02":
            return "February";
        case "3":
        case "03":
            return "March";
        case "4":
        case "04":
            return "April";
        case "5":
        case "05":
            return "May";
        case "6":
        case "06":
            return "June";
        case "7":
        case "07":
            return "July";
        case "8":
        case "08":
            return "August";
        case "9":
        case "09":
            return "September";
        case "10":
            return "October";
        case "11":
            return "November";
        case "12":
            return "December";
    }
}

function get_apa_book(list) {
    for (var i = 0; i < list.length; i++) {
        while (list[i].startsWith(" ")) list[i] = list[i].substr(1);
    }
    var authors = list[0],
        editors = list[1],
        organization = list[2],
        title = list[3],
        year = list[4],
        edition = list[5],
        publisher = list[6],
        url = list[7];
    if (authors === "" ||
        title === "" ||
        year === "" ||
        (publisher === "" && url === "")
    )
        return "Please type in more information!";

    var authorFinal = getApaAuthor(authors, editors, organization);

    //year
    if (year !== "")
        year = "(" + year + "). ";

    //title
    if (title !== "") {
        //edition
        if (edition !== "") {
            try {
                if (edition[edition.length - 2] === "1") edition = " (" + edition + "th ed.)";
                else throw "ex";
            } catch (e) {
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


    return authorFinal + year + "<em>" + title + "</em>" + edition + publisher + url;
}

function get_apa_website(list) {
    for (var i = 0; i < list.length; i++) {
        while (list[i].startsWith(" ")) list[i] = list[i].substr(1);
    }
    var authors = list[0],
        group = list[1],
        title = list[2],
        date = list[3],
        siteName = list[4],
        url = list[5],
        retrieved = list[6];
    if (authors === " " ||
        title === "" ||
        url === ""
    ) return "Please type in more information!"


    var authorFinal = getApaAuthor(authors, "", group);

    if (title !== "") {
        if (title[title.length - 1] !== "?") title += ".";
        title += " "
    }

    //date of pub/up
    if (date !== "") {
        var d = date.split("/");
        if (d.length === 2) {
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

    return authorFinal + date + "<em>" + title + "</em>" + siteName + retrieved + url;
}

function get_apa_journal(list) {
    for (var i = 0; i < list.length; i++) {
        while (list[i].startsWith(" ")) list[i] = list[i].substr(1);
    }
    var authors = list[0],
        title = list[1],
        year = list[2],
        name = list[3],
        volume = list[4],
        issue = list[5],
        pages = list[6],
        url = list[7];

    if (authors === "" ||
        title === "" ||
        year === "" ||
        name === "" ||
        pages === ""
    ) return "Please type in more information!"

    var authorFinal = getApaAuthor(authors, "", "");

    year = "(" + year + "). ";
    title = title + ". ";

    if (url !== "") url = " Retrieved from " + url;
    if (issue !== "") issue = "(" + issue + "), ";
    else volume = "";
    if (volume === "") issue = "";

    return authorFinal + year + title + name + ", " + volume + issue + pages + "." + url;
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

function createTextBox(name, label, hint, important = false, pattern = '.*') {
    return "<div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label textFieldStyle\"\n" +
        "                 onkeyup=\"updateResult()\">\n" +
        "        <input class=\"mdl-textfield__input\" type=\"text\" id=\"" + name + "-textBox\" pattern=\"" + pattern + "\">\n" +
        "        <label class=\"mdl-textfield__label\" for=\"" + name + "-textBox\" " + (important ? "style=\"color: darkred\"" : "") + ">" + label + "</label>\n" +
        "    <div class=\"mdc-text-field-helper-line\" style=\"text-align: left;white-space:nowrap;overflow: hidden;text-overflow: ellipsis\"><span\n" +
        "class=\"mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg\"\n" +
        "        >" + hint + "</span>\n" +
        "    </div>" +
        "            </div>";
}

function createResultField() {
    return "<div class=\"mdc-chip\" role=\"row\"\n" +
        "             style=\"outline: none;max-width: 100%;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;text-align: left;border-color: #1c7430\"\n" +
        "             id=\"tt-copy\" onclick=copyToClip(document.getElementById('result').innerHTML)>\n" +
        "            <div class=\"mdc-chip__ripple\"></div>\n" +
        "            <span role=\"gridcell\"\n" +
        "                  style=\"outline: none;max-width: 100%;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;text-align: left\">\n" +
        "                    <span id=\"result\" tabindex=\"0\" class=\"mdc-chip__text\" onmouseover=\"reset()\"\n" +
        "                    >Please type in more information!</span>\n" +
        "                </span>\n" +
        "        </div>\n" +
        "        <div class=\"mdl-tooltip\" for=\"tt-copy\" id=\"tt_copy_text\">\n" +
        "        </div>\n" +
        "        <br> <br> <br> <br>\n" +
        "        <div>\n" +
        "            <button onclick=\"clearAll()\" class=\"mdc-button mdc-button--outlined\"\n" +
        "                    style=\"outline: none;color: darkred;border-color: darkred\"><span\n" +
        "                    class=\"mdc-button__ripple\"></span> Clear all\n" +
        "            </button>\n" +
        "        </div>";
}

function createDrawerItems(id, display, icon, currentSelection) {
    return "<a class=\"mdc-list-item" + (id === currentSelection ? " mdc-list-item--activated" : "") + "\" aria-selected=\"true\" id=\""+id+"-btn\" onclick=show(\"" + id + "\")>\n" +
        "<i class=\"material-icons mdc-list-item__graphic\" aria-hidden=\"true\">" + icon + "</i>\n" +
        " <span class=\"mdc-list-item__text\">" + display + "</span>\n" +
        "</a>\n";
}

function createIFrame(id) {
    return "<iframe id=\"" + id + "\" class=\"iframeClass\" onload=\"resizeIframe(this)\" src=\"\"></iframe>";
}

function clearAll() {
    for (var i = 0; i < list.length; i++) {
        list[i].value = "";
        list[i].parentNode.classList.remove("is-dirty");
    }
    document.getElementById('result').innerHTML = "Please type in more information!";
}

function undoClear() {
    for (var i = 0; i < list.length; i++) {
        list[i].value = lastValue[i];
    }
    updateResult();
}