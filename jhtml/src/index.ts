window.onload = () => {

    let form =
        FORM().childs([
            DIV().class("mb-3").childs([
                LABEL().forId("exampleEmail1").class("form-label").content("Email Address"),
                INPUT().type("email").class("form-text").id("exampleInputEmail1").attr("aria-describedby", "emailHelp"),
                DIV().id("emailHelp").class("form-text").content("We'll never share your email with anyone else.")
            ])
        ])

    Jhtml(form.json());
}

//TODO: child ditaruh di konstruktor
