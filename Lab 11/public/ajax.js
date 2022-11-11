(function($) {
    
    let requestConfig ={
        method: 'get',
        url: 'http://api.tvmaze.com/shows'
    }

    let output=document.getElementById('output'),
    ul=document.getElementById('showList'),
    sDiv=document.getElementById('show'),
    searchTerm=document.getElementById('search_term'),
    submitBtn=document.getElementById('submitBtn'),
    error=document.getElementById('error'),
    homeLink=document.getElementById('homeLink');

    //Page load:
    $.ajax(requestConfig).then(function (responseMessage) {
        output.hidden=false;
        ul.hidden=true;
        for (let element of responseMessage){
            //create list items of links for each show
            let li=document.createElement('li');
            li.classList="show"

            let a= document.createElement('a');

            //href attribute be set to the url for that show from the TV Maze API
            a.setAttribute("href",element._links.self.href)

            //link text be the name of the show
            let textNode=document.createTextNode(element.name)
            a.appendChild(textNode)

            li.appendChild(a)
            ul.appendChild(li)
        }
    })

    //Link Clicked
    $(document).on('click',`#showList > li > a`, function(event){
        event.preventDefault();
        let link=this.attributes.href.nodeValue;
        output.hidden=false;
        ul.hidden=true;
        $(ul).empty();

        $.ajax(link).then(function (responseMessage) {
            sDiv.hidden=false

            // create h1 with the show name
            let h1=document.createElement("h1"),textNode
            if(!responseMessage.name){
                let name="N/A"
                textNode=document.createTextNode(name)
            }
            else{
                let name=responseMessage.name
                textNode=document.createTextNode(name)
            }
            h1.appendChild(textNode)
            sDiv.appendChild(h1)

            //create an img which the src is set to the value read from image.medium
            let img= document.createElement('img')
            if(!responseMessage.image){
                img.setAttribute("src",'/public/no_image.jpeg')
                img.setAttribute("alt",'No image')
            }
            else{
                img.setAttribute("src",`${responseMessage.image.medium}`)
                img.setAttribute("alt",'Poster of the show')
            }
            sDiv.appendChild(img)

            //create a dl (definition list)
            let dl=document.createElement('dl')

                //dl (definition list) of property-language
                let dt=document.createElement('dt')
                textNode=document.createTextNode("Language")
                dt.appendChild(textNode)
                if(!responseMessage.language){
                    let dd=document.createElement("dd")
                    textNode=document.createTextNode("N/A")
                    dd.appendChild(textNode)
                    dt.appendChild(dd)
                }
                else{
                    let dd=document.createElement("dd")
                    textNode=document.createTextNode(responseMessage.language)
                    dd.appendChild(textNode)
                    dt.appendChild(dd)
                }
                dl.appendChild(dt)

                //dl (definition list) of property-genres
                dt=document.createElement('dt')
                textNode=document.createTextNode("Genres")
                dt.appendChild(textNode)
                if(!responseMessage.genres || responseMessage.genres.length==0){
                    let dd=document.createElement("dd")
                    textNode=document.createTextNode("N/A")
                    dd.appendChild(textNode)
                    dt.appendChild(dd)
                }
                else{
                    let dd=document.createElement("dd")
                    let ul=document.createElement("ul")
                    responseMessage.genres.forEach(element => {
                        let li=document.createElement("li")
                        textNode=document.createTextNode(element)
                        li.appendChild(textNode)
                        ul.appendChild(li)
                    });
                    dd.appendChild(ul)
                    dt.appendChild(dd)
                }
                dl.appendChild(dt)

                //dl (definition list) of property-average rating
                dt=document.createElement('dt')
                textNode=document.createTextNode("Average rating")
                dt.appendChild(textNode)
                if(!responseMessage.rating.average){
                    let dd=document.createElement("dd")
                    textNode=document.createTextNode("N/A")
                    dd.appendChild(textNode)
                    dt.appendChild(dd)
                }
                else{
                    let dd=document.createElement("dd")
                    textNode=document.createTextNode(responseMessage.rating.average)
                    dd.appendChild(textNode)
                    dt.appendChild(dd)
                }
                dl.appendChild(dt)

                //dl (definition list) of property-network
                dt=document.createElement('dt')
                textNode=document.createTextNode("Network")
                dt.appendChild(textNode)
                if(!responseMessage.network){
                    let dd=document.createElement("dd")
                    textNode=document.createTextNode("N/A")
                    dd.appendChild(textNode)
                    dt.appendChild(dd)
                }
                else{
                    let dd=document.createElement("dd")
                    textNode=document.createTextNode(responseMessage.network.name)
                    dd.appendChild(textNode)
                    dt.appendChild(dd)
                }
                dl.appendChild(dt)

                //dl (definition list) of property-summary
                dt=document.createElement('dt')
                textNode=document.createTextNode("Summary")
                dt.appendChild(textNode)
                if(!responseMessage.summary){
                    let dd=document.createElement("dd")
                    textNode=document.createTextNode("N/A")
                    dd.appendChild(textNode)
                    dt.appendChild(dd)
                }
                else{
                    let dd=document.createElement("dd")
                    dd.innerHTML=responseMessage.summary
                    dt.appendChild(dd)
                }
                dl.appendChild(dt)
            
            //append all the details of the show
            sDiv.appendChild(dl)
        })
        homeLink.hidden=false
    })

    //Search Form Submission
    $(submitBtn).click(function(event){
        event.preventDefault();
        output.hidden=false;
        sDiv.hidden=true;
        ul.hidden=false;
        $(sDiv).empty();
        $(ul).empty();

        if($(searchTerm).val().trim().length==0){
            output.hidden=true;
            error.hidden=false;
            $(error).empty();
            let div=document.createElement('div')
            div.setAttribute('class','div')
            div.innerHTML="Enter valid string"
            error.appendChild(div)
        }
        else{
            error.hidden=true;
            $(error).empty();
            let search={
                method:'Get',
                url:'http://api.tvmaze.com/search/shows?q='+$(searchTerm).val().trim()
            }
            $.ajax(search).then(function (responseMessage) {
                let div=document.createElement('div')
                if(!responseMessage){
                    div.innerHTML="No such show"
                    ul.appendChild(div)
                }
                else{
                    for (let element of responseMessage){
                        //create list items of links for each show
                        let list=document.createElement('li');
                        list.classList="show"
            
                        let link= document.createElement('a');
            
                        //href attribute be set to the url for that show from the TV Maze API
                        link.setAttribute("href",element.show._links.self.href)
            
                        //link text be the name of the show
                        let textNode=document.createTextNode(element.show.name)
                        link.appendChild(textNode)
            
                        list.appendChild(link)
                        ul.appendChild(list)
                    }
                }
            })
        }
        homeLink.hidden=false
    })

})(window.jQuery);