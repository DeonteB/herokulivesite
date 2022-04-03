/* IIFE immediately Invoked Funtion Expression */

//const { computeStyles } = require("@popperjs/core");
//const { data } = require("jquery");

// Anonymous Self

(function()
{
    function AuthGuard(): void
    {

        let protected_routes: string[] = [
            "/contact-list",
            "/edit"
        ];

        if (protected_routes.indexOf(router.ActiveLink) > -1) 
        {
            if (!sessionStorage.getItem("user")) 
            {
                //if not change active link to login
                location.href = "/login";
            }
        }
    }

    



    function DisplayHomePage():void
    {
        console.log("Home Page");
        $("#AboutUsButton").on("click", () => 
        {
            location.href = "/about";
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
            location.href = "/contact-list";
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


    }
    $("a.delete").on("click", function(event)
    {
        if(confirm("Are you sure?"))
        {
            event.preventDefault();
            //refresg and delete
            location.href = "/contact-list";
        }
        
    });
    /**
     * This function allows JavaScript to work on the Edit Page
     */
    function DisplayEditPage(): void
    {
        console.log("Edit Page");

        ContactFormValidation();
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
                    `<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>`
    
                );

                location.href = "/login";
            });
        }
    }


    function DisplayLoginPage():void
    {
        console.log("Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();

       

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
                location.href = "/contact-list";
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
            location.href = "/home";
        }
        );
        
    
    }

    

    function DisplayRegisterPage():void
    {
        console.log("Register Page");
       
    }

    function Display404Page():void
    {

    }

  
    // named function option
    function Start(): void
    {
        console.log("App Started!");

        //LoadHeader(router.ActiveLink);
        //AjaxRequest("GET", "./Views/components/header.html", LoadHeader);
        let page_id = $("body")[0].getAttribute("id");
        CheckLogin();

        switch (page_id)
        {
            case "home": 
             DisplayHomePage();
             break;
            case "about": 
             DisplayAboutPage();
             break;
            case "projects":  
             DisplayProductsPage();
             break;
            case "services": 
             DisplayServicesPage();
             break;
            case "contact": 
          
             DisplayContactPage();
             break;
            case "contact-list": 
        
            DisplayContactListPage();
             break;
            case "edit": 
            DisplayEditPage();
             break;
             case "add": 
             DisplayEditPage();
              break;

            case "login": 
            DisplayLoginPage();
            break;
            case "register": 
            DisplayRegisterPage();
            break;
            case "404": 
            Display404Page();
            break;
        }
       
    }

    window.addEventListener("load", Start);

})();