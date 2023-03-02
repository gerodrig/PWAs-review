//get url location
const url = window.location.href;
let swLocation = '/twitter-clone-PWA/sw.js';

//Define service worker
if (navigator.serviceWorker) {

    //check if SW is in dev
    if (url.includes('localhost')) {
        swLocation = '/sw.js';
    }
    
    navigator.serviceWorker.register(swLocation);
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

// the user variable, id of the selected character
var user;




// ===== Application code =====

function crearMensajeHTML(message, character) {

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

// Exit button
exitBtn.on('click', function() {

    logIn(false);

});

// New message button
newBtn.on('click', function() {

    modal.removeClass('hidden');
    modal.animate({ 
        marginTop: '-=1000px',
        opacity: 1
    }, 200 );

});

// Message cancel button
cancelBtn.on('click', function() {
   modal.animate({ 
       marginTop: '+=1000px',
       opacity: 0
    }, 200, function() {
        modal.addClass('hidden');
        txtMessage.val('');
    });
});

// Send Button
postBtn.on('click', function() {

    var message = txtMessage.val();
    if ( message.length === 0 ) {
        cancelBtn.click();
        return;
    }

    crearMensajeHTML( message, user );

});