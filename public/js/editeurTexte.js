function commande(nom, argument) {
    if (typeof argument === 'undefined') {
        argument = '';
    }
    document.execCommand(nom, false, argument);
}

