const links = document.querySelectorAll('link[rel="import"]')

// Import and add each page to the DOM
Array.prototype.forEach.call(links, function (link) {
    let template = link.import.querySelector('.task-template')
    let clone = document.importNode(template.content, true)
    //On veut que page about.html prennent toute la place
    if (link.href.match('about.html')) {
      document.querySelector('body').appendChild(clone)
    }
    //Ajoute à la balise <main class="content" ... 
    else {
      document.querySelector('.content').appendChild(clone)
    }
  })