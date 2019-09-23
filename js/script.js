'use strict';
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-authorList-link').innerHTML),
  };

  const opts = {
    articleSelector : '.post',
    titleSelector : '.post-title',
    titleListSelector : '.titles',
    articleTagsSelector : '.post-tags .list',
    tagsListSelector : '.tags-wrap .list',
    cloudClassCount : 6,
    cloudClassPrefix : 'tag-size-',
    authorListSelector : '.sidebar-right .authors',
  };

  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenersToAuthors();
  recalculatePostsHeight();

  function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement: ', clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const hrefAttribute = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const activeArticle = document.querySelector(hrefAttribute);

    /* [DONE] add class 'active' to the correct article */

    activeArticle.classList.add('active');

    recalculatePostsHeight();
  }

  function generateTitleLinks(customSelector = '') {
    console.log('titleLinks created!');
    console.log('custom selector: ', customSelector);

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(opts.titleListSelector);

    function clearMessages() {
      titleList.innerHTML = '';
    }

    clearMessages();

    /* for all articles */

    const articles = document.querySelectorAll(opts.articleSelector + customSelector);

    let html = '';

    for (let article of articles) {
      /* [DONE] get the article id */

      const articleID = article.getAttribute('id');

      /* [DONE] find the article title */

      const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

      /* [DONE] create HTML of the link */

      const linkHTMLData = {id: articleID, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      /* [DONE] add link to the titleList */

      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  }

  function recalculatePostsHeight() {

    const posts = document.querySelector('.posts');

    const activeArticle = document.querySelector('.posts article.active');
    const activeArticleHeight = activeArticle.clientHeight;

    posts.style.height = activeArticleHeight + 'px';
  }

  function calculateParams (tags) {
    console.log('minMax object created');

    const minMax = {
      max : 0,
      min : 999,
    };

    for (let tag of Object.keys(tags)) {
      console.log(tag + ' used ' + tags[tag] + ' times');

      if (tags[tag] > minMax.max) {
        minMax.max = tags[tag];
      }
      if (tags[tag] < minMax.min) {
        minMax.min = tags[tag];
      }
    }

    return minMax;
  }

  function calculateTagClass (value, minMax) {
    console.log('class calculated');

    const normalizedValue = value - minMax.min;
    console.log('normalizedvalue: ', normalizedValue);

    const normalizedMax = minMax.max - minMax.min;
    console.log('normalizedMax: ', normalizedMax);

    const percentage = normalizedValue / normalizedMax;
    console.log('percentage: ', percentage);

    const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1);
    console.log('classNumber: ', classNumber);

    const className = opts.cloudClassPrefix + classNumber;
    console.log('className: ', className);

    return className;

  }

  function generateTags() {
    console.log('Tags generated');

    /* create allTags variable with an empty object */
    const allTags = {};
    console.log('allTags: ', allTags);

    /* find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(opts.articleTagsSelector);
      console.log('tags-wrapper: ', tagsWrapper);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const tags = article.getAttribute('data-tags');
      console.log('tags: ', tags);

      /* split tags into array */
      const splitTags = tags.split(' ');
      console.log('split tags: ', splitTags);

      /* START LOOP: for each tag: */
      for (let tag of splitTags) {
        console.log('tag: ', tag);

        /* generate html of the link */
        const tagHTMLData = {tag: tag};
        const tagHtml = templates.tagLink(tagHTMLData);

        /* add generated code to html variable */
        html = html + tagHtml;

        /* check if this link is NOT already in allTags */
        if (!allTags.hasOwnProperty(tag)) {

          /* add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tegs wrapper */
      tagsWrapper.innerHTML = html;
      console.log(tagsWrapper);

    /* END LOOP: for every article */
    }

    /* find list of tags in right column */
    const tagList = document.querySelector(opts.tagsListSelector);

    const tagsParams = calculateParams(allTags);
    console.log('tagsParams: ', tagsParams);

    /* create variable for all links HTML code */
    let allTagsData = {tags: []};

    /* START LOOP: for each tag in allTags */
    for (let tag in allTags) {

      /* generate code of a link and add it to allTagsData */

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag],tagsParams),
      });

    /* END LOOP: for each tag in allTags */
    }

    /*add html from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData: ', allTagsData);

  }

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    console.log('Tag clicked');
    console.log(event);

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement: ', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href of clickedElement: ', href);

    /* make a new constant "tag" and extract tag from "href" constant */
    const tag = href.replace('#tag-','');
    console.log(tag);

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {

      /* remove class active */
      activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attrrribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {

      /* add class active */
      tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function generateTitleLinks with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    console.log('Tag listener works');

    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: foe each link */
    for (let tagLink of tagLinks) {

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click',tagClickHandler);

    /* END LOOP: for each link */
    }

  }

  function generateAuthors() {
    console.log('Authors generated!');

    const allAuthors = {};
    console.log('all authors: ', allAuthors);

    /* find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);

    /* START LOOP: for all articles */
    for (let article of articles) {

      /* find author wrapper */
      const authorWrapper = article.querySelector('.post-author');

      /* make html variable */
      let html = '';

      /* get author from data-author attribute */
      const author = article.getAttribute('data-author');

      /* generate html of the link to the author */
      const authorLinkData = {author: author};
      const authorLink = templates.authorLink(authorLinkData);

      /* add link to html variable */
      html = html + authorLink;

      if (!allAuthors.hasOwnProperty(author)) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }

      /* insert html variable into the author wrapper */
      authorWrapper.innerHTML = html;

      /* END LOOP: for all articles */
    }

    const authorList = document.querySelector(opts.authorListSelector);

    const authorParams = calculateParams(allAuthors);
    console.log('authorParams: ', authorParams);

    let allAuthorsData = {authors: []};

    for (let author in allAuthors) {
      const link = '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
      console.log(link);

      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });
    }

    authorList.innerHTML = templates.authorListLink(allAuthorsData);
    console.log('allAuthorsData: ', allAuthorsData);


  }

  function authorClickHandler (event) {
    console.log(event);
    event.preventDefault();
    console.log('author clicked');

    const clickedElement = this;

    /* make href constant  and get href attribute of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make an author constant and get  author from href constant */
    const author = href.replace('#author-','');

    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for all active author link */
    for (let activeAuthorLink of activeAuthorLinks) {

      /* remove class active */
      activeAuthorLink.classList.remove('active');

    /* END LOOP: for all active author links */
    }

    /* find author links with href attribute equal to the href constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for all author links */
    for (let authorLink of authorLinks) {

      /* add class active */
      authorLink.classList.add('active');

    /* END LOOP: for all author links */
    }

    /* execute generateTitleLinks with author selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  }

  function addClickListenersToAuthors () {
    console.log('Author clicked');

    const authorLinks = document.querySelectorAll('a[href^="#author-"]');

    for (let authorLink of authorLinks) {
      authorLink.addEventListener('click', authorClickHandler);
    }
  }

}
