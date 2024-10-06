
function Jhtml(j: jhtml.IJhtml) {
    return Jhtml(j);
}

function FORM(b: jhtml.Builder[] = []): jhtml.FormBuilder {
    return new jhtml.FormBuilder(b);
}

function DIV(): jhtml.Builder {
    return jhtml.Builder.create("div");
}

function LABEL(b: jhtml.Builder[] = []): jhtml.LabelBuilder {
    return new jhtml.LabelBuilder(b);
}

function INPUT(b: jhtml.Builder[] = []): jhtml.InputBuilder {
    return new jhtml.InputBuilder(b);
}

function SPAN(b: jhtml.Builder[] = []): jhtml.InputBuilder {
    return new jhtml.InputBuilder(b);
}
