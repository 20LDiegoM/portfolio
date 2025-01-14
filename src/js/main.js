import "../sass/style.scss";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Tema de Highlight.js

function escapeHTMLPreservePHP(code) {
    return code
        .replace(/&(?!#?\w+;)/g, "&amp;") // Escapar & (excepto si ya es una entidad)
        .replace(/</g, "&lt;") // Escapar <
        .replace(/>/g, "&gt;"); // Escapar >
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre code").forEach((block) => {
        if (block.classList.contains("language-html")) {
            const originalCode = block.innerHTML;
            block.innerHTML = escapeHTMLPreservePHP(originalCode);
        }

        hljs.highlightElement(block);
    });
});
