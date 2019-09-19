'use strict';
{

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';

  generateTitleLinks();
  recalculatePostsHeight();
  generateTags();
  addClickListenersToTags();

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
    console.log('href attribute: ', hrefAttribute);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const activeArticle = document.querySelector(hrefAttribute);
    console.log('active article: ', activeArticle);

    /* [DONE] add class 'active' to the correct article */

    activeArticle.classList.add('active');

    recalculatePostsHeight();
  }

  function generateTitleLinks(customSelector = '') {
    console.log('titleLinks created!');
    console.log('custom selector: ', customSelector);

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    function clearMessages() {
      titleList.innerHTML = '';
    }

    clearMessages();

    /* for all articles */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('articles: ')

    let html = '';

    for (let article of articles) {
      /* [DONE] get the article id */

      const articleID = article.getAttribute('id');
      console.log('article ID: ', articleID);

      /* [DONE] find the article title */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('article title: ', articleTitle);

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* [DONE] add link to the titleList */

      html = html + linkHTML;
      console.log(html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links: ', links);

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

  function generateTags() {
    console.log('Tags generated');

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
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
        const tagHtml = '<li><a href="#tag-' + tag + '">' + tag +'</a></li>';
        console.log(tagHtml);

        /* add generated code to html variable */
        html = html + tagHtml;

      /* END LOOP: fo each tag */
      }

      /* insert HTML of all the links into the tegs wrapper */
      tagsWrapper.innerHTML = html;
      console.log(tagsWrapper);

    /* END LOOP: for every article */
    }

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
    console.log('tagLinks: ', tagLinks);

    /* START LOOP: foe each link */
    for (let tagLink of tagLinks) {

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click',tagClickHandler);

    /* END LOOP: for each link */
    }

  }

}
