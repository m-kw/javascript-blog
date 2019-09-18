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
  }

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';

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

    /* mobile version */

    const mobileList = document.querySelector('.mobile-list');
    mobileList.innerHTML = html;

    const mobileLinks = document.querySelectorAll('.mobile-list a');

    for (let mobileLink of mobileLinks) {
      mobileLink.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

  function recalculatePostsHeight() {
    console.log('Recalculation done!');

    /* find active article and its height */

    const activeArticle = document.querySelector('.posts article.active');
    console.log('active article: ', activeArticle);

    const activeArticleHeight = activeArticle.clientHeight;
    console.log('active article height: ', activeArticleHeight);

    /* find posts section and give it article's height */

    const posts = document.querySelector('.posts');
    let postsHeight = posts.clientHeight;
    console.log('posts height: ', postsHeight);

    posts.style.height = activeArticleHeight + 'px';


    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', recalculatePostsHeight);
    }

    /* mobile version */

    const mobileLinks = document.querySelectorAll('.mobile-list a');

    for (let mobileLink of mobileLinks) {
      mobileLink.addEventListener('click', recalculatePostsHeight);
    }
  }

  recalculatePostsHeight();

}
