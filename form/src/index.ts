namespace Form {
    export function init() {
        document.querySelectorAll("form").forEach((item) => {
            item;
        });

        document.querySelectorAll("a").forEach((link) => {
            if (link.getAttribute('confirm')) {
                link.onclick = (e) => {
                    e.preventDefault();

                    let ok = confirm(link.getAttribute('confirm'));
                    if (ok) {
                        window.location.href = link.getAttribute('href');
                    }
                }
            }
        });
    }
}