function getApaBook(authors, editors, organization, title, year, edition, publisher, url) {
    while (authors.startsWith(" ")) authors = authors.substr(1);
    while (editors.startsWith(" ")) editors = editors.substr(1);
    while (organization.startsWith(" ")) organization = organization.substr(1);
    while (title.startsWith(" ")) title = title.substr(1);
    while (publisher.startsWith(" ")) publisher = publisher.substr(1);
    while (url.startsWith(" ")) url = url.substr(1);

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
            a += tmp[tmp.length-2][0].toUpperCase() + ".";
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
    console.log("---")
    console.log(authorFinal)
    console.log(year)
    console.log(title)
    console.log(edition)
    console.log(publisher)
    console.log(url)
    return authorFinal + year + "<em>" + title + "</em>" + edition + publisher + url;
}