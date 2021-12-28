const treeWalker = document.createTreeWalker(
    document.getElementById('bodyContent'),
    NodeFilter.SHOW_ELEMENT,
    {
        acceptNode: node => {
            const url = window.location.href;
            if (
                // Links only
                node.tagName === 'A'
                // Only block links to other Wikipedia articles and not outside sources
                && node.href.includes('wikipedia.org/wiki')
                // Allow links to special non-article Wikipedia pages (files, help, etc.)
                && !/(Wikipedia:|Portal:|Help:|File:|Special:)/.test(node.href)
                // Allow anchor links within current page for table of contents, references, etc.
                && !node.href.includes(url.substring(0, url.href.includes('#') ? url.indexOf('#') : url.length))
            ) {
                return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_SKIP;
        },
    }
);

// NOTE: Must collect in array as using Element.replaceWith() in place while traversing TreeWalker messes it up
const links = [];
while (treeWalker.nextNode()) {
    links.push(treeWalker.currentNode);
}

for (const link of links) {
    link.replaceWith(link.firstChild);
}
