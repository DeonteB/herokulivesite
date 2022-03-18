/* IIFE immediately Invoked Funtion Expression */

//const { computeStyles } = require("@popperjs/core");
//const { data } = require("jquery");

// Anonymous Self

(function()
{
    function AuthGuard(): void
    {

        let protected_routes: string[] = [
            "contact-list"
        ];

        if (protected_routes.indexOf(router.ActiveLink) > -1) 
        {
            if (!sessionStorage.getItem("user")) 
            {
                //if not change active link to login
                router.ActiveLink = "login";
            }
        }
    }

    function LoadLink(link: string, data: string = ""): void
    {
        router.ActiveLink = link;

        AuthGuard();

        router.LinkData = data; 
        history.pushState({}, "", router.ActiveLink);

        //Capitalize the router activeLink and set the title to it.
        document.title = router.ActiveLink.substring(0, 1).toUpperCase() + 
        router.ActiveLink.substring(1);
        //remove all active links 

        $("ul>li>a").each(function()
        
        {
            $(this).removeClass("active");
        });

        $(`li>a:contains(${document.title})`).addClass("active"); // update active link

        LoadContent();

    }

    function AddNavigationEvents(): void
    {
        let NavLinks = $("ul>li>a"); //find all navigation links

        // remove navigation links
        NavLinks.off("click");
        NavLinks.off("mouseover");
        //loopthoug each navigation link and load the approprite content to click
        NavLinks.on("click", function()
        {
            LoadLink($(this).attr("data") as string);
        });

        // make the navigation links look like they 
        NavLinks.on("mouseover", function()
        {
            $(this).css("cursor", "pointer");
        });
    }

    function AddLinkEvents(link: string): void
    {
        let linkQuery = $(`a.link[data=${link}]`);

        // remove all  link events
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseover");
        // add css to adjust the link 
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        // add link events
        linkQuery.on("click", function()
        {
            LoadLink(`${link}`);
        });
        linkQuery.on("mouseover", function()
        {
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });
        linkQuery.on("mouseout", function()
        {
            $(this).css("font-weight", "normal");
        });
    }
    
    /**
     * This function uses AJAX to open a connection to the server and returns 
     * the data payload to the callback function
     *
     * @param {string} method
     * @param {string} url
     * @param {function} callback
     */

    /**
     * This function loads the header.html content into a page
     *
     * @param {string} html_data
     */
    function LoadHeader():void
    {
        $.get("./Views/components/header.html", function(html_data)
        {
        //inject header content into page  
        $("header").html(html_data);
        
        AddNavigationEvents();
           
        CheckLogin();
        });
    }

    /**
     *
     *
     * @param {string} activeLink
     * @param {function} callback
     * @returns {void}
     */
    function LoadContent():void
    {

        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallBack();
        $.get(`./Views/content/${page_name}.html`, function(html_data)
        {
            $("main").html(html_data);
            CheckLogin();
            callback(); // calling the correct function.
        });
    }

    function LoadFooter(): void
    {

        $.get("./Views/components/footer.html", function(html_data)
        {
        //inject header content into page  
        $("footer").html(html_data);
        });

    }


    function DisplayHomePage():void
    {
        console.log("Home Page");
        $("#AboutUsButton").on("click", () => 
        {
            LoadLink("about");
        });
    
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        $("main").append(`<article>
        <p id="ArticleParagraph" class ="mt-3">This is the Article Paragraph</p>
        </article>`);
    }

    function DisplayProductsPage():void
    {
        console.log("Products Page");
    }

    function DisplayServicesPage():void
    {
        console.log("Services Page");
    }

    function DisplayAboutPage():void
    {
        console.log("About Page");
    }

    /**
     *This function adds a Contact object to localStorage
     *
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName: string, contactNumber: string, emailAddress:string)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize() as string);
        }
    }

    /**
     * This method validates a field in the form and displays an error in the message area div element
     *
     * @param {string} fieldID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(fieldID:string, regular_expression: RegExp, error_message: string)
    {
        let messageArea = $("#messageArea").hide();
    
        $("#" + fieldID).on("blur", function()
        {
            let text_value = $(this).val() as string;
            if(!regular_expression.test(text_value))
            {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation()
    {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/, "Please enter a valid Full Name. This must include at least a Capitalized First Name and a Capitalized Last Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid Contact Number. Example: (416) 555-5555");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }


    function DisplayContactPage()
    {
        console.log("Contact Page");

        $("a[data='contactlist']").off("click");
        $("a[data='contact-list']").on("click", function()
        {
            LoadLink("contact-list");
        });
        ContactFormValidation();
       
        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function(event)
        {

            if(subscribeCheckbox.checked)
            {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;

                let contact = new core.Contact(fullName, contactNumber, emailAddress);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();

                    localStorage.setItem(key, contact.serialize() as string);
                }
            }
        });
    }

    function DisplayContactListPage():void
    {

        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList") as HTMLElement;

            let data = "";

            let keys = Object.keys(localStorage); // returns a list of keys from localStorage

            let index = 1;

            // for every key in the keys string array
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key) as string; // get localStorage data value

                let contact = new core.Contact(); // create an empty Contact object
                contact.deserialize(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>`;

                index++;
            }

            contactList.innerHTML = data;

           

            $("button.delete").on("click", function()
            {
                if(confirm("Are you sure?"))
                {
                    localStorage.removeItem($(this).val() as string)
                }
                LoadLink("contact-list");
            });

            $("button.edit").on("click", function()
            {
                LoadLink("edit", $(this).val() as string);
            });
        }

        $("#addButton").on("click", ()=>
        {
            LoadLink("edit", "add");
        });

    }

    /**
     * This function allows JavaScript to work on the Edit Page
     */
    function DisplayEditPage(): void
    {
        console.log("Edit Page");

        ContactFormValidation();

        let page = router.LinkData;

        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`)

                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();

                        let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;

                        AddContact(fullName, contactNumber, emailAddress);
                        LoadLink("contact-list");
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        LoadLink("contact-list");
                    });
                }
                break;
            default:
                {
                    // get contact info from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page) as string);

                    // display the contact in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();
                        
                        // get changes from the page
                        contact.FullName = $("#fullName").val() as string;
                        contact.ContactNumber = $("#contactNumber").val() as string;
                        contact.EmailAddress = $("#emailAddress").val() as string;

                        // replace the item in local storage
                        localStorage.setItem(page, contact.serialize() as string);
                        // go back to the contact list page (refresh)
                        LoadLink("contact-list");
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        LoadLink("contact-list");
                    });
                    
                }
                break;
        }
    }

    
    function CheckLogin(): void
    {
        // if th euser is login then 
        if(sessionStorage.getItem("user"))
        {
            //swap out the login link for 
            $("#login").html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`

            );

            $("#logout").on("click", function()
            {
            //perform logout
                sessionStorage.clear();

                $("#login").html(
                    `<a class="nav-link" data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`
    
                );

               LoadLink("login");
            });
        }
    }


    function DisplayLoginPage():void
    {
        console.log("Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();

        AddLinkEvents("register");

        $("#loginButton").on("click", function()
        {
            let success = false;

            let newUser= new core.User();
            //use jQuery shortcut to lod the users.json file 
            $.get("./Data/users.json", function(data)
            {
                for (const user of data.users)
                {
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;
                    //check if the username and password entered matches the user data
                    if(username == user.Username && password == user.Password)
                    {
                        console.log("conditional passed!");
                        // get the user data from the file and assign it to our empty user
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                 //if username and passsword mathches succes -> perfrom the login sequaence
            if(success)
            {
                sessionStorage.setItem("user", newUser.serialize() as string);

                //hide any error message
                messageArea.removeAttr("class").hide();

                // redireact the user to the secure area of the site - contact-list.html
                LoadLink("contact-list");
            }
            else
            {
                // display 
                $("#username").trigger("focus").trigger("select");
               messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials").show();
            }

            });

           
        });

        $("#cancelButton").on("click", function()
        {
            //clear the login form
            document.forms[0].reset();

            //return to the home page
            LoadLink("home");
        }
        );
        
    
    }

    

    function DisplayRegisterPage():void
    {
        console.log("Register Page");
        AddLinkEvents("login");
    }

    function Display404Page():void
    {

    }

    /**
     * This method returns the appropriate function callback
     * @param {string} activeLink 
     * @returns {Function}
     */
    function ActiveLinkCallBack(): Function
    {
        switch (router.ActiveLink)
        {
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutPage;
            case "projects": return DisplayProductsPage;
            case "services": return DisplayServicesPage;
            case "contact": return DisplayContactPage;
            case "contact-list": return DisplayContactListPage;
            case "edit": return DisplayEditPage;
            case "login": return DisplayLoginPage;
            case "register": return DisplayRegisterPage;
            case "404": return Display404Page;
            default:
                console.error("ERROR: callback does not exist: " + router.ActiveLink);
                return new Function();
        }
    }
    // named function option
    function Start(): void
    {
        console.log("App Started!");

        //LoadHeader(router.ActiveLink);
        //AjaxRequest("GET", "./Views/components/header.html", LoadHeader);
        LoadHeader();

        LoadLink("home");

        LoadFooter();
       
    }

    window.addEventListener("load", Start);

})();