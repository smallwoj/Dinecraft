/*
Stuff that still needs to be done for this file:
-Add a script to the Submit/Confirm button
-Fix placeholder/input for the Birthday textbox
-Add avatar selection menu
*/

// Controls the behavious of the new account page
class newAccountPage {
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="new-account-page">
                <div class="main-container">
                    <div style="width: 100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center">
                        <div class="text-fields">
                            
                            /*Replace this with some script to add the new user to the database*/
                            <form action="/action_page.php">


                                <input type="text" name="username" placeholder="Name" size=30 required><br>
                                <input type="password" name="pin" placeholder="PIN" size=30 maxlength=6 required><br>
                                <input type="text" name="bday" placeholder="Birthday" size=30 onfocus=bruh()><br>



                                <input type="submit" value="Confirm">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `);

        // I have no idea what I'm doing
        this.ref = el.appendTo($('body'));

        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);
    }

    // Removes the contents on the page and resets variables in window
    destroy() {
        this.ref.remove();
        window.newAccountPage = undefined;
        window.onResize = undefined;
    }

    // Copypasting from loginPage like a BOSS
    onResize() {

    }

    // Yar pls fix this
    // And while you're at it please add input validation such that the user's PIN can only include numbers thanks
    bruh() {
        document.getElementById("bday").type = "date";
        document.getElementById("bday").placeholder = "";
    }
}