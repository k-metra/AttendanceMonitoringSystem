export function getCsrfToken() {
    let csrf = null

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split("; ");

        for (var i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();

            if (cookie.startsWith("csrftoken=")) {
                csrf = cookie.substring(("csrftoken=").length);
                break;
            }
        }
    }

    return csrf;
}