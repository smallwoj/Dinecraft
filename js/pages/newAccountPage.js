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
        
        // WIP
        var el = $(`
            <div class="new-account-page">
                <div class="content-pane">
                     <div style="width: 100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center">
                        <div class="text-fields">
                            /*Replace this with some script to add the new user to the database*/
                            <form action="/action_page.php">
                                <input class="acc-input" type="text" name="username" placeholder="Name" size=30 required><br>
                                <input class="acc-input" type="password" name="pin" placeholder="PIN" size=30 maxlength=6 required><br>
                                <input class="acc-input bday" type="text" name="bday" placeholder="Birthday" size=30><br>

                                <input type="submit" value="Confirm">
                            </form>
                        </div>
                    </div>
           
            
                </div>
            </div>
        `);

        this.ref = el.appendTo($('body'));
        $('body').css('background-image', '');

        // TODO: normalize the sidebar across the app (consistent options everywhere, display account creation
        //   only for managers, etc)
        this.navbar = new NavBar(this.ref, [{
            'text' : 'Menu option 1',
            'onClick' : function() {
                alert('clicked 1');
            },
        }, {
            'text' : 'Menu option 2',
            'onClick' : function() {
                alert('clicked 2');
            },
        }, {
            'text' : 'Create Account',
            'selected' : true,
        }]);

        // Add the sample text
        this.titleBar = new TitleBar(this.ref.find('.content-pane'), 'Create Account');

        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);

        this.ref.find('.bday').focus(this.bruh.bind(this));
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
        this.ref.find('.bday').prop('type', 'date')
        this.ref.find('.bday').prop('placeholder', '')
    }
}
