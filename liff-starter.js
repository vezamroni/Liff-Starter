/*
Author :
- https://github.com/crash-override404
Thanks to :
- https://github.com/RynKings
- https://github.com/ari-yk
*/
window.onload = function() {
    initVConsole(), initContent(), initLiff()
};
var HttpClient = function() {
    this.get = function(e, t) {
        var a = new XMLHttpRequest;
        a.onreadystatechange = function() {
            4 == a.readyState && 200 == a.status && t(a.responseText)
        }, a.open("GET", e, !0), a.send(null)
    }
};

function initVConsole() {
    window.vConsole = new window.VConsole({
        defaultPlugins: ["system", "network", "element", "storage"],
        maxLogNumber: 1e3,
        onReady: function() {
            console.log("vConsole is ready.")
        },
        onClearLog: function() {
            console.log("on clearLog")
        }
    })
}

function initLiff() {
    console.log("going to initialize LIFF"), liff.init(e => {
        console.log("LIFF initialized!");
        e.context.userId;
        liff.getProfile().then(e => {
            const t = e.displayName;
            console.info("User name is", t), "yes" == getParameterByName("auto") && sendLiffMessage(), document.getElementById("greet").innerHTML = "Hi, " + t + " à±¼ Nice to meet you"
        }).catch(e => {
            console.error("LIFF getProfile failed", e)
        })
    }, e => {
        console.error("LIFF initialization failed", e)
    })
}

function changeType() {
    var e = document.getElementById("type").value;
    removeElements("form-label-group"), initContent(e)
}

function initContent(e) {
    e || (e = getParameterByName("type")) && (document.getElementById("type").value = e);
    var t = document.getElementById("content");
    if ("text" == e) {
        var a = document.createElement("div"),
            n = document.createElement("input"),
            l = document.createElement("label");
        a.className = "form-label-group", a.id = "data", n.type = "text", n.id = "text", n.className = "form-control", n.placeholder = "Text message", n.required = !0, getParameterByName("text") && (n.value = getParameterByName("text")), l.htmlFor = "text", l.innerHTML = "Text message", a.appendChild(n), a.appendChild(l), t.insertBefore(a, t.childNodes[4])
    } else if ("sticker" == e || "stickerimage" == e) {
        a = document.createElement("div"), n = document.createElement("input"), l = document.createElement("label");
        a.className = "form-label-group", a.id = "data", n.type = "text", n.id = "packageId", n.className = "form-control", n.placeholder = "Text message", n.required = !0, getParameterByName("packageId") && (n.value = getParameterByName("packageId")), l.htmlFor = "packageId", l.innerHTML = "Sticker Package ID", a.appendChild(n), a.appendChild(l), t.insertBefore(a, t.childNodes[4]), a = document.createElement("div"), n = document.createElement("input"), l = document.createElement("label"), a.className = "form-label-group", a.id = "data", n.type = "text", n.id = "stickerId", n.className = "form-control", n.placeholder = "Preview image url", n.required = !0, getParameterByName("stickerId") && (n.value = getParameterByName("stickerId")), l.htmlFor = "stickerId", l.innerHTML = "Sticker ID", a.appendChild(n), a.appendChild(l), t.insertBefore(a, t.childNodes[4]), a = document.createElement("div"), checkbox = document.createElement("div"), n = document.createElement("input"), l = document.createElement("label"), checkbox.className = "form-label-group", checkbox.id = "data", a.className = "custom-control custom-checkbox", n.type = "checkbox", n.id = "animation", n.className = "custom-control-input", "yes" == getParameterByName("animation") && (n.checked = !0), l.htmlFor = "animation", l.className = "custom-control-label", l.innerHTML = "Animation", a.appendChild(n), a.appendChild(l), checkbox.appendChild(a), t.insertBefore(checkbox, t.childNodes[4])
    } else if ("image" == e || "video" == e) {
        a = document.createElement("div"), n = document.createElement("input"), l = document.createElement("label");
        a.className = "form-label-group", a.id = "data", n.type = "text", n.id = "downloadUrl", n.className = "form-control", n.placeholder = "Original content url", n.required = !0, getParameterByName("downloadUrl") && (n.value = getParameterByName("downloadUrl")), l.htmlFor = "downloadUrl", l.innerHTML = "Download URL", a.appendChild(n), a.appendChild(l), t.insertBefore(a, t.childNodes[4]), a = document.createElement("div"), n = document.createElement("input"), l = document.createElement("label"), a.className = "form-label-group", a.id = "data", n.type = "text", n.id = "previewUrl", n.className = "form-control", n.placeholder = "Preview image url", n.required = !0, getParameterByName("previewUrl") && (n.value = getParameterByName("previewUrl")), l.htmlFor = "previewUrl", l.innerHTML = "Preview URL", a.appendChild(n), a.appendChild(l), t.insertBefore(a, t.childNodes[4])
    } else if ("audio" == e) {
        a = document.createElement("div"), n = document.createElement("input"), l = document.createElement("label");
        a.className = "form-label-group", a.id = "data", n.type = "text", n.id = "downloadUrl", n.className = "form-control", n.placeholder = "Original content url", n.required = !0, getParameterByName("downloadUrl") && (n.value = getParameterByName("downloadUrl")), l.htmlFor = "downloadUrl", l.innerHTML = "Download URL", a.appendChild(n), a.appendChild(l), t.insertBefore(a, t.childNodes[4])
    } else if ("messages" == e) {
        a = document.createElement("div");
        var o = document.createElement("textarea");
        a.className = "form-label-group", a.id = "data", o.id = "messages", o.className = "form-control", o.placeholder = "Messages json", o.rows = "5", getParameterByName("messages") && (o.value = getParameterByName("messages")), a.appendChild(o), t.insertBefore(a, t.childNodes[4])
    } else if ("messagesUrl" == e) {
        a = document.createElement("div"), n = document.createElement("input"), l = document.createElement("label");
        a.className = "form-label-group", a.id = "data", n.type = "text", n.id = "messagesUrl", n.className = "form-control", n.placeholder = "Messages json url", n.required = !0, getParameterByName("messagesUrl") && (n.value = getParameterByName("messagesUrl")), l.htmlFor = "messagesUrl", l.innerHTML = "Messages JSON URL", a.appendChild(n), a.appendChild(l), t.insertBefore(a, t.childNodes[4])
    }
}

function sendLiffMessage() {
    var e = document.getElementById("type").value;
    console.info(e);
    var t = new HttpClient;
    liff.getProfile().then(a => {
        const n = a.displayName;
        if ("profile" == e) liff.sendMessages([{
            type: "flex",
            altText: "Profile " + n,
            contents: {
                type: "bubble",
                hero: {
                    type: "image",
                    url: a.pictureUrl,
                    size: "full",
                    aspectRatio: "1:1",
                    aspectMode: "cover",
                    action: {
                        type: "uri",
                        uri: "line://app/1602289196-4xoE1JEr?auto=yes&type=image&downloadUrl=" + a.pictureUrl + "&previewUrl=" + a.pictureUrl
                    }
                },
                body: {
                    type: "box",
                    layout: "vertical",
                    contents: [{
                        type: "text",
                        text: n,
                        align: "center",
                        weight: "bold",
                        size: "xl"
                    }, {
                        type: "box",
                        layout: "vertical",
                        margin: "lg",
                        spacing: "sm",
                        contents: [{
                            type: "text",
                            text: a.statusMessage,
                            wrap: !0,
                            color: "#666666",
                            size: "sm",
                            flex: 5
                        }]
                    }]
                },
                footer: {
                    type: "box",
                    layout: "horizontal",
                    spacing: "sm",
                    contents: [{
                        type: "button",
                        style: "primary",
                        height: "sm",
                        color: "#02afff",
                        action: {
                            type: "uri",
                            label: "Square",
                            uri: "https://line.me/ti/g2/JGUODBE4RE"
                        },
                        flex: 1
                    }, {
                        type: "button",
                        style: "primary",
                        height: "sm",
                        action: {
                            type: "uri",
                            label: "Profile",
                            uri: "line://app/1602289196-4xoE1JEr?type=profile"
                        },
                        flex: 2
                    }, {
                        type: "spacer",
                        size: "sm"
                    }],
                    flex: 0
                }
            }
        }]).then(() => {
            console.log("Success sending message"), liff.closeWindow()
        }).catch(e => {
            console.error("Sending message failed", e)
        });
        else if ("text" == e) console.log("Start sending message"), liff.sendMessages([{
            type: "text",
            text: document.getElementById("text").value
        }]).then(() => {
            console.log("Success sending message"), liff.closeWindow()
        }).catch(e => {
            console.error("Sending message failed", e)
        });
        else if ("primary" == e) console.log("please wait!"), accessToken = liff.getAccessToken(), liff.sendMessages([{
            type: "text",
            text: "your primary token : " + accessToken
        }]).then(() => {
            console.log("Success getting your primary token"), liff.closeWindow()
        }).catch(e => {
            console.error("Getting primary token failed", e)
        });
        else if ("sticker" == e) console.log("Start sending message"), liff.sendMessages([{
            type: "sticker",
            packageId: document.getElementById("packageId").value,
            stickerId: document.getElementById("stickerId").value
        }]).then(() => {
            console.log("Success sending message"), liff.closeWindow()
        }).catch(e => {
            console.error("Sending message failed", e)
        });
        else if ("stickerimage" == e) console.log("Start sending message"), stickerId = document.getElementById("stickerId").value, packageId = document.getElementById("packageId").value, animation = document.getElementById("animation").checked, 1 == animation ? imageUrl = "https://stickershop.line-scdn.net/stickershop/v1/sticker/" + stickerId + "/IOS/sticker_animation@2x.png" : imageUrl = "https://stickershop.line-scdn.net/stickershop/v1/sticker/" + stickerId + "/IOS/sticker@2x.png", liff.sendMessages([{
            type: "template",
            altText: n + " sent a sticker.",
            template: {
                type: "image_carousel",
                columns: [{
                    imageUrl: imageUrl,
                    action: {
                        type: "uri",
                        uri: "line://shop/sticker/detail/" + packageId
                    }
                }]
            }
        }]).then(() => {
            console.log("Success sending message"), liff.closeWindow()
        }).catch(e => {
            console.error("Sending message failed", e)
        });
        else if ("image" == e) console.log("Start sending message"), liff.sendMessages([{
            type: "image",
            originalContentUrl: document.getElementById("downloadUrl").value,
            previewImageUrl: document.getElementById("previewUrl").value
        }]).then(() => {
            console.log("Success sending message"), liff.closeWindow()
        }).catch(e => {
            console.error("Sending message failed", e)
        });
        else if ("video" == e) console.log("Start sending message"), liff.sendMessages([{
            type: "video",
            originalContentUrl: document.getElementById("downloadUrl").value,
            previewImageUrl: document.getElementById("previewUrl").value
        }]).then(() => {
            console.log("Success sending message"), liff.closeWindow()
        }).catch(e => {
            console.error("Sending message failed", e)
        });
        else if ("audio" == e) console.log("Start sending message"), liff.sendMessages([{
            type: "audio",
            originalContentUrl: document.getElementById("downloadUrl").value,
            duration: 6e4
        }]).then(() => {
            console.log("Success sending message"), liff.closeWindow()
        }).catch(e => {
            console.error("Sending message failed", e)
        });
        else if ("messages" == e) {
            console.log("Start sending message");
            var l = JSON.parse(document.getElementById("messages").value);
            liff.sendMessages(l).then(() => {
                console.log("Success sending message"), liff.closeWindow()
            }).catch(e => {
                console.error("Sending message failed", e)
            })
        } else if ("messagesUrl" == e) {
            console.log("Start sending message");
            var o = document.getElementById("messagesUrl").value;
            t.get(o, function(e) {
                var t = JSON.parse(e);
                liff.sendMessages(t).then(() => {
                    console.log("Success sending message"), liff.closeWindow()
                }).catch(e => {
                    console.error("Sending message failed", e)
                })
            }).catch(e => {
                console.error("Parsing messages failed", e)
            })
        }
    }).catch(e => {
        console.error("LIFF getProfile failed", e)
    })
}

function getParameterByName(e, t) {
    t || (t = window.location.href), e = e.replace(/[\[\]]/g, "\\$&");
    var a = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
    return a ? a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : "" : null
}

function removeElements(e) {
    for (var t = document.getElementsByClassName(e), a = t.length - 1; 0 <= a; a--) t[a] && t[a].parentElement && t[a].id && "data" == t[a].id && t[a].parentElement.removeChild(t[a])
}
