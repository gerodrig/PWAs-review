
var url = window.location.href;
var swLocation = '/twitter-clone-PWA/sw.js';


if ( navigator.serviceWorker ) {


    if ( url.includes('localhost') ) {
        swLocation = '/sw.js';
    }


    navigator.serviceWorker.register( swLocation );
}





// jQuery references

var title      = $('#title');
var newBtn    = $('#new-btn');
var exitBtn    = $('#exit-btn');
var cancelBtn = $('#cancel-btn');
var postBtn     = $('#post-btn');
var avatarSel   = $('#selection');
var timeline    = $('#timeline');

var modal       = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns  = $('.avatar-selection');
var txtMessage  = $('#txtMessage');

// The user, contains the ID of the user selected
var usuario;




// =====  Application logic =====

function createHTMLMessage(message, character) {

    var content =`
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${ character }.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${ character }</h3>
                <br/>
                ${ message }
            </div>
            
            <div class="arrow"></div>
        </div>
    </li>
    `;

    timeline.prepend(content);
    cancelBtn.click();

}



// Globals
function logIn( login ) {

    if ( login ) {
        newBtn.removeClass('hidden');
        exitBtn.removeClass('hidden');
        timeline.removeClass('hidden');
        avatarSel.addClass('hidden');
        modalAvatar.attr('src', 'img/avatars/' + user + '.jpg');
    } else {
        newBtn.addClass('hidden');
        exitBtn.addClass('hidden');
        timeline.addClass('hidden');
        avatarSel.removeClass('hidden');

        title.text('Select Character');
    
    }

}


// Character selection
avatarBtns.on('click', function() {

    user = $(this).data('user');

    title.text('@' + user);

    logIn(true);

});

// Exit Button
exitBtn.on('click', function() {

    logIn(false);

});

// New Button Message
newBtn.on('click', function() {

    modal.removeClass('hidden');
    modal.animate({ 
        marginTop: '-=1000px',
        opacity: 1
    }, 200 );

});


// Cancel Button Message
cancelBtn.on('click', function() {
    if ( !modal.hasClass('hidden') ) {
        modal.animate({ 
            marginTop: '+=1000px',
            opacity: 0
         }, 200, function() {
             modal.addClass('hidden');
             txtMessage.val('');
         });
    }
});

// Send Message button
postBtn.on('click', function() {

    var message = txtMessage.val();
    if ( message.length === 0 ) {
        cancelBtn.click();
        return;
    }

    var data = {
        message,
        user
    };


    fetch('api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data )
    })
    .then( res => res.json() )
    .then( res => console.log( 'app.js', res ))
    .catch( err => console.log( 'app.js error:', err ));



    createHTMLMessage( message, user );

});



// Fetch messages from server
function getmessages() {

    fetch('api')
        .then( res => res.json() )
        .then( posts => {

            console.log(posts);
            posts.forEach( post =>
                createHTMLMessage( post.message, post.user ));


        });


}

getmessages();



// Check connection status
function isOnline() {

    if ( navigator.onLine ) {
        // we have connection
        // console.log('online');
        $.mdtoast('Online', {
            interaction: true,
            interactionTimeout: 1000,
            actionText: 'OK!'
        });


    } else{
        // console.log('offline');
        // we don't have connection
        $.mdtoast('Offline', {
            interaction: true,
            actionText: 'OK',
            type: 'warning'
        });
    }

}

window.addEventListener('online', isOnline );
window.addEventListener('offline', isOnline );

isOnline();

