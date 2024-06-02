

const css = {
  "normal": "/* Nothing to do */",
  "hidden": `
ytd-thumbnail, ytd-playlist-thumbnail, .rich-thumbnail, .ytd-playlist-header-renderer.thumbnail-wrapper, #thumbnail, #video-preview, ytm-media-item .media-item-thumbnail-container, ytm-reel-item-renderer .video-thumbnail-container-vertical, ytm-playlist-video-renderer .compact-media-item-image, .ytp-videowall-still-image {
  display: none !important;
}
ytm-reel-shelf-renderer .reel-shelf-items>* {
  height: auto !important;
  align-items: flex-start !important;
}
ytm-reel-item-renderer .reel-item-metadata {
  position: static !important;
}
.ytp-videowall-still-info-content {
  opacity: 1 !important;
}`,
  "hidden-except-hover": `
ytd-thumbnail {
  transition: 0.25s ease-in all;
  overflow: hidden;
  max-height: 400px;
  max-width: 360px;
}

ytd-rich-item-renderer:not(:hover) ytd-thumbnail,
ytd-grid-video-renderer:not(:hover) ytd-thumbnail,
ytd-playlist-video-renderer:not(:hover) ytd-thumbnail {
  max-height: 0px !important;
  min-height: 0px !important;
}

ytd-playlist-video-renderer:not(:hover) ytd-thumbnail,
.ytd-item-section-renderer:not(:hover) ytd-thumbnail {
  max-width: 0px !important;
  min-width: 0px !important;
}

.ytd-ghost-grid-renderer.rich-thumbnail,
.skeleton-bg-color.rich-thumbnail,
.ytd-playlist-header-renderer.thumbnail-wrapper,
.ytp-videowall-still:not(:hover) .ytp-videowall-still-image,
#video-preview {
  display: none !important;
}

.ytp-videowall-still-info-content {
  opacity: 1 !important;
}`,
  "blurred": `ytd-thumbnail img, ytd-playlist-thumbnail img, .video-thumbnail-img, .ytp-videowall-still-image {
  filter: blur(16px);
}`,
  "solid-color": `
.yt-core-image {
  display: none !important;
  background-color: var(--yt-spec-additive-background);
}

ytd-thumbnail.style-scope.ytd-compact-video-renderer {
  background-color: var(--yt-spec-additive-background);
  border-radius: 1rem;
}

ytd-thumbnail #thumbnail.ytd-thumbnail {
  background-color: var(--yt-spec-additive-background);
}

.ytp-videowall-still-image {
  background-color: var(--yt-spec-static-overlay-filled-hover);
  background-image: none !important;
}
.ytp-videowall-still-info-content {
  opacity: 1 !important;
}`,
};


const thumbnailsElem = document.createElement("style");
document.documentElement.appendChild(thumbnailsElem);

// Homescreen elements
const videoContentCSS = {
  'inject': `#contents.style-scope.ytd-rich-grid-renderer{
  display: none;
}
#related.style-scope.ytd-watch-flexy{
  display: none;
},`,
  'noInject': `{
  display: flex;
}
#related.style-scope.ytd-watch-flexy{
  display: none;
}
`
};
const videoContentElem = document.createElement("style");
document.documentElement.appendChild(videoContentElem);

const suggestionsFeedCSS = {
  'inject': `#header.style-scope.ytd-rich-grid-renderer{
  display: none;
},
#scroll-container.style-scope.yt-chip-cloud-renderer{
  display: none;
}`,

  'noInject': `{
  display: flex;
},
#scroll-container.style-scope.yt-chip-cloud-renderer{
  display: none;
}`
};
const suggestionsFeedElem = document.createElement("style");
document.documentElement.appendChild(suggestionsFeedElem);

// Sidebar Elements
const updateSidebarElem = async () => {
  const options = await loadOptions();

  // Block shorts
  const anchorShorts = document.querySelectorAll('a[title="Shorts"]');
  anchorShorts.forEach(element => {
    // Access the parent class of each <a> element to delete the container of the shorts tabs
    const anchorShort = element.parentElement;
    if (options.shortsTab) { anchorShort.style.display = 'none'; }
  });

  const anchorSubscriptions = document.querySelectorAll('a[title="Subscriptions"]');

  // Subscriptions
  anchorSubscriptions.forEach(element => {
    const anchorSubscription = element.parentElement;
    if (options.subscriptionsTab) { anchorSubscription.style.display = 'none'; }
  });

  // Explore section
  const sections = document.getElementById('sections');
  const exploreTab = sections.children[1];
  if(options.exploreTab){exploreTab.style.display = 'none';}  


}

button = document.querySelector('div#start.style-scope.ytd-masthead');

// Views, subs, and comments
const viewsElemOne = document.createElement("style");
document.documentElement.appendChild(viewsElemOne);


const viewsFunc = async () => {
  const options = await loadOptions();
  const parentViews = document.querySelectorAll("div#metadata-line.style-scope.ytd-video-meta-block");
  parentViews.forEach(parent => {
    const viewsAddCSS = parent.children[2];
    viewsAddCSS.style = '';
    viewsAddCSS.classList.add("views-only-123");
  })
  const viewsCSSOne = {
    'inject': `.views-only-123{
      display: none !important;
    }`
  }
  if (options.views) { viewsElemOne.innerHTML = `${viewsCSSOne['inject']}` };

  try {
    const watchViews = document.querySelector('#info.style-scope.ytd-watch-info-text').firstElementChild;
    watchViews.style = '';
    watchViews.classList.add("views-only-123");
  } catch (e) {
    console.log();
  }
}

const subsElem = document.createElement("style");
document.documentElement.appendChild(subsElem);

const subsFunc = async () => {
  const options = await loadOptions();
  if (window.location.pathname.startsWith('/@')) {
    const subsChan = document.querySelector('#subscriber-count.style-scope.ytd-c4-tabbed-header-renderer');
    subsChan.style = '';
    subsChan.classList.add("subs-123");
  }
  if (window.location.pathname === '/watch') {
    const subsView = document.querySelector('#owner-sub-count.style-scope.ytd-video-owner-renderer');
    subsView.style = '';
    subsView.classList.add('subs-123');
    descDel();
  }
  const subsCSS = {
    'inject': `.subs-123{
      display: none !important
    }`
  }

  if (options.subscribers) { subsElem.innerHTML = `${subsCSS['inject']}` };
}

const commentsElem = document.createElement("style");
document.documentElement.appendChild(commentsElem);
const commentsCSS = {
  'inject': `#comments.style-scope.ytd-watch-flexy{
    display: none !important    
  }`
}

// Function for shorts and subs

function descDel() {
  const moreButton = document.querySelector('#description-inner.style-scope.ytd-watch-metadata');
  moreButton.addEventListener("click", function () {
    const desc = document.querySelector('ytd-video-description-infocards-section-renderer.style-scope.ytd-structured-description-content-renderer[at-start][at-end]');
    desc.remove();
  });
}

function endscreen() {
  for (let i of document.getElementsByClassName('ytp-endscreen-content')) { // removes all suggestions at the video end
    i.remove();
  }
  for (let i of document.getElementsByClassName('ytp-upnext ytp-suggestion-set')) { // removes next autoplay video
    i.remove();
  }
}


// Shorts
const removeShorts = () => {
  Array.from(document.querySelectorAll(`a[href^="/shorts"]`)).forEach(a => {
    let parent = a.parentElement;

    while (parent && (!parent.tagName.startsWith('YTD-') || parent.tagName === 'YTD-THUMBNAIL')) {
      parent = parent.parentElement;
    }

    if (parent) {
      parent.remove();
    }
  });
};

const observeAndRemoveShorts = () => {
  const observer = new MutationObserver(removeShorts);
  observer.observe(document, {
    childList: true,
    subtree: true,
  });

  removeShorts();
};



const updateElem = async () => {
  const options = await loadOptions();
  thumbnailsElem.innerHTML = `/* Injected by the Hide YouTube Thumbnails extension */ ${css[options.thumbnails]}`;
  if (options.videoContent) { videoContentElem.innerHTML = `${videoContentCSS[window.location.pathname.startsWith('/@') ? 'noInject' : 'inject']}` };
  if (options.suggestionsFeed) { suggestionsFeedElem.innerHTML = `${suggestionsFeedCSS[window.location.pathname.startsWith('/@') ? 'noInject' : 'inject']}`; }
  updateSidebarElem();
  viewsFunc();
  subsFunc();
  if (options.comments && window.location.pathname === '/watch') { commentsElem.innerHTML = `${commentsCSS['inject']}` };
  if (options.endScreen && window.location.pathname === '/watch') {
    observeDOM(document, () => {
      endscreen();
    });
  }
  if (options.shorts) { observeAndRemoveShorts() };
};


// Update when settings are changed
chrome.storage.onChanged.addListener(updateElem)

// Update when width changes or button is pressed
window.addEventListener('resize', updateElem);
button.addEventListener('click', updateSidebarElem);

// Update when moving page
// https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API
let lastPathname = window.location.pathname;
setInterval(() => {
  if (lastPathname !== window.location.pathname) {
    lastPathname = window.location.pathname
    updateElem();
  }
}, 3000);



// Initialize on load
updateElem()



// from https://stackoverflow.com/a/14570614
const observeDOM = (function () {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function (obj, callback) {
    if (!obj || !obj.nodeType === true) {
      return;
    }
    if (MutationObserver) {
      const obs = new MutationObserver(function (mutations) {
        if (mutations[0].addedNodes.length)
          callback(mutations[0]);
      });
      obs.observe(obj, { childList: true, subtree: true });
    } else if (window.addEventListener) {
      obj.addEventListener('DOMNodeInserted', callback, false);
    }
  }
})();

