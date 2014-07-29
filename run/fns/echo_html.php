<?php

function echo_html ($html, $head, $body) {

    include_once __DIR__.'/../../fns/get_revisions.php';
    $revisions = get_revisions();

    header('Content-Type: text/html; charset=UTF-8');
    echo '<!DOCTYPE html>'
        .$html
            .'<head>'
                .'<title>Bubble Shoot</title>'
                .'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
                .'<meta name="viewport" content="width=device-width, user-scalable=no" />'
                .'<link rel="icon" type="image/png" href="../images/icons/16.png?'.$revisions['images/icons/16.png'].'" />'
                .'<link rel="icon" type="image/png" href="../images/icons/32.png?'.$revisions['images/icons/32.png'].'" sizes="32x32" />'
                .$head
            .'</head>'
            ."<body>$body</body>"
        .'</html>';

}
