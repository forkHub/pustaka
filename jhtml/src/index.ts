window.onload = () => {
    let form =
        FORM([
            DIV([
                LABEL().forId("exampleEmail1").class("form-label").content("Email Address"),
                INPUT().type("email").class("form-text").id("exampleInputEmail1").setAttr("aria-describedby", "emailHelp"),
                DIV([
                    SPAN().content("We'll never share your email with anyone else.")
                ]).id("emailHelp").class("form-text")
            ]).class("mb-3")
        ]);

    form;
}
