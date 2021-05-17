$( document ).ready(function() {

/*______________________________________variables_____________________________________________________*/ 

    const arr_img_src = new Array();
    //const categories = new Set();
    let main_items = new Array();
    let choised_items = new Array();
    let choises = new Object();
    //let max_price = 0;
    //let min_price = items[0].price;
    //let memo = new Set();

    let search_items = {
        categories: new Set(),
        stock: 0,
        order: 'default',
    };

    let accord_items = {
        price: [items[0].price, 0],
        color: new Set(),
        memory: ['32 GB', '64 GB', '128 GB', '256 GB', '512 GB', '1 TB', '2 TB', '4 TB'],
        os: new Set(),
        display: ['2-5 inch', '5-7 inch', '7-12 inch', '12-16 inch', '16+ inch'],
    };

/*______________________________________slider_____________________________________________________*/ 
    
    const slider = document.getElementsByClassName('slider')[0].children;
    
    for(let val of slider) arr_img_src.push(val.children[0].getAttribute('src').replace(/.+banners\//gi, '').replace(/\_banner.+/gi, '').split('_').join(' '));

    for(let key in items){
        
        if(accord_items.price[0] > +items[key].price) accord_items.price[0] = +items[key].price;
        if(accord_items.price[1] < +items[key].price) accord_items.price[1] = +items[key].price;
        //debugger
        if(items[key].category != null || !items[key].category == false) search_items.categories.add(items[key].category.toLowerCase());
        if(items[key].os != null || !items[key].os == false) accord_items.os.add(items[key].os.toLowerCase());
        //memo.add(items[key].storage);
        for(let item in items[key].color){
            accord_items.color.add(items[key].color[item]);
        }

        for(let item in arr_img_src){
            
            if(items[key].name.toLowerCase().includes(arr_img_src[item])) {
                
                const slider_item = document.getElementsByClassName('slider_item')[item];

                if(slider_item.children.length == 2) continue;
                
                const div = document.createElement('div');
                    div.setAttribute("class", `slider_item_div ${(()=>{
                        return (item == 3 || item == 4 || item == 5) ? 'color_black' : '';
                    })()}`);

                if(item == 2 || item == 4) div.setAttribute("style", `left: 0; top: 10%; width: ${(()=>(item == 4) ? '35%' : '50%')()}`);

                const h1 = document.createElement('h1');
                    h1.innerText = (items[key].name);
                
                const button = document.createElement('button');
                    button.setAttribute('class', 'add_button');
                    button.innerText = ('Add to cart');
                    button.onclick = (event)=>{
                        event.stopPropagation();
                        Add_to_cart(items[key]);
                    };
                
                if(items[key].orderInfo.inStock == 0) button.setAttribute("disabled", "disabled");
                
                div.append(h1);
                div.append(button);
                slider_item.prepend(div);
            }

            if(arr_img_src.length == 0) return;
        }
    }

/*______________________________________search_____________________________________________________*/ 


const search = document.getElementsByClassName('input_container')[0];

const search_line = search.children[1];
    search_line.addEventListener('input', function(){
        //let result = new Array();
        if(search_line.value.length > 0) choised_items = items.filter((item)=>{
            if(item.name.match(new RegExp(`${search_line.value}`, 'gi'))) return item;
        });
        
        const html_items = document.getElementsByClassName('items')[0];
            html_items.innerHTML = '';
        
        //(result.length == 0) ? Random_six_items() : result.forEach(item=>Add_item_to_catalog(item));
        (choised_items.length == 0) ? (()=>{
            if(main_items.length > 0) main_items.forEach((item)=> Add_item_to_catalog(item));
            else Random_six_items();
        })() : choised_items.forEach(item=>Add_item_to_catalog(item));
    });

    const search_tune = document.getElementsByClassName('search_tune')[0];
    
    const search_category_stock = document.createElement('div');
        search_category_stock.setAttribute('class', 'search_category_stock');

    const search_category = document.createElement('div');
        search_category.setAttribute('class', 'search_category');

    
    const search_stock = document.createElement('div');
        search_stock.setAttribute('class', 'search_stock');

    
    const search_order = document.createElement('div');
        search_order.setAttribute('class', 'search_order');

    let h4 = document.createElement('h4');
    
    const select = document.createElement('select');
        select.setAttribute('class', 'search_menu');
        select.addEventListener('change', function(){
            console.log(select.value);
        });

    const input = document.createElement('input');
        input.setAttribute('type', 'number');        
        input.setAttribute('value', 0);
        input.setAttribute('min', 0);
        input.setAttribute('max', 50);
        input.addEventListener('change', function(){
            console.log(input.value);
        });
        
        h4 = document.createElement('h4');
        h4.innerText = 'Category';

    const option = document.createElement('option');
        option.setAttribute("value", 0);
        option.setAttribute("selected", 'selected');
        option.innerText = 'All categories';
        select.appendChild(option);

    search_items.categories.forEach((item)=>{
    
        const option = document.createElement('option');
            option.setAttribute("value", item);
            option.innerText = item[0].toUpperCase()+item.slice(1, item.length);
    
        select.appendChild(option);
    });

    search_category.appendChild(h4);
    search_category.appendChild(select);

    h4 = document.createElement('h4');
    h4.innerText = 'Stock';
    
    search_stock.appendChild(h4);
    search_stock.appendChild(input);

    h4 = document.createElement('h4');
    h4.innerText = 'Order';

    search_order.appendChild(h4);
    
    const search_button = ['Default','Ascending','Descending'];

    for(let key = 0; key < search_button.length; key++){
    
        const button = document.createElement('button');
            
            if(key == 0) button.setAttribute("class", 'search_default search_button search_choise"');
            else button.setAttribute("class", search_button[key].toLowerCase()+'_default search_button');
            
            button.setAttribute('value', search_button[key].toLocaleLowerCase());
            button.innerText = search_button[key];
            button.addEventListener('click', function(){
                console.log(button.value);
            })
    
        search_order.appendChild(button);
    };

    search_category_stock.appendChild(search_category);
    search_category_stock.appendChild(search_stock);
    
    search_tune.appendChild(search_category_stock);
    search_tune.appendChild(search_order);
    
/*const search_menu = document.getElementsByClassName('search_menu')[0];

search_items.categories.forEach((item)=>{
    
    const option = document.createElement('option');
        option.setAttribute("value", item);
        option.innerText = item[0].toUpperCase()+item.slice(1, item.length);

    search_menu.appendChild(option);
});*/

const filter = search.children[2];
    filter.onclick = function(){
        
        const accordion_filter = document.querySelector('.accordion_filter');
        const items = document.getElementsByClassName('item');
            
        if(getComputedStyle(accordion_filter).display == 'none'){
            accordion_filter.style.display = 'flex';

            for(let key in items){
                items[key].className = 'item item_two_elm';
            }
        }else{
           accordion_filter.style.display = 'none';
            for(let key in items){
                items[key].className = 'item';
            }
        }
    };

const sort = search.children[3];
    sort.onclick = function(){

        const search_tune = document.querySelector('.search_tune');
        
        if(getComputedStyle(search_tune).display == 'none'){
            search_tune.style.display = 'flex';
        }else{
            search_tune.style.display = 'none';
        }
    };

/*______________________________________filter_____________________________________________________*/

    const accordion_filter = document.getElementsByClassName('accordion_filter')[0];
    //const accordion_filter_childrens = accordion_filter.children[0].children;

    const main_ul = document.createElement('ul');
        accordion_filter.appendChild(main_ul);
    
    for(let key of Object.keys(accord_items)){

        const ul = document.createElement('ul');
        const span = document.createElement('span');
        const li = document.createElement('li');

        if(key === 'price'){
            
            for(let item in accord_items[key]){
    
                const li = document.createElement('li');
                const span = document.createElement('span');
                    span.innerText = (item == 0) ? 'From' : 'To';

                const input = document.createElement('input');
                    input.setAttribute('type', 'number');
                    input.setAttribute('max', accord_items.price[1]);
                    input.setAttribute('min', accord_items.price[0]);
                    input.setAttribute('value', (item == 0) ? accord_items.price[0] : accord_items.price[1]);
                    input.addEventListener('input', function(){

                        let place = this.parentElement.children[0].innerText.toLowerCase();

                        if(place == 'from') accord_items.price[0] = +input.value;
                        else accord_items.price[1] = +input.value;
                        
                        choises[key] = accord_items.price;
                    });

                li.appendChild(span);
                li.appendChild(input);
                ul.appendChild(li);
            }
            
            span.innerText = key[0].toUpperCase()+key.slice(1, key.length);
            span.addEventListener('click',function (event){

                event.stopPropagation();

                if(getComputedStyle(event.target.parentElement.children[1]).display == 'none'){
                    this.parentElement.children[1].style.display = 'flex';
                    this.parentElement.className = 'rotate_after';
                }else{
                    this.parentElement.children[1].style.display = 'none';
                    this.parentElement.removeAttribute('class');
                };
            })
    
            ul.setAttribute('class', 'filter_'+key[0].toLowerCase()+key.slice(1, key.length));
            li.appendChild(span);
            li.appendChild(ul);
            
            main_ul.appendChild(li);

        }else{

            let ai =[...accord_items[key]];

            for(let item in ai){
    
                const li = document.createElement('li');
                    li.innerText = ai[item];
    
                const input = document.createElement('input');
                    input.setAttribute('type', 'checkbox');
                    input.setAttribute('value', ai[item]);
    
                li.appendChild(input);
                ul.appendChild(li);
            }
            
            span.innerText = key[0].toUpperCase()+key.slice(1, key.length);
            span.addEventListener('click',function (event){

                event.stopPropagation();
                
                if(getComputedStyle(event.target.parentElement.children[1]).display == 'none'){
                    this.parentElement.children[1].style.display = 'flex';
                    this.parentElement.className = 'rotate_after';
                }else{
                    this.parentElement.children[1].style.display = 'none';
                    this.parentElement.removeAttribute('class');
                };
            });

            ul.setAttribute('class', 'filter_'+key[0].toLowerCase()+key.slice(1, key.length));
            ul.addEventListener('click', function(event){
                
                event.stopPropagation();

                if(event.target.localName == 'li'){
                    if(event.target.children[0].checked) {
                        Add_to_filter(key, event.target.children[0].value);
                        event.target.children[0].checked = '';
                    }else{
                        Remove_from_filter(key, event.target.children[0].value);
                        event.target.children[0].checked = 'checked';
                    }
                }else{
                    if(!event.target.checked) Add_to_filter(key, event.target.value);
                    else Remove_from_filter(key, event.target.value);
                }
            });

            li.appendChild(span);
            li.appendChild(ul);
            
            main_ul.appendChild(li);
        }
        
    }
            
    /*for(let key = 0; key < accordion_filter_childrens.length; key++){
                
        const class_name = `.${accordion_filter_childrens[key].children[1].className}`;
        const item = document.querySelector(class_name);
        const item_children = item.children;

        accordion_filter_childrens[key].onclick = (event)=>{

            event.stopPropagation();
            
            if(getComputedStyle(item).display == 'none') {
                item.style.display = 'flex';
                accordion_filter_childrens[key].className = 'rotate_after';
            }else{
                item.style.display = 'none';
                accordion_filter_childrens[key].removeAttribute('class');
            };
        }
        
        for(let i = 0; i < item_children.length ; i++){

            if(key == 0){

                for(let i = 0; i < item_children.length ; i++){
                
                    const input = item_children[i].children[1];
                    const place = item_children[i].children[0].innerText;
                    
                    input.min = min_price;
                    input.max = max_price;
                    
                    if(place.toLowerCase() == 'from') input.value = min_price;
                    if(place.toLowerCase() == 'to') input.value = max_price;
                    
                    item_children[i].children[1].addEventListener('input', function(){

                        if(place.toLowerCase() == 'from'){
                            if(isNaN(+input.value) || +input.value < min_price) {
                                input.value = min_price;
                                (choises.hasOwnProperty('from')) ? choises.from = min_price : choises['from'] = min_price;
                            }else{
                                (choises.hasOwnProperty('from')) ? choises.from = +input.value : choises['from'] = +input.value;
                            }
                        }
                        if(item_children[i].children[0].innerText.toLowerCase() == 'to'){
                             if(isNaN(+input.value) || +input.value > max_price) {
                                input.value = max_price;
                                (choises.hasOwnProperty('to')) ? choises.to = max_price : choises['to'] = max_price;
                            }else{
                                (choises.hasOwnProperty('to')) ? choises.to = +input.value : choises['to'] = +input.value;
                            }
                        }
                    });
                }
            }

            item_children[i].onclick = (event)=>{
                
                event.stopPropagation();

                if(key == 0) return;

                if(event.target.localName == 'li' && event.target.children[0].type){
                
                    let category = event.target.parentElement.getAttribute('class').split('_')[1];
                    let choise = event.target.innerText.split(" ").join('');
                    
                    if(event.target.children[0].checked) {

                        event.target.children[0].checked = '';
                        choises = Add_to_filter(category, choise, choises);

                    }else{

                        event.target.children[0].checked = 'checked';
                        choises = Remove_from_filter(category, choise, choises);
                    
                    }
                    Add_choised_items();
                    //console.log(choises);
                    console.log(choised_items);
                }else if(event.target.localName == 'input' && event.target.type == 'checkbox'){

                    let category = event.target.parentElement.parentElement.getAttribute('class').split('_')[1];
                    let choise = event.target.parentElement.innerText.split(" ").join('');

                    if(!event.target.checked) {
                        choises = Add_to_filter(category, choise, choises);
                    }else{
                        choises = Remove_from_filter(category, choise, choises);
                    }
                    Add_choised_items();
                    //console.log(choises);
                    console.log(choised_items);
                }

            }
        }
    }*/

/*______________________________________catalog_____________________________________________________*/ 

    (Object.keys(choises).length == 0) ? Random_six_items() : (()=>{
        console.log('filterd');
        console.log(choises);
    })();

/*______________________________________functions_____________________________________________________*/ 

    $('.slider').slick({
        infinite: true,
        autoplay: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        variableWidth: false,
        initialSlide: 0,
        prevArrow: false,
        nextArrow: false,
        fade: true,
    });

    function RandomInteger(min, max) {
        let rand = min + Math.random() * (max - min);
        return Math.floor(rand);
    }

    function Add_to_cart(item){
        console.log(item);
    }

    function Add_to_filter(category, choise){

        if(choises.hasOwnProperty(category)){
            
            if(choises[category].includes(choise)){
                const index = choises[category].indexOf(choise);
                choises[category].splice(index, 1);
            }
            if(choises[category].length == 0) {
                delete choises[category];
            }
        }
        return choises;
    }

    function Remove_from_filter(category, choise){

        (choises.hasOwnProperty(category)) ? 
            (()=>{
                if(!choises[category].includes(choise)) choises[category].push(choise);
            })() : choises[category] = new Array(choise);

        return choises;
    }
    
    function Add_choised_items(){

        choised_items = new Array();
        
        for(let items_key = 0; items_key < items.length; items_key++){
            
            for(let choises_key in choises){
                //debugger
                if(!items[items_key][choises_key]){
                    continue;
                }else if(Array.isArray(items[items_key][choises_key])){
                        //debugger
                        if(items[items_key][choises_key].some((item)=>{
                            for(let i = 0; i < choises[choises_key].length; i++){
                                if(item.toLowerCase() == choises[choises_key][i]) return true;
                            }
                            return false;
                        })) choised_items.push(items[items_key]);

                    }else if(Object.is(items[items_key][choises_key])){
                        //debugger
                        if(Object.values(items[items_key][choises_key]).some((item)=>{
                            for(let i = 0; i < choises[choises_key].length; i++){
                                if(item.toLowerCase() == choises[choises_key][i]) return true;
                            }
                            return false;
                        })) choised_items.push(items[items_key]);

                    }else{
                        //debugger
                        choises[choises_key].forEach((item)=>{
                            //debugger
                            if(item === items[items_key][choises_key].toLowerCase()){
                                choised_items.push(items[items_key]);
                                return;
                            }
                        });
                        //if(items[i][key].toLowerCase() == choises[key][0]) choised_items.push(items[i]);    
                    }
                }

                //console.log(items[i][key], choises[key]);
                //debugger
                /*if(!items[i][key]){
                    continue;
                }else if(Array.isArray(items[i][key])){
                    //debugger
                    if(items[i][key].some((item)=>{
                        choises[key].forEach((i)=>{
                            if(item == i) return true;    
                        })
                        return false;
                    })) choised_items.push(items[i]);
                }else if(Object.is(items[i][key])){
                    //debugger
                    if(Object.values(items[i][key]).some((item)=>{
                        choises[key].forEach((i)=>{
                            if(item == i) return true;    
                        })
                        return false;
                    })) choised_items.push(items[i]);
                }else{
                    //debugger
                    if(items[i][key].toLowerCase() == choises[key]) choised_items.push(items[i]);
                }*/
                //debugger
            
        }
        debugger
        console.log(choised_items);
    }/*

function Choised_items(val){
        debugger
        let arr;

        if(val == '+') arr = new Array(...items);
        else if(val == '-') arr = new Array(...choised_items);
        else return;

        choised_items = new Array();

        for(let items_key = 0; items_key < arr.length; items_key++){
            
            for(let choises_key in choises){
                /*if(!arr[items_key][choises_key]){
                    continue;
                }else if(Array.isArray(arr[items_key][choises_key])){
                        //debugger
                        if(arr[items_key][choises_key].some((item)=>{
                            for(let i = 0; i < choises[choises_key].length; i++){
                                if(item.toLowerCase() == choises[choises_key][i]) return true;
                            }
                            return false;
                        })) choised_items.push(arr[items_key]);

                    }else if(Object.is(arr[items_key][choises_key])){
                        debugger
                        if(Object.values(arr[items_key][choises_key]).some((item)=>{
                            for(let i = 0; i < choises[choises_key].length; i++){
                                if(item.toLowerCase() == choises[choises_key][i]) return true;
                            }
                            return false;
                        })) choised_items.push(arr[items_key]);

                    }else{
                        //debugger
                        choises[choises_key].forEach((item)=>{
                            //debugger
                            if(item.split(',').length == 2){
                                let itemarr = item.split(',');
                                let arr_item = arr[items_key][choises_key];
                                if(arr_item > itemarr[0] && arr_item < itemarr[1]) choised_items.push(arr[items_key]);
                            }else if(!isNaN(+item)){
                                //debugger
                                if(+arr[items_key][choises_key] === +item) choised_items.push(arr[items_key]);
                            }else if(item === arr[items_key][choises_key].toLowerCase()){
                                choised_items.push(arr[items_key]);
                                return;
                            }
                        });
                        //if(arr[i][key].toLowerCase() == choises[key][0]) choised_items.push(arr[i]);    
                    }
                }
            }
        console.log(choised_items);
        debugger
        Order();
    }
*/

    function Random_six_items(){
        
        let set_random = new Set();
        
        if(main_items.length > 0) main_items.length = 0;
            
        for(let i = 0; i < 6;){

            let key = RandomInteger(0, items.length);
        
            if(set_random.has(key)) continue;
            else {
                set_random.add(key);
                i++;
            };
            
            Add_item_to_catalog(items[key]);
            
        }
        //console.log(main_items);
    }

    function Add_item_to_catalog(value){
        //if(main_items.length > 0) main_items.length = 0;
        main_items.push(value);
        
        const item = document.createElement("div");
            item.setAttribute("class", "item");
            item.innerHTML = `
                <img src="img/${value.imgUrl}" alt="${value.name}">
                <div class="item_main">
                    <h1 class="model_name">${value.name}</h1>
                    <span class="inStock"><span ${(()=>{
                        /*return (item.orderInfo.inStock == 0) ? `style = 
                            "background: url('img\/icons\/icons\/close 1.svg') center\/100% no-repeat;
                            transform: scale(1.3);"` : '';*/
                        return (value.orderInfo.inStock == 0) ? `class = 'no_stock'` : '';
                        })()}></span>${value.orderInfo.inStock} left in stock</span>
                    <span class="price">Price: ${value.price}</span>
                </div>
                <div class="item_footer">
                    <img src="img/icons/icons/like_filled 1.svg" alt="like_filled">
                    <div class="reviews">
                        <span class="reviews_counts"></span>
                        <span>Positive reviews</span>
                        <span>Above arrange</span>
                    </div>
                    <div class="orders">
                        <span class="order_counts">1500</span>
                        <span>orders</span>
                    </div>
                </div>`
            item.onclick = function(event){
                event.stopPropagation();
                Modal_page(value);
            };

        const catalog = document.getElementsByClassName('items')[0];
            catalog.append(item);
        
        const button = document.createElement("button");
            button.setAttribute("class", "add_button");
            button.innerText = ('Add to cart');
            button.onclick = (event)=>{
                event.stopPropagation();
                Add_to_cart(value);
            };
         
        if(value.orderInfo.inStock == 0) button.setAttribute("disabled", "disabled");

        const item_main = document.getElementsByClassName('item_main');
              item_main[item_main.length-1].appendChild(button);
                
        /*const item = document.createElement("div");
            item.setAttribute("class", "item");
            item.onclick = (event)=>{
                event.stopPropagation();
                Modal_page(items[key]);
            };

        const item_main = document.createElement("div");
            item_main.setAttribute("class", "item_main");
        
        const item_footer = document.createElement("div");
            item_footer.setAttribute("class", "item_footer");
        
        const img_main = document.createElement("img");
            img_main.setAttribute("src", `img/${items[key].imgUrl}`);
            img_main.setAttribute("alt", items[key].name);
        
        const name = document.createElement("h1");
            name.innerText = (items[key].name);
        
        const instock = document.createElement("span");
            instock.setAttribute("class", "inStock");
            instock.innerText = (`${items[key].orderInfo.inStock} left in stock`);
        
        const instock_span = document.createElement("span");
            if(items[key].orderInfo.inStock == 0){
                instock_span.style.background = `url('img/icons/icons/close 1.svg') center/100% no-repeat`;
                instock_span.style.transform = `scale(1.3)`;
            }

        const price = document.createElement("span");
            price.setAttribute("class", "price");
            price.innerText = (`Price: ${items[key].price}`);
    
        const button = document.createElement("button");
            button.setAttribute("class", "add_button");
            button.innerText = ('Add to cart');
            button.onclick = ()=>{Add_to_cart(items[key])};
        
        if(items[key].orderInfo.inStock == 0) button.setAttribute("disabled", "disabled");

        const img_footer = document.createElement("img");
            img_footer.setAttribute("src", 'img/icons/icons/like_filled 1.svg');
            img_footer.setAttribute("alt", "item");
        
        const reviews = document.createElement("div");
            reviews.setAttribute("class", 'reviews');
        
        const orders = document.createElement("div");
            orders.setAttribute("class", 'orders');
        
        const reviews_counts = document.createElement("span");
            reviews_counts.setAttribute("class", 'reviews_counts');
            reviews_counts.innerText = (`${items[key].orderInfo.reviews}% Positive reviews`);

        const reviews_span = document.createElement("span");
            reviews_span.innerText = ('Above arrange');

        const order_counts = document.createElement("span");
            order_counts.setAttribute("class", 'orders_counts');
            order_counts.innerText = ('1500');
        
        const order_span = document.createElement("span");
            order_span.innerText = ('orders');

        
        reviews.append(reviews_counts);
        reviews.append(reviews_span);
            
        orders.append(order_counts);
        orders.append(order_span);
    
        instock.prepend(instock_span);

        item_main.append(name);
        item_main.append(instock);
        item_main.append(price);
        item_main.append(button);

        item_footer.append(img_footer);
        item_footer.append(reviews);
        item_footer.append(orders);
        
        item.append(img_main);
        item.append(item_main);
        item.append(item_footer);

    const catalog = document.getElementsByClassName('catalog')[0];
        catalog.append(item);*/
    }

    function Modal_page(item){

        const modal_page = document.createElement("div");
            modal_page.setAttribute("class", "modal_page");
            modal_page.innerHTML = `
            <div class="modal_back"></div>
            <div class="modal_content">
                <div class="modal_wrap_img">
                    <img src="img/${item.imgUrl}" alt="${item.name}">
                </div>
                <div class="modal_main">
                    <h2>${item.name}</h2>
                    <div class="modal_reviews item_footer">
                        <img src="img/icons/icons/like_filled 1.svg" alt="like_filled">
                        <div class="reviews">
                            <span class="reviews_counts"></span>
                            <span>Positive reviews</span>
                            <span>Above arrange</span>
                        </div>
                        <div class="orders">
                            <span class="order_counts">1500</span>
                            <span>orders</span>
                        </div>
                    </div>
                    <div class="modal_description">
                        <span>Color: ${(()=>{
                            let str = ''
                            
                            for(let key in item.color){
                                str += `<span>${item.color[key]}</span>, `
                            }
                            return str.slice(0, str.length-2);
                        })()}</span>
                        <span>Operation system: <span>${item.os}</span></span>
                        <span>Chip: <span>${item.chip.name}</span>, cores: <span>${item.chip.cores}</span></span>
                        <span>Height: <span>${item.size.height}</span></span>
                        <span>Width: <span>${item.size.width}</span></span>
                        <span>Depth: <span>${item.size.depth}</span></span>
                        <span>Weigth: <span>${item.size.weight}</span></span>
                    </div>
                </div>
                <div class="modal_price">
                    <h2>$ ${item.price}</h2>
                    <span>Stock: ${item.orderInfo.inStock}</span>
                </div>
            </div>`

        const main = document.querySelector('main');
            main.append(modal_page);
        
        const modal_back = document.getElementsByClassName('modal_back')[0];
            modal_back.onclick = (event)=>{
                event.stopPropagation();
                modal_page.remove();
            }

        const modal_price = document.getElementsByClassName('modal_price')[0];
        const button = document.createElement("button");
            button.setAttribute("class", "add_button");
            button.innerText = ('Add to cart');
            button.onclick = (event)=>{
                event.stopPropagation();
                Add_to_cart(item);
            };
        if(item.orderInfo.inStock == 0) button.setAttribute("disabled", "disabled");

        modal_price.append(button);
    }
});

