package com.ebot.ebotsite;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URL;

@WebServlet("/Citation")
public class CitationPage extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject jsonObject = new JSONObject();
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String[] parts = request.getQueryString().split("&");

            for (String part : parts) {
                String[] keyVal = part.split("="); // The equal separates key and values
                jsonObject.put(keyVal[0], keyVal[1]);
            }
        } catch (Exception ignore) {
        }
        if (!jsonObject.containsKey("language")) jsonObject.put("language", "en");
        if (!jsonObject.containsKey("type")) jsonObject.put("type", "");
        out.println(getBody(request.getContextPath(), (String) jsonObject.get("language"), (String) jsonObject.get("type")));
    }

    private String getHome(){
        return "";
    }

    private String getBody(String path, String language, String type) {
        try {
            return "<!DOCTYPE html>\n" +
                    "<html lang=\"en\">\n" +
                    "\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <meta name=\"viewport\"\n" +
                    "          content=\"width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0\">\n" +
                    "    <link rel=\"stylesheet\" href=\"" + path + "/css/style.css\">\n" +
                    "    <link rel=\"stylesheet\" href=\"" + path + "/css/citation.css\">\n" +
                    "    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\">\n" +
                    "    <link rel=\"stylesheet\" href=\"https://code.getmdl.io/1.3.0/material.grey-orange.min.css\"/>\n" +
                    "    <link rel=\"stylesheet\" href=\"https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css\">\n" +
                    "\n" +
                    "    <script defer src=\"https://code.getmdl.io/1.3.0/material.min.js\"></script>\n" +
                    "    <script src=\"https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js\"></script>\n" +
                    "    <script src=\"" + path + "/js/jquery.min.js\"></script>\n" +
                    "    <script src=\"" + path + "/js/citation.js\"></script>\n" +
                    "</head>\n" +

                    "<body class=\"framePadding\">\n" +
                    "<form id=\"form\">\n" +
                    "    <div class=\"border\" style=\"padding: 8px 16px 0 16px\" id=\"box\">\n" +
                    "        <label>"+(language.equals("vi")?"Các ô xanh là quan trọng (bỏ qua nếu không tìm thấy)":"Field with blue text is recommended")+"</label>\n" +
                    "    </div>\n" +
                    "    <br>\n" +
                    "    <!-- Result -->\n" +
                    "</form>\n" +
                    "<script>\n" +
                    "    mdc.autoInit();\n" + loadUI(language, type) +
                    "    document.body.innerHTML += createResultField();\n" +
                    "\n" +
                    "    var list = document.getElementsByClassName(\"mdl-textfield__input\");\n" +
                    "    var lastValue = [];\n" +
                    "\n" +
                    "    function updateResult() {\n" +
                    "        for (var i = 0; i < list.length; i++) {\n" +
                    "            lastValue[i] = list[i].value;\n" +
                    "        }\n" +
                    "        document.getElementById('result').innerHTML = get_" + type.toLowerCase().replace("-", "_") + "(lastValue);\n" +
                    "    }\n" +
                    "</script>\n" +
                    "</body>\n" +
                    "</html>";
        } catch (Exception ignored) {

            return "<!DOCTYPE html>\n" +
                    "<html lang=\"en\">\n" +
                    "\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0\">\n" +
                    "\n" +
                    "    <link rel=\"stylesheet\" href=\"" + path + "/css/style.css\">\n" +
                    "    <link rel=\"stylesheet\" href=\"" + path + "/css/citation.css\">\n" +
                    "    <link rel=\"stylesheet\" href=\"https://code.getmdl.io/1.3.0/material.grey-orange.min.css\"/>\n" +
                    "</head>\n" +

                    "<body>\n" +
                    "<div class=\"framePadding\">\n" +
                    "    <br>\n" +
                    "    <p>\n" +
                    "        <img class=\"responsive\" src=\"" + path + "/images/Black_Man_Working_at_his_Laptop_on_the_Couch_Cartoon_Vector.svg\"  style=\"max-height:384px;\n" +
                    "    max-width:384px;\n" +
                    "    height:auto;\n" +
                    "    width:auto;\"\n" +
                    "             alt=\"\">\n" +
                    "    </p>\n" +
                    "    <h3>We are working on it!</h3>\n" +
                    "</div>\n" +
                    "<script>console.log(\"" + ignored + "\")</script>" +
                    "</body>\n" +
                    "</html>";
        }
    }


    private String getTypeName(String type) {
        StringBuilder ret = new StringBuilder("");
        String[] tmp = type.split("-");
        for (int i = 1; i < tmp.length; i++) {
            ret.append(tmp[i].substring(0, 1).toUpperCase());
            ret.append(tmp[i].substring(1));
        }
        return ret.toString();
    }


    public static String loadUI(String language, String type) throws Exception {
        JSONParser jsonParser = new JSONParser();
        StringBuilder ret = new StringBuilder();
        JSONObject userConfig = null;
//        try {
//            InputStream inputStream =
//                    language.equals("en") ?
//                            new URL("https://drive.google.com/uc?id=1GqseULu2RpZ6eD0svN7E2s5MekC_xXX4&export=download").openStream() :
//                            new URL("").openStream();
//            userConfig = (JSONObject) jsonParser.parse(new InputStreamReader(inputStream));
//            ret.append("console.log(\"Updated UI\");");
//        } catch (Error e) {
        InputStream stream = new URL(CitationPage.class.getClassLoader().getResource("../.."), "res/CitationUI_"+language+".json").openConnection().getInputStream();
        userConfig = (JSONObject) jsonParser.parse(new InputStreamReader(stream,"UTF-8"));
//        }


        JSONArray array = (JSONArray) userConfig.get(type);
        int tmp=1;
        for (int i = 0; i < array.size(); i++) {
            JSONObject obj = (JSONObject) array.get(i);
            if(Integer.parseInt((String) obj.get("Number")) > tmp){
                tmp = Integer.parseInt((String) obj.get("Number"));
                ret.append("document.getElementById(\"box\").innerHTML += \"<br><br>\";");
            }
            ret.append("document.getElementById(\"box\").innerHTML += ").append("createTextBox(").append("\"").append(i).append("\",").append("\"").append(obj.get("Display")).append("\",").append("\"").append(obj.get("Hint")).append("\",").append("\"").append(obj.get("Number")).append("\",").append(obj.get("Important").toString().toLowerCase()).append(",").append("\"").append(obj.get("Pattern")).append("\");");
        }
        return ret.toString();
    }
}