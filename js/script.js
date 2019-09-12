'use strict';
{
  function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    };

    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement: ', clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    };

    /* [DONE] get 'href' attribute from the clicked link */

    const hrefAttribute = clickedElement.getAttribute('href');
    console.log('href attribute: ', hrefAttribute);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const activeArticle = document.querySelector(hrefAttribute);
    console.log('active article: ', activeArticle);

    /* [DONE] add class 'active' to the correct article */

    activeArticle.classList.add('active');
  }

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

  function generateTitleLinks() {
    console.log('titleLinks created!');

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    function clearMessages() {
      titleList.innerHTML = '';
    }

    clearMessages();

    /* for all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {

      /* [DONE] get the article id */

      const articleID = article.getAttribute('id');
      console.log('article ID: ', articleID);

      /* [DONE] find the article title */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('article title: ', articleTitle);

      /* create HTML of the link */

      /* add link to the titleList */
    }
  }

  generateTitleLinks();

}
